import quizRepository from "../repository/quiz-repository"

const getQuizTemplate = async () => {
    return quizRepository.getQuizTemplate()
}

export default { getQuizTemplate }