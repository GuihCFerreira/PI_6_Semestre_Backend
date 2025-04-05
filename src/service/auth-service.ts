import { User } from "@prisma/client";
import authRepository from "../repository/auth-repository";
import { Conflict } from "../error/conflict-error";
import { NotFound } from "../error/not-found-error";
import bcrypt from "bcrypt";
import { generateToken }  from "../utils/token";
import { Unauthorized } from "../error/unauthorized-error";

const signInUser = async (user: User) => {
    
    const userAlreadyExists = await authRepository.findUserByEmail(user.email);

    if (userAlreadyExists) throw new Conflict("User already exists!");

    if (!process.env.SALT_BCRYPT) throw new Error("SALT_BCRYPT is not defined!");

    user.password = await bcrypt.hash(
        user.password,
        Number(process.env.SALT_BCRYPT)
    );

    const newUser = await authRepository.signInUser(user);

    if (!newUser) throw new Error("Error creating user!");

    const token = await generateToken(newUser.id);

    return {
        ...newUser,
        token,
    }

};

const loginUser = async (email: string, password: string) => {
    
    const user = await authRepository.findUserByEmail(email);

    if (!user) throw new NotFound("User not found!");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new Unauthorized("Invalid password!");

    const { password: _, ...userWithoutPassword } = user;
    const token = await generateToken(user.id);

    return {
        ...userWithoutPassword,
        token,
    }

};

export default { signInUser, loginUser };