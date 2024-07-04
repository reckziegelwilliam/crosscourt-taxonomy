import * as z from "zod";

export const tournamentCreateSchema = z.object({
  title: z.string(),
  type: z.enum(["SINGLE_ELIMINATION", "DOUBLE_ELIMINATION", "ROUND_ROBIN", "HYBRID"]),
  competitorType: z.enum(["TEAM", "PLAYER", "BOTH"]),
  divisions: z.array(z.object({
    title: z.string(),
    level: z.enum(["OPEN", "A1", "A2", "B"]),
    gender: z.enum(["MEN", "WOMEN", "MIXED"]),
  })),
});

export type TournamentEditorData = z.infer<typeof tournamentCreateSchema>;
