import userRepository from "../repository/user-repository"

const getAllUsers = async () => {
    return userRepository.getAllUsers()
}

const getUserById = async (id: string) => {
    return userRepository.getUserById(id)
}

export default { getAllUsers, getUserById }