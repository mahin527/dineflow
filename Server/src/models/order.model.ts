import mongoose, { Document } from "mongoose";

export interface IOrder {
    user: mongoose.Types.ObjectId;
    restaurant: mongoose.Types.ObjectId;
    deliveryDetails: {
        email: string;
        fullname: string;
        address: string;
        city: string;
    };
    cartItems: {
        menuId: string;
        menuTitle: string;
        price: number;
        menuImage: string;
        quantity: number;
    }[];
    total: number;
    status: "pending" | "preparing" | "confirmed" | "cancelled" | "delivered";
}

export interface IOrderDocument extends IOrder, Document {
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrderDocument>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId, ref: "Restaurant",
            required: true
        },
        deliveryDetails: {
            email: { type: String, required: true },
            fullname: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true }
        },
        cartItems: [{
            menuId: { type: String, required: true },
            menuTitle: { type: String, required: true },
            menuImage: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }],
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "preparing", "confirmed", "cancelled", "delivered"],
            default: "pending",
            required: true
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);