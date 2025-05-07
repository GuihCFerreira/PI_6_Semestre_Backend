import { PlayLaterGames } from "@prisma/client"
import { db } from "../database/prisma"

const getAllPlayLaterGames = async (userId: string) => {
    return db.playLaterGames.findMany({
        where: {
            user_id: userId,
        },
    })
}

const getPlayLaterGameById = async (id: string) => {
    return db.playLaterGames.findUnique({
        where: {
            id,
        }
    })
}

const getPlayLaterGameByGameIdAndUserId = async (gameId: number, userId: string) => {
    return db.playLaterGames.findFirst({
        where: {
            game_id: gameId,
            user_id: userId,
        }
    })
}

const addPlayLaterGame = async (data: PlayLaterGames) => {
    return db.playLaterGames.create({
        data
    })
}

const deletePlayLaterGame = async (id: string) => {
    return db.playLaterGames.delete({
        where: {
            id,
        }
    })
}

export default {
    getAllPlayLaterGames,
    getPlayLaterGameById,
    getPlayLaterGameByGameIdAndUserId,
    addPlayLaterGame,
    deletePlayLaterGame
}