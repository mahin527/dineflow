import mongoose from "mongoose"
import bcrypt from "bcrypt"

export interface IUser {
    username: string,
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
    updatedAt: Date,
    isPasswordCorrect(password: string): Promise<boolean>;
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
            type: Number,
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

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User', userSchema)