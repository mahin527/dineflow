import mongoose from "mongoose"

export interface IRestaurant {
    user: mongoose.Schema.Types.ObjectId,
    restaurantName: string,
    city: string,
    country: string,
    deliveryTime: number,
    cuisines: string[],
    image: string,
    menus: mongoose.Schema.Types.ObjectId,

}

export interface IRestaurantDocument extends IRestaurant, Document {
    createdAt: Date,
    updatedAt: Date
}

const restaurantSchema = new mongoose.Schema<IRestaurantDocument>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        restaurantName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
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
        deliveryTime: {
            type: Number,
            required: true
        },
        cuisines: [{
            type: String,
            required: true
        }],
        image: {
            type: String,
            required: true
        },
        menus: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Menu"
        }]
    },
    {
        timestamps: true
    }
)

export const Restaurant = mongoose.model("Restaurant", restaurantSchema)