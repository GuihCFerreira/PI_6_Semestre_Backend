import { db } from "../database/prisma"

const getGameByGameId = async (id: number) => {
    return db.games.findUnique({
        where: {
            game_id: id
        }
    })
}

const getGameRecomendations = async (searchData: any) => {
    //TODO: Implement the logic to get game recommendations from the python API
    return []
}

const getAllGames = async () => {
    return db.games.findMany({
        take: 10000,
    })
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

const getGamesForQuizTemplate = async (page: number = 1, perPage: number = 50) => {
    return db.games.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        select: {
          name: true,
          game_id: true,
          header_image: true
        }
    })
}

export default {
    getGameByGameId,
    getGameRecomendations,
    getAllGames,
    getAllGamesPaginate,
    getGamesTotal,
    getGamesForQuizTemplate
}