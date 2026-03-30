import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler"
import { ApiError } from "../utils/ApiError"
import { ApiResponse } from "../utils/ApiResponse"
import { User } from "../models/user.model"
import crypto from "crypto"
import { uploadOnCloudinary } from "../utils/cloudinary/cloudinary"
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { Multer } from "multer";

const signup = asyncHandler(async (req: Request, res: Response) => {

    // get user details from frontend
    const { username, fullname, email, password, contact } = req.body


    // validation - not empty
    if ([username, fullname, email, password, contact].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required!")
    }

    // check if user already exists: username, email

    const existedUser = await User.findOne(
        {
            $or: [{ username }, { email }]
        }
    )

    if (existedUser) {
        throw new ApiError(409, "User with email already exists!")
        // The 409 Conflict status code indicates that the request could not be completed due to a conflict with the current state of the target resource.  This is a client error (409) meaning the request is syntactically correct and understood by the server, but the server cannot process it because it would create a contradiction with the resource's existing condition, such as concurrent updates, duplicate unique identifiers, or version mismatches.
    }

    //  create user object

    const user = await User.create(
        {
            username,
            fullname,
            email,
            password,
            contact
        }
    )

    // check if user created successfully 
    const createdUser = await User.findById(user._id).select("-password")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user!")
    }

    // Return response
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully!")
    )
})

const signin = asyncHandler(async (req: Request, res: Response) => {
    // get username or email
    // const {username ||  email, password} = req.body

    const { email, password } = req.body

    if (!email) {
        throw new ApiError(400, "Email is required")
    }

    // find the user 
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist!")
    }

    // if user exists then password check

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials!")
    }

    user.lastLogin = new Date()

    await user.save()

    // TODO: generete token, cookie etc. 

    // return response
    return res.status(200).json(
        new ApiResponse(200, user, "User signin successfully!")
    )

})

const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { verificationCode } = req.body;
    const user = await User.findOne(
        {
            verificationToken: verificationCode,
            verificationTokenExpiresAt: {
                $gt: Date.now()
            }
        }
    ).select("-password")

    if (!user) {
        throw new ApiError(400, "Invalid or expired verification token!")
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save()


    // TODO: Send welcome email


    // return response 
    return res.status(200).json(
        new ApiResponse(200, user, "Email verification successful!")
    )
})

const logout = asyncHandler(async (_: Request, res: Response) => {
    return res.clearCookie("token").status(200).json(
        new ApiResponse(200, "User logged out successfully!")
    )
})

const forgetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(400, "User does not exist!")
    }

    const resetToken = crypto.randomBytes(40).toString("hex")
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour

    user.resetPasswordToken = resetToken
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt

    await user.save()

    // Send the reset password link via email
    // await sendResetPasswordLink(user.email, `${process.env.FRONTEND_URL}/resetpassword/${token}`)

    // return response
    return res.status(200).json(
        new ApiResponse(200, "Password reset link sent to your email!")
    )

})

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.params;
    const newPassword = req.body;

    const user = await User.findOne(
        {
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: {
                $gt: Date.now()
            }
        }
    )

    if (!user) {
        throw new ApiError(400, "Invalid or expired reset token!")
    }

    // update password 
    user.password = newPassword
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpiresAt = undefined

    await user.save()

    // Send a success message via email.
    // await sendSuccessMsgViaEmail(user.email, )

    // return response
    return res.status(200).json(
        new ApiResponse(200, "Password reset successful!")
    )


})

const checkAuth = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user

    return res.status(200).json(
        new ApiResponse(200, user, "User authenticated successfully")
    )

})

const updateProfile = asyncHandler(async (req: Request & { file?: Express.Multer.File }, res: Response) => {
    const user = req.user; // isAuthenticated middleware 

    if (!user) {
        throw new ApiError(401, "Unauthorized request!");
    }

    const {
        fullname,
        email,
        contact,
        address,
        city,
        country,
    } = req.body;

    // if new profile picture 
    let profilePictureUrl = user.profilePicture;
    if (req.file?.path) {
        const uploadResult = await uploadOnCloudinary(req.file.path);
        if (!uploadResult) {
            throw new ApiError(500, "Profile picture upload failed!");
        }
        profilePictureUrl = uploadResult.url;
    }

    // update user
    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            fullname,
            email,
            contact,
            address,
            city,
            country,
            profilePicture: profilePictureUrl,
        },
        { new: true } 
    ).select("-password -refreshToken");

    if (!updatedUser) {
        throw new ApiError(500, "Something went wrong while updating profile!");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});

export { signup, signin, verifyEmail, logout, forgetPassword, resetPassword, checkAuth, updateProfile }





