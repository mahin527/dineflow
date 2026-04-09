import type { Request, Response } from "express";
import { Menu } from "../models/menu.model.js";
import { Restaurant } from "../models/restaurant.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary/cloudinary.js"
import type { IUserDocument } from "../models/user.model.js";
import mongoose from "mongoose";

interface AuthenticatedRequest extends Request {
    user?: IUserDocument;
    file?: any; // TODO: If Multer.File gives an error, give any for now, it can be fixed later.
}

const addMenu = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { menuTitle, description, price } = req.body;
    const file = req.file;

    if (!file) {
        throw new ApiError(400, "Menu image is required!");
    }

    // 1. Checking restaurant (must have restaurant before creating menu)
    const userId = req.user?._id as any;
    const restaurant = await Restaurant.findOne({ user: userId });

    if (!restaurant) {
        throw new ApiError(404, "Restaurant not found! Create a restaurant first.");
    }

    // 2. Image upload
    const uploadResult = await uploadOnCloudinary(file.path);
    if (!uploadResult) {
        throw new ApiError(500, "Upload failed!");
    }

    // 3. create menu
    const menu = await Menu.create({
        menuTitle,
        description,
        price,
        menuImage: uploadResult.secure_url,
        menuImageId: uploadResult.public_id,
    });

    // 4. Pushing ID to restaurant menu list 
    // Using (restaurant.menus as any) here is handy for type safety
    (restaurant.menus as any).push(menu._id);
    await restaurant.save();

    return res.status(201).json(
        new ApiResponse(201, menu, "Menu created successfully!")
    );
});

const updateMenu = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { menuId } = req.params;
    const { menuTitle, description, price } = req.body;
    const file = req.file;

    // 1. Find menu (findById requires direct id, not object)
    const menu = await Menu.findById(menuId);

    if (!menu) {
        throw new ApiError(404, "Menu not found!");
    }

    // 2. Image update logic
    let menuImageUrl = menu.menuImage;
    let menuImagePublicId = menu.menuImageId;

    if (file?.path) {
        const uploadResult = await uploadOnCloudinary(file.path);

        if (!uploadResult) {
            throw new ApiError(500, "Failed to upload new menu image!");
        }

        if (menuImagePublicId) {
            try {
                await deleteFromCloudinary(menuImagePublicId);
            } catch (error) {
                console.error("Old menu image deletion failed:", error);
            }
        }
        menuImageUrl = uploadResult.secure_url;
        menuImagePublicId = uploadResult.public_id;
    }

    // 3. Update and save
    menu.menuTitle = menuTitle || menu.menuTitle;
    menu.description = description || menu.description;
    menu.price = price || menu.price;
    menu.menuImage = menuImageUrl;
    menu.menuImageId = menuImagePublicId;

    await menu.save();

    return res.status(200).json(
        new ApiResponse(200, menu, "Menu updated successfully!")
    );
});

/*
The menu delete function is a little tricky, because here you have to do three things at once:
1. Deleting the menu document from the database.
2. Delete that menu image from Cloudinary.
3. Remove (Pull) the ID of that particular menu from the menus array of the Restaurant model.
*/
const deleteMenu = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { menuId } = req.params;
    const userId = req.user?._id as any;

    // 1. Find the menu
    const menu = await Menu.findById(menuId);

    if (!menu) {
        throw new ApiError(404, "Menu not found!");
    }

    // 2. Deleting menu image from Cloudinary
    if (menu.menuImageId) {
        try {
            await deleteFromCloudinary(menu.menuImageId);
        } catch (error) {
            console.error("Failed to delete menu image from Cloudinary:", error);
            // We will not stop deleting the menu from the database even if the image is not deleted
        }
    }

    // 3. Deleting menu from database
    await Menu.findByIdAndDelete(menuId);

    // 4. $pull (remove) this ID from the restaurant's 'menus' array 
    // It is very important that the restaurant model does not contain any 'orphan' or invalid IDs
    await Restaurant.findOneAndUpdate(
        // TODO: (node:2183) [MONGOOSE] Warning: mongoose: the `new` option for `findOneAndUpdate()` and `findOneAndReplace()` is deprecated. Use `returnDocument: 'after'` instead.
        { user: userId },
        {
            $pull: { menus: menuId }
            /*
             $pull operator: 
             If you only delete the menu but don't remove the id from the restaurant model, 
             then when populating the restaurant later it will return error or show null value. 
             $pull automatically pulls that id from the array.
            */
        }
    );

    return res.status(200).json(
        new ApiResponse(200, {}, "Menu deleted successfully!")
    );
});


const getAllMenus = asyncHandler(async (req, res) => {
    const menus = await Menu.find();
    res.status(200).json({
        success: true,
        data: menus 
    });
});

export { addMenu, updateMenu, deleteMenu, getAllMenus }