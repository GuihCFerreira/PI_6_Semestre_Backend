import { GameSuggested } from "@prisma/client"
import { NotFound } from "../error/not-found-error"
import gameSuggestedRepository from "../repository/game-suggested-repository"
import quizRepository from "../repository/quiz-repository"

const getAllGameSuggested = async () => {
    return gameSuggestedRepository.getAllGameSuggested()
}

const getGameSuggestedById = async (id: string) => {
    const gameSuggested = await gameSuggestedRepository.getGameSuggestedById(id)
    if (!gameSuggested) throw new NotFound("Game suggested not found")
    return gameSuggested
}

const getAllGameSuggestedByQuizId = async (quizId: string) => {
    const quiz = await quizRepository.getQuizById(quizId)
    if (!quiz) throw new NotFound("Quiz not found")
    return gameSuggestedRepository.getAllGameSuggestedByQuizId(quizId)
}

const createGameSuggested = async (gameSuggested: GameSuggested) => {
    const quiz = await quizRepository.getQuizById(gameSuggested.quiz_id)
    if (!quiz) throw new NotFound("Quiz not found")
    return gameSuggestedRepository.createGameSuggested(gameSuggested)
}

const createManyGameSuggested = async (gameSuggested: Omit<GameSuggested, "id">[]) => {
    return gameSuggestedRepository.createManyGameSuggested(gameSuggested)
}

const createManyGameSuggestedWithoutPassingQuizId = async (gameSuggested: GameSuggested[]) => {
    const quiz = await quizRepository.getQuizById(gameSuggested[0].quiz_id)
    if (!quiz) throw new NotFound("Quiz not found")
    return gameSuggestedRepository.createManyGameSuggested(gameSuggested)
}

const updateGameSuggested = async (id: string, gameSuggested: Partial<GameSuggested>) => {
    const gameSuggestedData = await gameSuggestedRepository.getGameSuggestedById(id)
    if (!gameSuggestedData) throw new NotFound("Game suggested not found")
    return gameSuggestedRepository.updateGameSuggested(id, gameSuggested)
}

const deleteGameSuggested = async (id: string) => {
    const gameSuggested = await gameSuggestedRepository.getGameSuggestedById(id)
    if (!gameSuggested) throw new NotFound("Game suggested not found")
    return gameSuggestedRepository.deleteGameSuggested(id)
}

const deleteAllGameSuggestedByQuizId = async (quizId: string) => {
    const quiz = await quizRepository.getQuizById(quizId)
    if (!quiz) throw new NotFound("Quiz not found")
    return gameSuggestedRepository.deleteAllGameSuggestedByQuizId(quizId)
}

export default {
    getAllGameSuggested,
    getGameSuggestedById,
    getAllGameSuggestedByQuizId,
    createGameSuggested,
    createManyGameSuggested,
    createManyGameSuggestedWithoutPassingQuizId,
    updateGameSuggested,
    deleteGameSuggested,
    deleteAllGameSuggestedByQuizId,
}
