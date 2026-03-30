import mongoose from "mongoose"

export interface IMenu {
    _id: mongoose.Schema.Types.ObjectId,
    menuTitle: string,
    description: string,
    price: number,
    image: string,
}

export interface IMenuDocument extends IMenu, Document {
    createdAt: Date,
    updatedAt: Date
}

const menuSchema = new mongoose.Schema<IMenuDocument>(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        menuTitle: {
            type: String,
            index: true,
            lowercase: true,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },

    },
    {
        timestamps: true
    }
)

export const Menu = mongoose.model("Menu", menuSchema)