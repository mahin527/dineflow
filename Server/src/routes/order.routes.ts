import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
    createCheckoutSession,
    getOrders,
    stripeWebhook
} from "../controllers/order.controller.js"
import express from 'express'

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
router.route("/webhook").post(express.raw({ type: 'application/json' }), stripeWebhook)

export default router