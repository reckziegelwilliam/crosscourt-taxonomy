'use client';

import Link from "next/link";
import { Tournament } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import { TournamentOperations } from "@/components/tournament/tournament-operations";

interface TournamentItemProps {
    tournament: Pick<Tournament, "id" | "title" | "type" | "competitorType" | "createdAt" | "updatedAt" | "eventId">;
}

export function TournamentItem ({ tournament } : TournamentItemProps) {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="grid gap-1">
                <Link
                    href={`/evt-editor/${tournament.eventId}/create/${tournament.id}`}
                    className="font-semibold hover:underline"
                >
                    {tournament.title}
                </Link>
                <p className="text-sm text-muted-foreground">
                    {`Type: ${tournament.type}, Competitors: ${tournament.competitorType}`}
                </p>
                <p className="text-sm text-muted-foreground">
              {`Created: ${formatDate(new Date(tournament.createdAt).toDateString())}, Updated: ${formatDate(new Date(tournament.updatedAt).toDateString())}`}
            </p>
          </div>
          <TournamentOperations tournament={{ id: tournament.id, title: tournament.title, eventId: tournament.eventId }} />
        </div>
    );
}     