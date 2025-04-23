import { Quizzes } from "@prisma/client"
import quizRepository from "../repository/quiz-repository"
import { NotFound } from "../error/not-found-error"

const getQuizTemplate = async () => {
    return quizRepository.getQuizTemplate()
}

const getAllQuizzes = async () => {
    return quizRepository.getAllQuizzes()
}

const getQuizById = async (quizId: string) => {
    const quiz = await quizRepository.getQuizById(quizId)
    if (!quiz) throw new NotFound("Quiz not found")
    return quiz
}

const getAllUserQuizzes = async (userId: string) => {
    return quizRepository.getAllUserQuizzes(userId)
}

const getLastUserQuiz = async (userId: string) => {
    const quiz = await quizRepository.getLastUserQuiz(userId)
    if (!quiz) throw new NotFound("Quiz not found")
    return quiz
}

const getUserQuizHistory = async (userId: string) => {
    return quizRepository.getUserQuizHistory(userId)
}

const createQuiz = async (data: Quizzes, userId: string) => {
    data.user_id = userId
    return quizRepository.createQuiz(data)
}

const updateQuiz = async (quizId: string, data: Partial<Quizzes>) => {
    const quiz = await quizRepository.getQuizById(quizId)
    if (!quiz) throw new NotFound("Quiz not found") 
    return quizRepository.updateQuiz(quizId, data)
}

const deleteQuiz = async (quizId: string) => {
    const quiz = await quizRepository.getQuizById(quizId)
    if (!quiz) throw new NotFound("Quiz not found")
    return quizRepository.deleteQuiz(quizId)
}

export default { 
    getQuizTemplate,
    getAllQuizzes,
    getQuizById,
    getAllUserQuizzes,
    getLastUserQuiz,
    getUserQuizHistory,
    createQuiz,
    updateQuiz,
    deleteQuiz,
}