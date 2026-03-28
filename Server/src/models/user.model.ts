import mongoose from "mongoose"

export interface IUser {
    fullname: string,
    email: string,
    password: string,
    contact: number,
    address: string,
    city: string,
    country: string,
    profilePicture: string,
    isAdmin: boolean,
    lastLogin?: Date,
    isVerified?: boolean
    resetPasswordToken?: string
    resetPasswordTokenExpiresAt?: Date,
    verificationToken?: string,
    verificationTokenExpiresAt?: Date,
}

export interface IUserDocument extends IUser, Document {
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new mongoose.Schema<IUserDocument>(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        contact: {
            type: Number,
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
            type: String
        },
        resetPasswordTokenExpiresAt: {
            type: Date
        },
        verificationToken: {
            type: String
        },
        verificationTokenExpiresAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model('User', userSchema)