import { Request, Response } from "express";
import userService from "../service/user-service";

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

export default { getAllUsers, getUserById };