import { GamesPlayed } from "@prisma/client"
import { db } from "../database/prisma"

const getAllPlayedGames = async (userId: string) => {
    return db.gamesPlayed.findMany({
        where: {
            user_id: userId,
        }
    })
}

const getPlayedGameById = async (id: string) => {
    return db.gamesPlayed.findUnique({
        where: {
            id,
        }
    })
}

const addPlayedGame = async (data: GamesPlayed) => {
    return db.gamesPlayed.create({
        data
    })
}

const deletePlayedGame = async (id: string) => {
    return db.gamesPlayed.delete({
        where: {
            id,
        }
    })
}

export default {
    getAllPlayedGames,
    getPlayedGameById,
    addPlayedGame,
    deletePlayedGame
}