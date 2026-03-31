import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
    signup,
    signin,
    verifyEmail,
    logout,
    forgetPassword,
    resetPassword,
    checkAuth,
    updateProfile
} from "../controllers/user.controller"

const router = Router()

// signup
router.route("/signup").post(signup)

// signin
router.route("/signin").post(signin)

// logout
router.route("/logout").post(isAuthenticated, logout)

// verifyEmail
router.route("/verify-email").post(verifyEmail)

// forgetPassword
router.route("/forget-password").post(forgetPassword)

// resetPassword
router.route("/reset-password/:token").post(resetPassword)

// checkAuth
router.route("/check-auth").get(isAuthenticated, checkAuth)


// updateProfile
router.route("/update-profile").patch(
    isAuthenticated,
    upload.single("profilePicture"), // "profilePicture" is the key sent from the frontend
    updateProfile
);


export default router;