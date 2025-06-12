import { FavoriteGames } from "@prisma/client"
import { db } from "../database/prisma"

const getAllFavoriteGames = async (userId: string) => {
    return db.favoriteGames.findMany({
        where: {
            user_id: userId
        },
        orderBy: {
            favorited_at: "asc"
        }
    })
}

const getFavoriteGameById = async (id: string) => {
    return db.favoriteGames.findUnique({
        where: {
            id
        }
    })
}

const getFavoriteGameByGameIdAndUserId = async (gameId: number, userId: string) => {
    return db.favoriteGames.findFirst({
        where: {
            game_id: gameId,
            user_id: userId
        }
    })
}

const addFavoriteGame = async (data: Omit<FavoriteGames, "id">) => {
    return db.favoriteGames.create({
        data
    })
}

const removeFavoriteGame = async (id: string) => {
    return db.favoriteGames.delete({
        where: {
            id
        }
    })
}

const removeFavoriteGameByGameIdAndUserId = async (gameId: number, userId: string) => {
    return db.favoriteGames.deleteMany({
        where: {
            game_id: gameId,
            user_id: userId
        }
    })
}

export default {
    getAllFavoriteGames,
    getFavoriteGameById,
    addFavoriteGame,
    removeFavoriteGame,
    getFavoriteGameByGameIdAndUserId,
    removeFavoriteGameByGameIdAndUserId
}