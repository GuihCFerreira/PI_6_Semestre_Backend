import { Quizzes } from "@prisma/client"
import { db } from "../database/prisma"

const getQuizTemplate = async () => {
    return db.questions.findMany({
        select: {
            question: true,
            required: true,
            tag: true,
            options: {
                select: {
                    answer: true,
                    value: true,
                }
            }
        },
    })
}

const getAllQuizzes = async () => {
    return db.quizzes.findMany({
        orderBy: {
            created_at: "asc",
        }
    })
}

const getQuizById = async (quizId: string) => {
    return db.quizzes.findUnique({
        where: {
            id: quizId,
        },
    })
}

const getAllUserQuizzes = async (userId: string) => {
    return db.quizzes.findMany({
        where: {
            user_id: userId,
        },
        orderBy: {
            created_at: "asc",
        }
    })
}

const getLastUserQuiz = async (userId: string) => {
    return db.quizzes.findFirst({
        where: {
            user_id: userId,
        },
        orderBy: {
            created_at: "desc",
        },
    })
}

const getUserQuizHistory = async (userId: string) => {
    return db.quizzes.findMany({
        where: {
            user_id: userId,
        },
        orderBy: {
            created_at: "desc",
        },
    })
}

const createQuiz = async (quiz: Quizzes) => {
    return db.quizzes.create({
        data: quiz,
    })
}

const updateQuiz = async (quizId: string, quiz: Partial<Quizzes>) => {
    return db.quizzes.update({
        where: {
            id: quizId,
        },
        data: quiz,
    })
}

const deleteQuiz = async (quizId: string) => {
    return db.quizzes.delete({
        where: {
            id: quizId,
        },
    })
}

export default { 
    getQuizTemplate,
    getAllQuizzes,
    getQuizById,
    getAllUserQuizzes,
    getLastUserQuiz,
    getUserQuizHistory,
    deleteQuiz,
    createQuiz,
    updateQuiz, 
}