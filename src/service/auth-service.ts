import { User } from "@prisma/client";
import authRepository from "../repository/auth-repository";
import { Conflict } from "../error/conflict-error";
import { NotFound } from "../error/not-found-error";

const signInUser = async (user: User) => {
    
    const userAlreadyExists = await authRepository.findUserByEmail(user.email);

    if (userAlreadyExists) {
        throw new Conflict("User already exists!");
    }

    return authRepository.signInUser(user);

};

const findUserByEmail = async (email: string) => {

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new NotFound("User not found!");
    }

    return user;
    
}