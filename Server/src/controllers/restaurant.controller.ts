import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler"
import { ApiError } from "../utils/ApiError"
import { ApiResponse } from "../utils/ApiResponse"
import { Restaurant } from "../models/restaurant.model"

const createRestaurant = asyncHandler(async (req: Request, res: Response) => {
    const {
        restaurantName,
        city,
        country,
        deliveryTime,
        cuisines,
        image,
        menus } = req.body;

    const file = req.file
    const restaurant = await Restaurant.findOne(
        {
            user: req.user
        }
    )

    // Find restaurant
    if (restaurant) {
        throw new ApiError(404, "restaurant already exist!");
    }


    // Return response
    return res.status(201).json(
        new ApiResponse(201, "Restaurant created successfully!")
    )
})

export { createRestaurant }