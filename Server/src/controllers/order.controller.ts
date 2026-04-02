import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { Order } from "../models/order.model";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Custom interface (to remove req.id error)
interface AuthenticatedRequest extends Request {
    user?: any;
}

const createCheckoutSession = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {

    const { cartItems, deliveryDetails, restaurantId } = req.body;

    // 1. Populate restaurants and menus
    const restaurant = await Restaurant.findById(restaurantId).populate("menus");

    if (!restaurant) {
        throw new ApiError(404, "Restaurant not found!");
    }

    // 2. Create order object (do not save first, will update when payment is successful)
    const order = new Order({
        restaurant: restaurant._id,
        user: req.user?._id,
        deliveryDetails,
        cartItems: cartItems.map((item: any) => ({
            menuId: item.menuId,
            name: item.title,
            image: item.image,
            price: item.price,
            quantity: item.quantity
        })),
        status: "pending",
        total: 0 // Can be calculated later
    });

    // ৩. Line Items creating 
    const lineItems = createLineItems(cartItems, restaurant.menus);

    // ৪. Stripe Session creating
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ["US", "BD", "GB"]
        },
        line_items: lineItems, // Property name line_items (according to Stripe documentation)
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/order/status`,
        cancel_url: `${process.env.FRONTEND_URL}/cart`,
        metadata: {
            orderId: order._id.toString(),
            restaurantId: restaurantId
        }
    });

    if (!session.url) {
        throw new ApiError(500, "Error while creating stripe session!");
    }

    await order.save();

    return res.status(201).json(
        new ApiResponse(201, { sessionUrl: session.url }, "Checkout session created!")
    );
});

const createLineItems = (cartItems: any[], menuItems: any[]) => {
    return cartItems.map((cartItem) => {
        // Finding menu items
        const menuItem = menuItems.find((item: any) => item._id.toString() === cartItem.menuId);

        if (!menuItem) {
            throw new ApiError(404, `Menu item ${cartItem.menuId} not found!`);
        }

        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: menuItem.menuTitle, // my menu model has menuTitle
                    images: [menuItem.menuImage] // my menu model has menuImage 
                },
                unit_amount: menuItem.price * 100 // Stripe calculates in cents
            },
            quantity: cartItem.quantity
        };
    });
};

const getOrders = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const orders = await Order.find({ user: req.user?._id }).populate("restaurant");

    return res.status(200).json(
        new ApiResponse(200, orders, "Orders fetched successfully!")
    );
});

export { createCheckoutSession, getOrders };