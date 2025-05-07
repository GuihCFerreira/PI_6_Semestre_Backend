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

const addFavoriteGame = async (data: FavoriteGames) => {
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

export default {
    getAllFavoriteGames,
    getFavoriteGameById,
    addFavoriteGame,
    removeFavoriteGame
}