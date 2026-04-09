import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { env } from "../config/env.js";

export interface IUser {
    username: string,
    fullname: string,
    email: string,
    password: string,
    contact: string,
    address: string,
    city: string,
    country: string,
    profilePicture: string,
    profilePicturePublicId: string,
    isAdmin: boolean,
    lastLogin?: Date,
    isVerified?: boolean
    resetPasswordToken?: string | undefined;
    resetPasswordTokenExpiresAt?: Date | undefined;
    verificationToken?: string | undefined;
    verificationTokenExpiresAt?: Date | undefined;
}

export interface IUserDocument extends IUser, Document {
    // No need to give createdAt or updatedAt separately here. These come automatically from Document.
    isPasswordCorrect(password: string): Promise<boolean>;
    generateToken(): string;
}

const userSchema = new mongoose.Schema<IUserDocument>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            trim: true,
            required: true
        },
        address: {
            type: String,
            default: "Update your address",
            required: true
        },
        city: {
            type: String,
            default: "Update your city",
            required: true
        },
        country: {
            type: String,
            default: "Update your country",
            required: true
        },
        profilePicture: {
            type: String,
            default: ""
        },
        profilePicturePublicId: {
            type: String,
            default: ""
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        lastLogin: {
            type: Date,
            default: Date.now
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: {
            type: String,
            default: undefined
        },
        resetPasswordTokenExpiresAt: {
            type: Date,
            default: undefined
        },
        verificationToken: {
            type: String,
            default: undefined
        },
        verificationTokenExpiresAt: {
            type: Date,
            default: undefined
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateToken = function (): string {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        env.SECRET_TOKEN!,
        {
            expiresIn: env.SECRET_TOKEN_EXPIRY!,
        }
    );
};



export const User = mongoose.model('User', userSchema)