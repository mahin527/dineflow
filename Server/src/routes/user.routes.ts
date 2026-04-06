import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
    signup,
    signin,
    verifyEmail,
    signout,
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

// signout
router.route("/signout").post(isAuthenticated, signout)

// verifyEmail
router.route("/verify-email").post(verifyEmail)

// forgetPassword
router.route("/forget-password").post(forgetPassword)

// resetPassword
router.route("/reset-password/:token").post(resetPassword)

// checkAuth
router.route("/check-auth").get(isAuthenticated, checkAuth)


// updateProfile
router.route("/profile/update").patch(
    isAuthenticated,
    upload.single("profilePicture"), // "profilePicture" is the key sent from the frontend
    updateProfile
);


export default router;