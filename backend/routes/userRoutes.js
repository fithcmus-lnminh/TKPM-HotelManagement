import express from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { authUser, registerUser } from "../controllers/userController.js";

const router = express.Router();
// POST API /api/login
router.post("/login", authUser);
router.post("/register", registerUser);

export default router;
