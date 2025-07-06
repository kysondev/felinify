import { z } from "zod";

export const usernameSchema = z.string()
.min(3, { message: "Username must be at least 3 characters long" })
.max(20, { message: "Username must be less than 20 characters long" })
.regex(/^[a-zA-Z0-9]+$/, { message: "Username must contain only letters and numbers" })

export const passwordSchema = z.string()
.min(6, { message: "Password must be at least 6 characters long" })
.max(20, { message: "Password must be less than 20 characters long" })
.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character" })

export const emailSchema = z.string().email({ message: "Invalid email" });

export type UsernameSchema = z.infer<typeof usernameSchema>;
export type PasswordSchema = z.infer<typeof passwordSchema>;
export type EmailSchema = z.infer<typeof emailSchema>;