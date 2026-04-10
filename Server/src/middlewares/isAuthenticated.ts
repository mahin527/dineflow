import type { Request, Response, NextFunction } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"

const isAuthenticated = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Deriving tokens directly from cookies
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized request! No token found.");
    }

    try {
        const decodedToken = jwt.verify(
            token,
            process.env.SECRET_TOKEN as string
        ) as JwtPayload;

        const user = await User.findById(decodedToken?._id).select("-password");

        if (!user) {
            throw new ApiError(401, "Invalid access token!");
        }

        // Setting User to the Request object
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Invalid or expired token!");
    }
});

export { isAuthenticated }