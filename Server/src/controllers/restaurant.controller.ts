import { Request, Response } from "express";
// import mongoose from "mongoose"; 
import { Restaurant } from "../models/restaurant.model";
import { IUserDocument } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler"
import { ApiError } from "../utils/ApiError"
import { ApiResponse } from "../utils/ApiResponse"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary/cloudinary"
import { Order } from "../models/order.model";

// Direct import to fix Multer type errors
// import { Multer } from "multer";

interface AuthenticatedRequest extends Request {
    user?: IUserDocument;
    file?: any; // TODO: If Multer.File gives an error, give any for now, it can be fixed later.
}

const createRestaurant = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;

    const userId = req.user?._id as any // mongoose.Types.ObjectId;

    const existingRestaurant = await Restaurant.findOne({ user: userId });

    if (existingRestaurant) {
        throw new ApiError(400, "Restaurant already exists!");
    }

    if (!file) {
        throw new ApiError(400, "Restaurant image is required!");
    }

    const uploadResult = await uploadOnCloudinary(file.path);
    if (!uploadResult) {
        throw new ApiError(500, "Upload failed!");
    }

    const restaurant = await Restaurant.create({
        restaurantName,
        city,
        country,
        deliveryTime,
        cuisines: typeof cuisines === "string" ? JSON.parse(cuisines) : cuisines,
        restaurantPicture: uploadResult.secure_url,
        restaurantPicturePublicId: uploadResult.public_id,
        user: userId,
        menus: []
    });

    return res.status(201).json(
        new ApiResponse(201, restaurant, "Restaurant created successfully!")
    );
});

const getRestaurant = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {

    const userId = req.user?._id as any // mongoose.Types.ObjectId;
    const restaurant = await Restaurant.find({ user: userId });

    if (!restaurant) {
        throw new ApiError(400, "Restaurant not found!");
    }

    return res.status(200).json(
        new ApiResponse(200, restaurant, "Restaurant found successfully!")
    );

})

const updateRestaurant = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const {
        restaurantName,
        city,
        country,
        deliveryTime,
        cuisines
    } = req.body;

    const file = req.file;
    const userId = req.user?._id as any;

    // 1. Finding the restaurant
    const restaurant = await Restaurant.findOne({ user: userId });

    if (!restaurant) {
        throw new ApiError(404, "Restaurant not found!");
    }

    // 2. Image update logic
    let restaurantPictureUrl = restaurant.restaurantPicture;
    let restaurantPicturePublicId = restaurant.restaurantPicturePublicId;

    if (file?.path) {
        // Upload new photos
        const uploadResult = await uploadOnCloudinary(file.path);

        if (!uploadResult) {
            throw new ApiError(500, "Failed to upload new restaurant image!");
        }

        // Delete old photos (if any)
        if (restaurantPicturePublicId) {
            try {
                await deleteFromCloudinary(restaurantPicturePublicId);
            } catch (error) {
                console.error("Old restaurant image deletion failed:", error);
            }
        }

        restaurantPictureUrl = uploadResult.secure_url;
        restaurantPicturePublicId = uploadResult.public_id;
    }

    // 3. Updating the database
    restaurant.restaurantName = restaurantName || restaurant.restaurantName;
    restaurant.city = city || restaurant.city;
    restaurant.country = country || restaurant.country;
    restaurant.deliveryTime = deliveryTime || restaurant.deliveryTime;

    // Handle cuisines (since it's an array)
    if (cuisines) {
        restaurant.cuisines = typeof cuisines === "string" ? JSON.parse(cuisines) : cuisines;
    }

    restaurant.restaurantPicture = restaurantPictureUrl;
    restaurant.restaurantPicturePublicId = restaurantPicturePublicId;

    await restaurant.save();

    return res.status(200).json(
        new ApiResponse(200, restaurant, "Restaurant updated successfully!")
    );
});

const getRestaurantOrder = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?._id as any;

    // 1. First find the user's restaurant
    const restaurant = await Restaurant.findOne({ user: userId });

    if (!restaurant) {
        throw new ApiError(404, "Restaurant not found!");
    }

    // 2. Use `as any` to fix the error or pass the ID directly
    const orders = await Order.find({ restaurant: restaurant._id as any })
        .populate("restaurant")
        .populate("user");

    return res.status(200).json(
        new ApiResponse(200, orders, "Orders fetched successfully!")
    );
});

const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    if (!orderStatus) {
        throw new ApiError(400, "Order status is required!");
    }

    // 1. Find by ID (use _id)
    const order = await Order.findById(orderId);

    if (!order) {
        throw new ApiError(404, "Order not found!");
    }

    // 2. Status update (enum will be checked in TypeScript)
    order.status = orderStatus;
    await order.save();

    return res.status(200).json(
        new ApiResponse(200, order, "Order status updated successfully!")
    );
});

const searchRestaurants = asyncHandler(async (req: Request, res: Response) => {
    const searchText = (req.params.searchText as string) || "";
    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string || "")
        .split(",")
        .filter(c => c.trim() !== "");
    // It is safe to use `.filter(c => c.trim() !== "")`, because sometimes only commas (,) may be passed from the frontend.

    const query: any = {};

    // 1. Text search logic (name, city or country)
    // We will search if either searchText or searchQuery exists
    const search = searchText || searchQuery;

    if (search) {
        query.$or = [
            { restaurantName: { $regex: search, $options: "i" } },
            { city: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } },
            { cuisines: { $regex: search, $options: "i" } } // It's good to add cuisines here too.
        ];
    }

    // 2. Cuisine filter logic ($all is better if you want to have all selected cuisines)
    if (selectedCuisines.length > 0) {
        query.cuisines = { $in: selectedCuisines };
    }

    // 3. Database query
    const restaurants = await Restaurant.find(query).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, restaurants, `${restaurants.length} restaurants found!`)
    );
});

const getSingleRestaurant = asyncHandler(async (req: Request, res: Response) => {
    const restaurantId = req.params.id
    const restaurant = await Restaurant.findById(restaurantId)
        .populate({
            path: "menus",
            options: { createdAt: -1 }
        })

    if (!restaurant) {
        throw new ApiError(400, "Restaurant not fountd!");
    }

    return res.status(200).json(
        new ApiResponse(200, restaurant, "Restaurant found successfully!")
    );

})

// TODO: 
/** Next Challenge: Pagination
    If you have 100+ restaurants in your database, sending all the data at once will slow down performance. Do you want me to show you the pagination logic by adding limit and skip here?
 */

export {
    createRestaurant,
    getRestaurant,
    updateRestaurant,
    getRestaurantOrder,
    updateOrderStatus,
    searchRestaurants,
    getSingleRestaurant
}