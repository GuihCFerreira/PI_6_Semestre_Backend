import { z } from "zod";

const addFavoriteGameSchema = z.object({
    game_id: z.string().uuid(),
    name: z.string().min(1).max(100),
    short_description: z.string().min(1).max(500),
    header_image: z.string().url(),
    release_date: z.string().optional(),
})

export { addFavoriteGameSchema }