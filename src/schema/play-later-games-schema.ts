import { z } from "zod";

const addPlayLaterGameSchema = z.object({
    game_id: z.number().int().positive(),
    name: z.string().min(1).max(100),
    short_description: z.string().min(1).max(500),
    header_image: z.string().url(),
    release_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})

export { addPlayLaterGameSchema }