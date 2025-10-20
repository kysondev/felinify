import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    )
    .max(20, { message: "Password must be less than 20 characters" }),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(20, { message: "Name must be less than 20 characters" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Name must contain only letters and numbers",
    }),
  terms: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
});

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string(),
});

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be less than 20 characters" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username must contain only letters and numbers",
    }),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
export type UsernameSchema = z.infer<typeof usernameSchema>;
