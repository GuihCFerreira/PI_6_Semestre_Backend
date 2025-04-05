import { z } from "zod";

const loginUserSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(8, {
    message: "Password must have at least 8 characters",
  }),
});

const createUserSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(8, {
    message: "Password must have at least 8 characters",
  }),
  name: z.string().min(3, {
    message: "Name must have at least 3 characters",
  }),
});

export { loginUserSchema, createUserSchema };
