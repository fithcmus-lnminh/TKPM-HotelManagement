import express from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateProfile,
  getAllManagers,
  getAllUsers,
} from "../controllers/userController.js";
import { isAdminOrManager } from "../middlewares/isAdminOrManager.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/login", authUser);
router.post("/register", registerUser);
router.put("/profile", isAuth, updateProfile);
router.get("/:id", isAuth, getUserProfile);
router.get("/profile", isAuth, isAdminOrManager, getUserProfile);
router.get("/all-manager", isAuth, isAdmin, getAllManagers);
router.get("/all-user", isAuth, isAdmin, getAllUsers);

export default router;
