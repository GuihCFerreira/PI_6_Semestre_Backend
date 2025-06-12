import { GameSuggested } from "@prisma/client"
import { db } from "../database/prisma"

const getAllGameSuggested = async () => {
    return db.gameSuggested.findMany({
        orderBy: {
            suggested_at: "asc",
        }
    })
}

const getGameSuggestedById = async (id: string) => {
    return db.gameSuggested.findUnique({
        where: {
            id,
        },
    })
}

const getAllGameSuggestedByQuizId = async (quizId: string) => {
    return db.gameSuggested.findMany({
        where: {
            quiz_id: quizId,
        },
        orderBy: {
            suggested_at: "asc",
        }
    })
}

const getLastFiveGameSuggestedByQuizId = async (quizId: string) => {
    return db.gameSuggested.findMany({
        where: {
            quiz_id: quizId,
        },
        orderBy: {
            id: "desc",
        },
        take: 5,
        select: {
            game_id: true,
            suggested_at: true,
            name: true,
            header_image: true,
            short_description: true,
            release_date: true,
        }
    })
}

const createGameSuggested = async (gameSuggested: GameSuggested) => {
    return db.gameSuggested.create({
        data: gameSuggested,
    })
}

const createManyGameSuggested = async (gameSuggested: Omit<GameSuggested, "id">[]) => {
    return db.gameSuggested.createMany({
        data: gameSuggested,
        skipDuplicates: true,
    })
}

const updateGameSuggested = async (id: string, gameSuggested: Partial<GameSuggested>) => {
    return db.gameSuggested.update({
        where: {
            id,
        },
        data: gameSuggested,
    })
}

const deleteGameSuggested = async (id: string) => {
    return db.gameSuggested.delete({
        where: {
            id,
        },
    })
}

const deleteAllGameSuggestedByQuizId = async (quizId: string) => {
    return db.gameSuggested.deleteMany({
        where: {
            quiz_id: quizId,
        },
    })
}

export default {
    getAllGameSuggested,
    getGameSuggestedById,
    getAllGameSuggestedByQuizId,
    createGameSuggested,
    createManyGameSuggested,
    updateGameSuggested,
    deleteGameSuggested,
    deleteAllGameSuggestedByQuizId,
    getLastFiveGameSuggestedByQuizId
}