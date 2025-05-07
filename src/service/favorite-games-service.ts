import { FavoriteGames } from "@prisma/client"
import { NotFound } from "../error/not-found-error"
import favoriteGamesRepository from "../repository/favorite-games-repository"
import userRepository from "../repository/user-repository"

const getAllFavoriteGames = async (userId: string) => {

    const user = await userRepository.getUserById(userId)
    if (!user) throw new NotFound("User not found")

    return favoriteGamesRepository.getAllFavoriteGames(userId)

}

const getFavoriteGameById = async (id: string) => {

    const favoriteGame = await favoriteGamesRepository.getFavoriteGameById(id)
    if (!favoriteGame) throw new NotFound("Favorite game not found")

    return favoriteGame

}

const addFavoriteGame = async (data: FavoriteGames, userId: string) => {
    
    const user = await userRepository.getUserById(userId)
    if (!user) throw new NotFound("User not found")

    data.user_id = userId

    return favoriteGamesRepository.addFavoriteGame(data)

}

const removeFavoriteGame = async (id: string) => {
    
    const favoriteGame = await favoriteGamesRepository.getFavoriteGameById(id)
    if (!favoriteGame) throw new NotFound("Favorite game not found")

    return favoriteGamesRepository.removeFavoriteGame(id)    

}

export default {
    getAllFavoriteGames,
    getFavoriteGameById,
    addFavoriteGame,
    removeFavoriteGame
}