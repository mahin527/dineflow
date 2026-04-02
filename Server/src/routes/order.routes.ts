import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
    createCheckoutSession,
    getOrders
} from "../controllers/order.controller"

const router = Router();

// getOrders
router.route("/").get(
    isAuthenticated,
    getOrders
);

// createCheckoutSession
router.route("/checkout/create-checkout-session").post(
    isAuthenticated,
    createCheckoutSession
);

// Webhook route
// router.route("webhook").post()

export default router