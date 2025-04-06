import { db } from "../database/prisma"

const getAllUsers = async () => {
    return db.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            photo: true,
        }
    })
}

const getUserById = async (id: string) => {
    return db.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            photo: true,
        }
    })
}

export default { getAllUsers, getUserById }