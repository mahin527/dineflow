import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
    addMenu,
    updateMenu,
    deleteMenu
} from "../controllers/menu.controller"

const router = Router();

// addMenu
router.route("/").post(
    isAuthenticated,
    upload.single("menuImage"),
    addMenu
);

// updateMenu
router.route("/update").patch(
    isAuthenticated,
    upload.single("menuImage"),
    updateMenu
);

// deleteMenu
router.route("/:menuId").delete(isAuthenticated, deleteMenu);

export default router