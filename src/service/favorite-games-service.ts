import { FavoriteGames } from "@prisma/client"
import { NotFound } from "../error/not-found-error"
import favoriteGamesRepository from "../repository/favorite-games-repository"
import userRepository from "../repository/user-repository"
import { Conflict } from "../error/conflict-error"
import { BadRequest } from "../error/bad-request-error"
import gamesRepository from "../repository/games-repository"

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

    if (!data || !data.game_id) throw new BadRequest("Game ID is required")

    const existingFavoriteGame = await favoriteGamesRepository.getFavoriteGameByGameIdAndUserId(data!.game_id, userId)
    if (existingFavoriteGame) throw new Conflict("This game is already in your favorites")

    data.user_id = userId

    if (!data.name || !data.release_date || !data.header_image || !data.short_description) {
        const game = await gamesRepository.getGameByGameId(data.game_id)
        if (!game) throw new NotFound("Game not found")
        
        data.name = game.name
        data.release_date = game.release_date
        data.header_image = game.header_image
        data.short_description = game.short_description
        
    }

    return favoriteGamesRepository.addFavoriteGame(data)

}

const removeFavoriteGame = async (id: number, userId: string) => {

    const favoriteGame = await favoriteGamesRepository.getFavoriteGameByGameIdAndUserId(id, userId)
    if (!favoriteGame) throw new NotFound("Favorite game not found")

    return favoriteGamesRepository.removeFavoriteGameByGameIdAndUserId(id, userId)

}

export default {
    getAllFavoriteGames,
    getFavoriteGameById,
    addFavoriteGame,
    removeFavoriteGame
}