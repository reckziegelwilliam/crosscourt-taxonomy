import { notFound, redirect } from "next/navigation"
import { Event, User } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EventEditor } from "@/components/event/event-editor"

async function getEventForUser(eventId: Event["id"], userId: User["id"]) {
  return await db.event.findFirst({
    where: {
      id: eventId,
      authorId: userId,
    },
  })
}

interface EventEditorPageProps {
  params: { eventId: string }
}

export default async function EventEditorPage({ params }: EventEditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const event = await getEventForUser(params.eventId, user.id)

  if (!event) {
    notFound()
  }

  return (
    <EventEditor
      event={{
        id: event.id,
        title: event.title,
        content: event.content,
        startDate: event.startDate,
        endDate: event.endDate,
        published: event.published,
      }}
    />
  )
}
