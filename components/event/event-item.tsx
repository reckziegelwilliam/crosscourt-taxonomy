import Link from "next/link"
import { Event } from "@prisma/client"

import { Skeleton } from "@/components/ui/skeleton"

import { formatDate } from "@/lib/utils"
import { EventOperations } from "@/components/event/event-operations"


interface EventItemProps {
  event: Pick<Event, "id" | "title" | "content" | "startDate" | "endDate" | "createdAt">
}

export function EventItem({ event }: EventItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/evt-editor/${event.id}`}
          className="font-semibold hover:underline"
        >
          {event.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {`Start: ${formatDate(event.startDate.toDateString())} - End: ${formatDate(event.endDate.toDateString())}`}
          </p>
        </div>
      </div>
      <EventOperations calEvent={{ id: event.id, title: event.title }} />
    </div>
  )
}

EventItem.Skeleton = function EventItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
