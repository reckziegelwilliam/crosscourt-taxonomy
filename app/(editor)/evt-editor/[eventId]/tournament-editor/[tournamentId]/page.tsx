'use client';
import { notFound, redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { TournamentEditor } from "@/components/tournament/tournament-editor"

async function getTournamentForUser(tournamentId: string, eventId: string, userId: string) {
  return await db.tournament.findFirst({
    where: {
      id: tournamentId,
      eventId: eventId,
      // authorId: userId, // Make sure to add userId if applicable in your model
    },
  })
}

interface TournamentEditorPageProps {
  params: { 
    eventId: string,
    tournamentId: string
  }
}

export default async function TournamentEditorPage({ params }: TournamentEditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tournament = await getTournamentForUser(params.tournamentId, params.eventId, user.id)

  if (!tournament) {
    notFound()
  }

  return (
    <TournamentEditor
      tournamentId={params.tournamentId}
    />
  )
}
