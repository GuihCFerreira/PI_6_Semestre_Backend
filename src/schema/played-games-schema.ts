import { z } from "zod";

const addPlayedGameSchema = z.object({
    game_id: z.number().int().positive(),
    name: z.string().min(1).max(100),
    short_description: z.string().min(1).max(500),
    header_image: z.string().url(),
    release_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    user_rating: z.number().int().min(0).max(10).optional().default(5),
    review: z.string().max(500).optional(),
    played_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
})

export { addPlayedGameSchema }