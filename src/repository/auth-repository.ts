import { User } from "@prisma/client";
import { db } from "../database/prisma";

const signInUser = async (user: User) => {
  return db.user.create({
    data: user,
  });
};

const findUserByEmail = async (email: string) => {
  return db.user.findUnique({
    where: {
      email,
    },
  });
};

const loginUser = async (email: string, password: string) => {
  return db.user.update({
    where: {
      email,
      password,
    },
    data: {
      last_login: new Date(),
    },
  });
};

export default { signInUser, findUserByEmail, loginUser };
