import { z } from "zod";
import { QuizTableFields } from "../enums/quiz-enum";

const baseQuizSchema = z.object({
    FAVORITE_GAMES: z.array(z.number()).min(3).default([]),
    GENRES: z.array(z.string()).min(1).default([]).transform((arr) => arr.length === 1 && arr[0] === "" ? [] : arr),
    CATEGORIES: z.array(z.string()).min(1).default([]).transform((arr) => arr.length === 1 && arr[0] === "" ? [] : arr),
    OPERATIONAL_SYSTEMS: z.array(z.string()).min(1).default([]).transform((arr) => arr.length === 1 && arr[0] === "" ? [] : arr),
    GAME_LANGUAGE: z.array(z.string()).min(1).default([]).transform((arr) => arr.length > 0 ? arr[0] : ""),
    PUBLISHERS: z.array(z.string()).min(1).default([]).transform((arr) => arr.length === 1 && arr[0] === "" ? [] : arr),
    MODE: z.array(z.string()).min(1).default([]).transform((arr) => arr.length === 1 && arr[0] === "" ? [] : arr),
    STYLE: z.array(z.string()).min(1).default([]).transform((arr) => arr.length === 1 && arr[0] === "" ? [] : arr),
    CAMERA: z.array(z.string()).min(1).default([]).transform((arr) => arr.length === 1 && arr[0] === "" ? [] : arr),
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