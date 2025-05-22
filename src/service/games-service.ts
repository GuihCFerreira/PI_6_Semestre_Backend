import { NotFound } from "../error/not-found-error"
import gamesRepository from "../repository/games-repository"
import { Pagination } from "../types/paginator"
import gameSuggestedService from "./game-suggested-service"
import quizService from "./quiz-service"

const getGameByGameId = async (id: number) => {

    const game = await gamesRepository.getGameByGameId(id)
    if (!game) throw new NotFound("Game not found")

    return game

}

const getGameRecomendations = async (userId: string) => {

    /*const lastQuiz = await quizService.getLastUserQuiz(userId)
    if (!lastQuiz) throw new NotFound("No quiz found for this user")

    const getGameSuggested = await gameSuggestedService.getAllGameSuggestedByQuizId(lastQuiz.id)
    const games = getGameSuggested.length > 0 ? getGameSuggested.map((game) => game.game_id) : [] 

    const { id, user_id, created_at, updated_at, ...lastQuizCleaned } = lastQuiz;
    
    const searchData = {
        suggested_games_ids: games,
        ...lastQuizCleaned
    }*/

    const recomendations = await gamesRepository.getGameRecomendations("")
    //const recomendations = await gamesRepository.getGameRecomendations(searchData)
    if (!recomendations) throw new NotFound("No recomendations found")

    return recomendations

}

const getAllGames = async (page: number = 1, perPage: number = 20) => {

    const data = await gamesRepository.getAllGamesPaginate(page, perPage);
    const total = await gamesRepository.getGamesTotal();
    const totalPages = Math.ceil(total / perPage);
    
    const pagination: Pagination = {
        currentPage: page,
        perPage,
        total,
        lastPage: totalPages,
        firstPage: 1,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
    }

    return {
        data,
        pagination
    };

}

const getGamesForQuizTemplate = async (page: number = 1, perPage: number = 50, search: string = "") => {

    const orderBy = search === "" ? [{ id: "asc" }] : [{ name: "asc" }, { id: "asc" }];
    const games = await gamesRepository.getGamesForQuizTemplate(page, perPage, search, orderBy);
    const total = await gamesRepository.getGamesTotal();
    const totalPages = Math.ceil(total / perPage);
    
    const pagination: Pagination = {
        currentPage: page,
        perPage,
        total,
        lastPage: totalPages,
        firstPage: 1,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
    }

    const data = games.map((game) => ({
        answer: game.name,
        value: game.game_id,
        image: game.header_image
    }))

    return {
        data,
        pagination
    };

}

export default {
    getGameByGameId,
    getGameRecomendations,
    getAllGames,
    getGamesForQuizTemplate
}
