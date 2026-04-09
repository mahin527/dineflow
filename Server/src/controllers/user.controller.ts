import type { Request, Response } from "express";
import type { IUserDocument } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import crypto from "crypto"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary/cloudinary.js"

import {
    sendWelcomeEmail,
    sendVerificationEmail,
    sendPasswordResetEmail,
    sendResetPasswordSuccessEmail
} from "../utils/mailtrap/emails.js"

import type { Multer } from "multer";

interface AuthenticatedRequest extends Request {
    user?: IUserDocument;
    file?: Express.Multer.File;
}

const signup = asyncHandler(async (req: Request, res: Response) => {
    // get user details from frontend
    const { username, fullname, email, password, contact } = req.body;

    // validation - not empty
    if ([username, fullname, email, password, contact].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required!");
    }

    // check if user already exists: username, email
    const existedUser = await User.findOne(
        {
            $or: [{ email }, { username }]
        }
    )

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists!")
        // The 409 Conflict status code indicates that the request could not be completed due to a conflict with the current state of the target resource.  This is a client error (409) meaning the request is syntactically correct and understood by the server, but the server cannot process it because it would create a contradiction with the resource's existing condition, such as concurrent updates, duplicate unique identifiers, or version mismatches.
    }

    // Generate verification token (6 digit or crypto token)
    const verificationToken = crypto.randomBytes(3).toString("hex") // Example: 'a1b2c3'
    const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hour

    //  create user object
    const user = await User.create(
        {
            username,
            fullname,
            email,
            password,
            contact,
            verificationToken,
            verificationTokenExpiresAt
        }
    )

    // remove password
    const createdUser = await User.findById(user._id).select("-password");

    // Fetch created user without password
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering!")
    }
    // Send verification email
    await sendVerificationEmail(email, verificationToken)

    // Return response
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully! Please verify your email.")
    )
})

const signin = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User does not exist!");
    }

    // Password check
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials!");
    }

    // Generate JWT token
    const token = user.generateToken();

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // Cookie options
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none" as const, // extra security
    };

    // Exclude sensitive fields before sending response
    const safeUser = await User.findById(user._id).select("-password -refreshToken");

    return res
        .status(200)
        .cookie("token", token, options)
        .json(new ApiResponse(200, { user: safeUser, token }, "User signed in successfully!"));
});

const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { verificationCode } = req.body;

    if (!verificationCode) {
        throw new ApiError(400, "Verification code is required!");
    }

    // Finding a user whose tokens match and have not expired
    const user = await User.findOne({
        verificationToken: verificationCode,
        verificationTokenExpiresAt: { $gt: new Date() } // Better to use `new Date()` as opposed to `Date.now()`
    });

    if (!user) {
        throw new ApiError(400, "Invalid or expired verification token!");
    }

    // Update
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    // It is better to skip validation when saving if there is a problem with password fields
    await user.save({ validateBeforeSave: false });

    // Sending Welcome Email (await should be used to handle email failure or error)
    try {
        await sendWelcomeEmail(user.email, user.fullname);
    } catch (error) {
        console.error("Welcome email failed:", error);
        // Better not to throw an error here because the user is already verified
    }

    return res.status(200).json(
        new ApiResponse(200, { userId: user._id, isVerified: true }, "Email verification successful!")
    );
});

const signout = asyncHandler(async (_: Request, res: Response) => {
    // Cookie option that was used during signin (preferably the same)
    const options = {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        secure: true,
        sameSite: "none" as const // For CSRF protection
    };

    return res
        .status(200)
        .clearCookie("token", options) // Clear cookies with correct options
        .json(
            new ApiResponse(200, {}, "User logged out successfully!")
        );
});

const forgetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required!");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User with this email does not exist!");
    }

    // create token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

    // Saving without validation because we are just updating the token
    await user.save({ validateBeforeSave: false });

    // Generate frontend URL (preferably taken from env)
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    try {
        // use mailtrap helper 
        await sendPasswordResetEmail(user.email, resetUrl);
    } catch (error) {
        // It is better to clear the token if it fails to send the email
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save({ validateBeforeSave: false });

        throw new ApiError(500, "Failed to send reset email. Try again later.");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Password reset link sent to your email!")
    );
});

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.params;
    
    if (!token || typeof token !== "string") {
        throw new ApiError(400, "Reset token is required!");
    }
    const { newPassword } = req.body;

    if (!newPassword) {
        throw new ApiError(400, "New password is required!");
    }

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordTokenExpiresAt: { $gt: new Date() }
    });

    if (!user) {
        throw new ApiError(400, "Invalid or expired reset token!");
    }

    // Password update (this will auto-hash as user.model has a pre-save hook)
    user.password = newPassword;

    // Clear the tokens so that the same token cannot be used repeatedly
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    // Sending confirmation email of successful password reset
    try {
        await sendResetPasswordSuccessEmail(user.email);
        // Sending a confirmation email to the user after password reset is good for security. If the user has not done this himself, he can take action quickly.
    } catch (error) {
        console.error("Success email sending failed:", error);
        // No need to throw an error here, because the password is already changed
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Password reset successful!")
    );
});

const checkAuth = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
        throw new ApiError(401, "User not authenticated!");
    }

    return res.status(200).json(
        new ApiResponse(200, user, "User authenticated successfully")
    );
});

const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (!user) {
        throw new ApiError(401, "Unauthorized request!");
    }

    const { fullname, email, contact, address, city, country } = req.body;

    let profilePictureUrl = user.profilePicture;
    let profilePicturePublicId = user.profilePicturePublicId;

    // Handle profile picture upload
    if (req.file?.path) {
        const uploadResult = await uploadOnCloudinary(req.file.path);

        if (!uploadResult) {
            throw new ApiError(500, "Profile picture upload failed!");
        }

        // Delete the old picture if any
        if (profilePicturePublicId) {
            try {
                await deleteFromCloudinary(profilePicturePublicId);
            } catch (err) {
                console.error("Failed to delete old profile picture:", err);
            }
        }

        // Set new image
        profilePictureUrl = uploadResult.secure_url;
        profilePicturePublicId = uploadResult.public_id;
    }

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            $set: {
                fullname,
                email,
                contact,
                address,
                city,
                country,
                profilePicture: profilePictureUrl,
                profilePicturePublicId, // save new image id 
            },
        },
        { new: true, runValidators: true }
    ).select("-password -refreshToken");

    if (!updatedUser) {
        throw new ApiError(500, "Something went wrong while updating profile!");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});

export { signup, signin, verifyEmail, signout, forgetPassword, resetPassword, checkAuth, updateProfile }





