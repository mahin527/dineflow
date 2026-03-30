import type { SignOptions } from "jsonwebtoken";

export const env = {
    SECRET_TOKEN: process.env.SECRET_TOKEN as string,
    SECRET_TOKEN_EXPIRY: (
        process.env.SECRET_TOKEN_EXPIRY || "1d"
    ) as SignOptions["expiresIn"],
    MAILTRAP_API_TOKEN: process.env.MAILTRAP_API_TOKEN as string
};

if (!env.SECRET_TOKEN) {
    throw new Error("SECRET_TOKEN is missing in environment variables");
}