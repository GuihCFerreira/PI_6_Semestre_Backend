import { Request, Response } from "express";
import authService from "../service/auth-service";

const signInUser = async (req: Request, res: Response) => {
    try {

        const body = req.body;

        const newUser = await authService.signInUser(body);

        return res.status(201).json(newUser);


    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {

        const { email,password } = req.body;

        const user = await authService.loginUser(email, password);

        return res.status(200).json(user);


    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

export default { signInUser, loginUser };