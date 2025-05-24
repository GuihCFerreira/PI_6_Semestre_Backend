import { Conflict } from "../error/conflict-error"
import { NotFound } from "../error/not-found-error"
import userRepository from "../repository/user-repository"

const getAllUsers = async () => {
    return userRepository.getAllUsers()
}

const getUserById = async (id: string) => {
    return userRepository.getUserById(id)
}

const uploadUserImage = async (userId: string, image: string) => {

    const user = await userRepository.getUserById(userId)
    if (!user) throw new NotFound("User not found")

    const cloudinaryImage = await userRepository.uploadImageToCloudinary(image, userId)
    if (!cloudinaryImage) throw new Error("Error uploading image to cloudinary")

    const updatedUser = await userRepository.updateUserImage(userId, cloudinaryImage.secure_url, cloudinaryImage.public_id)
    if (!updatedUser) throw new Error("Error updating user image")

    return updatedUser    

}

const deleteUserImage = async (userId: string) => {

    const user = await userRepository.getUserById(userId)
    if (!user) throw new NotFound("User not found")

    if (!user.photo_id) throw new Conflict("User does not have an image")

    const deletedImage = await userRepository.deleteImageFromCloudinary(user.photo_id)
    if (!deletedImage) throw new Error("Error deleting image from cloudinary")

    const updatedUser = await userRepository.updateUserImage(userId, null, null)
    if (!updatedUser) throw new Error("Error updating user image")
        
    return updatedUser

}

export default { 
    getAllUsers, 
    getUserById,
    uploadUserImage,
    deleteUserImage 
}