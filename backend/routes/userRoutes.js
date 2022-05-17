import express from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateProfile,
  getAllEmp,
  getAllUsers,
  changePassword,
} from "../controllers/userController.js";
import { isAdminOrManager } from "../middlewares/isAdminOrManager.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/login", authUser);
router.post("/register", registerUser);
router.put("/profile", isAuth, updateProfile);
router.put("/change-password", isAuth, changePassword);
router.get("/profile", isAuth, isAdminOrManager, getUserProfile);
router.get("/all-emp", isAuth, isAdmin, getAllEmp);
router.get("/all-user", isAuth, isAdmin, getAllUsers);
router.get("/:id", isAuth, getUserProfile);

export default router;
