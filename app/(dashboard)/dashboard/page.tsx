'use client';
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TournamentItem } from "@/components/tournament/tournament-item";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { EventCreateButton } from "@/components/event/event-create-button";
import { TournamentCreateButton } from "@/components/tournament/tournament-create-button";
import { EventItem } from "@/components/event/event-item";
import { DashboardShell } from "@/components/shell";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
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
      Tournament: {
        select: {
          id: true,
          title: true,
          type: true,
          competitorType: true,
          published: true,
          createdAt: true,
          updatedAt: true,
          eventId: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader heading="Events" text="Create and manage events.">
        <EventCreateButton />
      </DashboardHeader>
      <div>
        {events.length ? (
          <div className="divide-y divide-border rounded-md border">
            {events.map((event) => (
              <Accordion key={event.id} type="single" collapsible className="w-full">
                <AccordionItem value={event.id}>
                  <AccordionTrigger className="w-full py-2 text-left"> {/* Reordered classes */}
                    <EventItem event={event} />
                  </AccordionTrigger>
                  <AccordionContent>
                    {event.Tournament.length > 0 ? (
                      event.Tournament.map((tournament) => (
                        <TournamentItem key={tournament.id} tournament={tournament} />
                      ))
                    ) : (
                      <div className="p-4">
                        <TournamentCreateButton eventId={event.id} />
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
  );
}
