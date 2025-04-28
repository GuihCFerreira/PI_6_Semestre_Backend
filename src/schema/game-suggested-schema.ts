import { release } from "os";
import { z } from "zod";

const createGameSuggestedSchema = z.object({
    quiz_id: z.string().uuid(),
    game_id: z.number().int().positive(),
    name: z.string().min(1).max(100),
    short_description: z.string().min(1).max(500),
    header_image: z.string().url(),
    release_date: z.string().optional(),
})

const updateGameSuggestedSchema = createGameSuggestedSchema.partial()

const createManyGameSuggestedSchema = z.array(createGameSuggestedSchema)

export { createGameSuggestedSchema, updateGameSuggestedSchema, createManyGameSuggestedSchema }