import { db } from "../database/prisma"
import { v2 as cloudinary} from "cloudinary"

const getAllUsers = async () => {
    return db.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            photo: true,
            photo_id: true,
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
            photo_id: true,
        }
    })
}

const updateUserImage = async (userId: string, imageUrl: string | null = null, imageId: string | null = null) => {
    return db.user.update({
        where: {
            id: userId,
        },
        data: {
            photo: imageUrl,
            photo_id: imageId,
        }
    })
}

const uploadImageToCloudinary = async (image: string, fileName: string ) => {
    return cloudinary.uploader.upload(image, {
        folder: 'IPlay', 
        public_id: fileName,
        transformation: [{
            quality: "auto",
        }]
    })
}

const deleteImageFromCloudinary = async (publicId: string) => {
    return cloudinary.uploader.destroy(publicId)
}

export default { 
    getAllUsers, 
    getUserById,
    updateUserImage, 
    uploadImageToCloudinary,
    deleteImageFromCloudinary
}