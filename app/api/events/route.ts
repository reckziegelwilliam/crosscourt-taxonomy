import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { RequiresProPlanError } from "@/lib/exceptions"
import { getUserSubscriptionPlan } from "@/lib/subscription"

const eventCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})


export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const events = await db.event.findMany({
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
        createdAt: true,
      },
      where: {
        authorId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return new Response(JSON.stringify(events))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session
    const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // If user is on a free plan, check if user has reached limit of 3 events
    if (!subscriptionPlan?.isPro) {
      const count = await db.event.count({
        where: {
          authorId: user.id,
        },
      })

      if (count >= 3) {
        throw new RequiresProPlanError()
      }
    }

    const json = await req.json()
    const body = eventCreateSchema.parse(json)

    const event = await db.event.create({
      data: {
        title: body.title,
        content: body.content,
        startDate: body.startDate ? new Date(body.startDate) : new Date(),
        endDate: body.endDate ? new Date(body.endDate) : new Date(),
        authorId: session.user.id,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(event))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof RequiresProPlanError) {
      return new Response("Requires Pro Plan", { status: 402 })
    }

    return new Response(null, { status: 500 })
  }
}
