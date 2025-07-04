import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
});

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
