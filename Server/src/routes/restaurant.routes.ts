import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
    createRestaurant,
    getRestaurant,
    updateRestaurant,
    getRestaurantOrder,
    updateOrderStatus,
    searchRestaurants,
    getSingleRestaurant
} from "../controllers/restaurant.controller"

const router = Router();

// 1. Create Restaurant 
router.route("/").post(
    isAuthenticated,
    upload.single("restaurantPicture"),
    createRestaurant
);

// 2. Get User's Own Restaurant (for dashboard)
router.route("/").get(isAuthenticated, getRestaurant);

// 3. Update Restaurant Profile
router.route("/update").patch(
    isAuthenticated,
    upload.single("restaurantPicture"),
    updateRestaurant
);

// 4. Get Restaurant Orders (This should be GET to view the order list.)
router.route("/orders").get(isAuthenticated, getRestaurantOrder);

// 5. Update Order Status
router.route("/order/:orderId/status").patch(isAuthenticated, updateOrderStatus);

// 6. Search Restaurants (Searches are usually GET requests.)
// 1. Only the /search route (when one filters cuisine only with no text)
router.route("/search").get(searchRestaurants);

// 2. /search/:searchText route (when user type something in search box and enter)
router.route("/search/:searchText").get(searchRestaurants);

// You can make searchText optional here, meaning that if someone wants to search using just the filter (without the search text), the route will still work.

// 7. Get Single Restaurant Details (Public view)
router.route("/:restaurantId").get(getSingleRestaurant);

export default router;