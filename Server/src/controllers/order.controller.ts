import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { Order } from "../models/order.model";
import Stripe from "stripe";
import { Menu } from "../models/menu.model"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Custom interface (to remove req.id error)
interface AuthenticatedRequest extends Request {
    user?: any;
}

// const createCheckoutSession = asyncHandler(async (req: any, res: Response) => {

//     
//     if (!dbMenus || dbMenus.length === 0) {
//         throw new ApiError(404, "Menus not found in database!");
//     }

//     const lineItems = cartItems.map((cartItem: any) => {
//         //Use dbMenus here and make sure it is an array.
//         const menuItem = dbMenus.find(
//             (item: any) => item._id.toString() === cartItem.menuId.toString()
//         );

//         if (!menuItem) {
//             throw new ApiError(404, `Item with ID ${cartItem.menuId} not found`);
//         }

//         return {
//             price_data: {
//                 currency: "usd",
//                 product_data: {
//                     name: menuItem.menuTitle,
//                     images: [menuItem.menuImage],
//                 },
//                 unit_amount: Math.round(menuItem.price * 100),
//             },
//             quantity: cartItem.quantity,
//         };
//     });

//     
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         shipping_address_collection: { allowed_countries: ['GB', 'US', 'CA'] },
//         line_items: lineItems,
//         mode: 'payment',
//         success_url: `${process.env.FRONTEND_URL}orders/status`,
//         cancel_url: `${process.env.FRONTEND_URL}cart`,
//         metadata: {
//             orderId: "some_id", //TODO: Enter your order ID here
//             restaurantId: restaurantId
//         }
//     });

//     return res.status(200).json({
//         success: true,
//         session: {
//             url: session.url // The actual Stripe session URL goes here
//         }
//     });
// });


const createCheckoutSession = asyncHandler(async (req: any, res: Response) => {
    const { cartItems, deliveryDetails, restaurantId } = req.body;

    // 1. Check if the data is coming in properly.
    if (!cartItems || cartItems.length === 0) {
        throw new ApiError(400, "No items in cart");
    }

    // 2. Fetch the menus from the database
    const menuIds = cartItems.map((item: any) => item.menuId);
    const dbMenus = await Menu.find({ _id: { $in: menuIds } });

    // 3. Safety Check: If nothing is found from the database, stop here.
    if (!dbMenus || dbMenus.length === 0) {
        throw new ApiError(404, "Menus not found in database!");
    }

    // 4. Creating orders in the database
    const order = new Order({
        user: req.user?._id, // Make sure req.user is coming from authMiddleware
        restaurant: restaurantId,
        deliveryDetails,
        cartItems: cartItems, // Keep the format correct according to your model.
        status: "pending",
        total: 0
    });
    await order.save();

    const lineItems = cartItems.map((cartItem: any) => {
        const menuItem = dbMenus.find(
            (item: any) => item._id.toString() === cartItem.menuId.toString()
        );

        if (!menuItem) {
            throw new ApiError(404, `Item with ID ${cartItem.menuId} not found`);
        }

        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: menuItem.menuTitle,
                    images: [menuItem.menuImage],
                },
                unit_amount: Math.round(menuItem.price * 100),
            },
            quantity: cartItem.quantity,
        };
    });

    // 5. Create a Stripe session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: { allowed_countries: ['GB', 'US', 'CA'] },
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}orders/status`,
        cancel_url: `${process.env.FRONTEND_URL}cart`,
        metadata: {
            orderId: order._id.toString(), // The actual order ID must be sent here!
            restaurantId: restaurantId
        }
    });

    return res.status(200).json({
        success: true,
        session: {
            url: session.url
        }
    });
});

const stripeWebhook = asyncHandler(async (req: Request, res: Response) => {
    let event;

    try {
        const signature = req.headers["stripe-signature"];

        // Construct the payload string for verification
        const payloadString = JSON.stringify(req.body, null, 2);
        const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;

        // Generate test header string for event construction
        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret,
        });

        // Construct the event using the payload string and header
        event = stripe.webhooks.constructEvent(payloadString, header, secret);
    } catch (error: any) {
        throw new ApiError(400, `Webhook error: ${error.message}`);
    }

    // Handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
        try {
            const session = event.data.object as Stripe.Checkout.Session;
            const order = await Order.findById(session.metadata?.orderId);

            if (!order) {
                throw new ApiError(404, "Order not found!");
            }

            // Update the order with the amount and status
            if (session.amount_total) {
                order.total = session.amount_total;
            }
            order.status = "confirmed";

            await order.save();
        } catch (error) {
            throw new ApiError(500, "Internal Server Error!");
        }
    }
    // Send a 200 response to acknowledge receipt of the event
    res.status(200).json(
        new ApiResponse(200)
    );
});

const createLineItems = (cartItems: any[], menuItems: any[]) => {
    return cartItems.map((cartItem) => {
        // ১. cartItem.menuId এবং menuItems এর ভেতরের item._id ম্যাচ করাও
        // safe check এর জন্য optional chaining এবং toString() ব্যবহার করো
        const menuItem = menuItems.find((item: any) =>
            item._id.toString() === cartItem.menuId.toString()
        );

        console.log("Restaurant Menus IDs:", menuItems.map(m => m._id.toString()));
        console.log("Cart Item ID:", cartItem.menuId);

        if (!menuItem) {
            // এরর মেসেজে আইডিটা প্রিন্ট করলে তুমি শিওর হতে পারবে কোন আইডিটা ডাটাবেসে নেই
            throw new ApiError(404, `Menu item with ID ${cartItem.menuId} not found in this restaurant!`);
        }

        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: menuItem.menuTitle,
                    images: [menuItem.menuImage]
                },
                unit_amount: Math.round(menuItem.price * 100) // ফ্লোটিং পয়েন্ট এরর এড়াতে Math.round ব্যবহার করো
            },
            quantity: cartItem.quantity
        };
    });
};

// order.controller.ts
const getOrders = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    console.log("Logged in User ID:", req.user?._id); // এখানে দেখো আইডি ঠিক আছে কি না
    const orders = await Order.find({ user: req.user?._id }).populate("restaurant");
    console.log("Found Orders:", orders.length); // দেখো কয়টা অর্ডার পেল

    return res.status(200).json(
        new ApiResponse(200, orders, "Orders fetched successfully!")
    );
});



export { createCheckoutSession, getOrders, stripeWebhook };