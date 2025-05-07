import { GamesPlayed } from "@prisma/client"
import { NotFound } from "../error/not-found-error"
import playedGamesRepository from "../repository/played-games-repository"
import userRepository from "../repository/user-repository"
import playLaterGamesService from "./play-later-games-service"

const getAllPlayedGames = async (userId: string) => {

    const user = await userRepository.getUserById(userId)
    if (!user) throw new NotFound("User not found")
    
    return playedGamesRepository.getAllPlayedGames(userId)

}

const getPlayedGameById = async (id: string) => {

    const playedGame = await playedGamesRepository.getPlayedGameById(id)
    if (!playedGame) throw new NotFound("Played game not found")

    return playedGame

}

const addPlayedGame = async (data: GamesPlayed, userId: string) => {

    const user = await userRepository.getUserById(userId)
    if (!user) throw new NotFound("User not found")

    const gameExistsInPlayLaterGames = await playLaterGamesService.getPlayLaterGameByGameIdAndUserId(data.game_id, userId)
    if (gameExistsInPlayLaterGames) await playLaterGamesService.removePlayLaterGame(gameExistsInPlayLaterGames.id)

    if (data.played_at) data.played_at = new Date(`${data.played_at}T00:00:00Z`);

    data.user_id = userId

    return playedGamesRepository.addPlayedGame(data)

}

const deletePlayedGame = async (id: string) => {
    
    const playedGame = await playedGamesRepository.getPlayedGameById(id)
    if (!playedGame) throw new NotFound("Played game not found")

    return playedGamesRepository.deletePlayedGame(id)
    
}

export default {
    getAllPlayedGames,
    getPlayedGameById,
    addPlayedGame,
    deletePlayedGame
}