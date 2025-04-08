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

export default { getQuizTemplate }