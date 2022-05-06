import express from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateProfile,
} from "../controllers/userController.js";
import { isAdminOrManager } from "../middlewares/isAdminOrManager.js";

const router = express.Router();
// POST API /api/login
router.post("/login", authUser);
router.post("/register", registerUser);
router.put("/profile", isAuth, updateProfile);
router.get("/:id", isAuth, getUserProfile);
//router.put;
//router.delete

export default router;
