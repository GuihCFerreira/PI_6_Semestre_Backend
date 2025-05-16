import { z } from "zod";
import { QuizTableFields } from "../enums/quiz-enum";

const baseQuizSchema = z.object({
    FAVORITE_GAMES: z.array(z.number()).default([]),
    GENRES: z.array(z.string()).optional().default([]),
    CATEGORIES: z.array(z.string()).optional().default([]),
    OPERATIONAL_SYSTEMS: z.array(z.string()).default([]),
    GAME_LANGUAGE: z.string().default(""),
    PUBLISHERS: z.array(z.string()).optional().default([]),
    MODE: z.array(z.string()).optional().default([]),
    STYLE: z.array(z.string()).optional().default([]),
    CAMERA: z.array(z.string()).optional().default([]),
})

const createQuizSchema = baseQuizSchema.transform((data) => {
    const transformed: Record<string, any> = {};

    for (const key in QuizTableFields) {
        const dbField = QuizTableFields[key as keyof typeof QuizTableFields];
        transformed[dbField] = data[key as keyof typeof data];
    }

    return transformed;
})

const updateQuizSchema = baseQuizSchema.partial().transform((data) => {
    const transformed: Record<string, any> = {};

    for (const key in QuizTableFields) {
        const dbField = QuizTableFields[key as keyof typeof QuizTableFields];
        transformed[dbField] = data[key as keyof typeof data];
    }

    return transformed;
});

export { createQuizSchema, updateQuizSchema };