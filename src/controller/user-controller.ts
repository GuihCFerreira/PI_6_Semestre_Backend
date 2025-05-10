import { Request, Response } from "express";
import userService from "../service/user-service";
import AuthenticatedRequest from "../types/authenticated-request";
import { formatImageBaseURI } from "../utils/format-image-base-uri";

const getAllUsers = async (req: Request, res: Response) => {
    try {

        const users = await userService.getAllUsers();

        res.status(200).json(users);
        return

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const user = await userService.getUserById(id);

        res.status(200).json(user);
        return

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const uploadUserImage = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const userId = req.userId;
        const image = req.file;

        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return
        }

        if (!image) {
            res.status(400).json({ message: "Image is required" });
            return
        }

        const imageUri = formatImageBaseURI(image);
        if (!imageUri) {
            res.status(400).json({ message: "Error formatting image" });
            return
        }

        const user = await userService.uploadUserImage(userId, imageUri);

        res.status(200).json(user);
        return

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const deleteUserImage = async (req: AuthenticatedRequest, res: Response) => {
    try {

        const userId = req.userId;

        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return
        }

        const user = await userService.deleteUserImage(userId);

        res.status(200).json(user);
        return

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

export default { 
    getAllUsers, 
    getUserById,
    uploadUserImage,
    deleteUserImage 
};