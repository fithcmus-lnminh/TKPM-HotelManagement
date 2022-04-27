import express from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();
// POST API /api/login
router.post("/login", authUser);
router.post("/register", registerUser);
router.get("/profile", isAuth, getUserProfile);

export default router;
