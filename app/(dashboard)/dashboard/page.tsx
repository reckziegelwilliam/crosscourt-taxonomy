import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { EventCreateButton } from "@/components/event/event-create-button"
import { EventItem } from "@/components/event/event-item"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const events = await db.event.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      startDate: true,
      endDate: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Events" text="Create and manage events.">
        <EventCreateButton />
      </DashboardHeader>
      <div>
        {events?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {events.map((event) => (
              <EventItem key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="events" />
            <EmptyPlaceholder.Title>No events created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any events yet. Start creating content.
            </EmptyPlaceholder.Description>
            <EventCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
