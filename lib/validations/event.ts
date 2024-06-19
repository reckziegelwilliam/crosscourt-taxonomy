
import * as z from "zod"

export const eventPatchSchema = z.object({
    title: z.string().min(3).max(128).optional(),
    // TODO: Type this properly from editorjs block types?
    content: z.any().optional(),
    startDate: z.any().optional(),
    endDate: z.any().optional(),
    published: z.boolean().optional(),
})