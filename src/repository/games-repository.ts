import { db } from "../database/prisma"

const getGameById = async (id: number) => {
    //TODO: Implement the logic to get a game by its ID from the python API
    return {}
}

const getGameRecomendations = async (searchData: any) => {
    //TODO: Implement the logic to get game recommendations from the python API
    return []
}

const getAllGames = async () => {
    return db.games.findMany({})
}

const getAllGamesPaginate = async (page: number, perPage: number) => {
    return db.games.findMany({
        skip: (page - 1) * perPage,
        take: perPage
    })
}

const getGamesTotal = async () => {
    return db.games.count()
}

export default {
    getGameById,
    getGameRecomendations,
    getAllGames,
    getAllGamesPaginate,
    getGamesTotal
}