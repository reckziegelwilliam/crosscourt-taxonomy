import { DashboardHeader } from "@/components/header"
import { EventCreateButton } from "@/components/event/event-create-button"
import { EventItem } from "@/components/event/event-item"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <EventCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <EventItem.Skeleton />
        <EventItem.Skeleton />
        <EventItem.Skeleton />
        <EventItem.Skeleton />
        <EventItem.Skeleton />
      </div>
    </DashboardShell>
  )
}
