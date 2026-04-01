import mongoose, { Document } from "mongoose";

export interface IMenu {
    menuTitle: string;
    description: string;
    price: number;
    menuImage: string;
    menuImageId: string;
}

export interface IMenuDocument extends IMenu, Document {
    createdAt: Date;
    updatedAt: Date;
}

const menuSchema = new mongoose.Schema<IMenuDocument>(
    {

        menuTitle: {
            type: String,
            index: true,
            lowercase: true,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        menuImage: {
            type: String,
            required: true

        },
        menuImageId: {
            type: String,
            required: true

        },
    },
    { timestamps: true }
);

export const Menu = mongoose.model("Menu", menuSchema);