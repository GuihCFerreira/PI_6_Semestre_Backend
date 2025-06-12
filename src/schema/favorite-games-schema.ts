import { z } from "zod";

const addFavoriteGameSchema = z.object({
    game_id: z.number().int().positive(),
    name: z.string().min(1).max(100).optional(),
    short_description: z.string().min(1).max(500).optional(),
    header_image: z.string().url().optional(),
    release_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
})

export { addFavoriteGameSchema }