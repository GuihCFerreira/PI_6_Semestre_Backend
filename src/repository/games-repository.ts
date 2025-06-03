import axios from "axios";
import { db } from "../database/prisma"

const getGameByGameId = async (id: number) => {
    return db.games.findUnique({
        where: {
            game_id: id
        }
    })
}

const getGameRecomendations = async (searchData: any) => {
    const baseUrl = process.env.PYTHON_API_URL;
    if (!baseUrl) throw new Error("PYTHON_API_URL is not defined");

    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'timeout': 30000
        },
    };

    const response = await axios.post(`${baseUrl}/recommend`, searchData, requestOptions)

    if (!response || !response.data || !response.data.recommendation_ids) return [];

    return db.games.findMany({
        where: {
            game_id: {
                in: response.data.recommendation_ids
            }
        },
        take: 5,
        select: {
          name: true,
          game_id: true,
          header_image: true,
          short_description: true,
          release_date: true
        }
    })
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

const getGamesForQuizTemplate = async (page: number = 1, perPage: number = 50, search: string = "", orderBy: any = []) => {
    return db.games.findMany({
        skip: (page - 1) * perPage,
        take: perPage + 1,
        where: {
            name: {
                contains: search,
                mode: "insensitive"
            }
        },
        select: {
          name: true,
          game_id: true,
          header_image: true
        },
        orderBy: [ ...orderBy ]
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