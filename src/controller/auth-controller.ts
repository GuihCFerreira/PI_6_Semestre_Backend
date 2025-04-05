import { Request, Response } from "express";
import authService from "../service/auth-service";

const signInUser = async (req: Request, res: Response) => {
    try {

        const body = req.body;

        const newUser = await authService.signInUser(body);

        res.status(201).json(newUser);
        return 


    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {

        const { email,password } = req.body;

        const user = await authService.loginUser(email, password);

        res.status(200).json(user);
        return

    } catch (error: Error | any) {
        res.status(error?.code ?? 500).json({ message: error?.message ?? "Internal server error" });
    }
}

export default { signInUser, loginUser };