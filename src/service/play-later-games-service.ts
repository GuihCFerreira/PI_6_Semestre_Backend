import { PlayLaterGames } from "@prisma/client"
import { NotFound } from "../error/not-found-error"
import playLaterGamesRepository from "../repository/play-later-games-repository"
import userRepository from "../repository/user-repository"

const getAllPlayLaterGames = async (userId: string) => {

    const user = await userRepository.getUserById(userId)
    if (!user) throw new NotFound("User not found")

    return playLaterGamesRepository.getAllPlayLaterGames(userId)
    
}

const getPlayLaterGameById = async (id: string) => {

    const playLaterGame = await playLaterGamesRepository.getPlayLaterGameById(id)
    if (!playLaterGame) throw new NotFound("Play later game not found")

    return playLaterGame

}

const addPlayLaterGame = async (data: PlayLaterGames, userId: string) => {

    const user = await userRepository.getUserById(userId)
    if (!user) throw new NotFound("User not found")

    data.user_id = userId

    return playLaterGamesRepository.addPlayLaterGame(data)

}

const removePlayLaterGame = async (id: string) => {

    const playLaterGame = await playLaterGamesRepository.getPlayLaterGameById(id)
    if (!playLaterGame) throw new NotFound("Play later game not found")

    return playLaterGamesRepository.deletePlayLaterGame(id)    

}

export default {
    getAllPlayLaterGames,
    getPlayLaterGameById,
    addPlayLaterGame,
    removePlayLaterGame
}