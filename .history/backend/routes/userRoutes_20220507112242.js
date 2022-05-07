import express from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";
import { isAdminOrManager } from "../middlewares/isAdminOrManager.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();
// POST API /api/login
router.post("/login", authUser);
router.post("/register", registerUser);
router.get("/profile", isAuth, isAdminOrManager, getUserProfile);
router.get("/profile", isAuth, isAdmin, getUserProfile);
router.get("/profile", isAuth, isAdmin, getUserProfile);

//router.put;
//router.delete

export default router;
