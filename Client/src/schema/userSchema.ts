import * as z from "zod";

export const userSignupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    fullname: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    contact: z.string().min(10, "Contact number must be at least 10 digits"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
});

export type SignupInputState = z.infer<typeof userSignupSchema>;

export const userSigninSchema = z.object({
    email: z.string().email("Invalid email address!"),
    password: z.string().min(6, "Password must be at least 6 characters!"),
});

export type SigninInputState = z.infer<typeof userSigninSchema>;

export const forgetPasswordSchema = z.object({
    email: z.string().email("Invalid email address!"),
});

export type ForgetPasswordState = z.infer<typeof forgetPasswordSchema>;


export const resetPasswordSchema = z.object({
    oldPassword: z.string().min(6, "Password must be at least 6 characters!"),
    newPassword: z.string().min(6, "Password must be at least 6 characters!"),
});

export type ResetPasswordState = z.infer<typeof resetPasswordSchema>;
