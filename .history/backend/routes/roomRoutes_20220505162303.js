import express from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getAllRooms, getRoomById } from "../controllers/roomController.js";
import { isAdminOrManager } from "../middlewares/isAdminOrManager.js";

const router = express.Router();

router.get("/all-rooms", getAllRooms);
router.get("/:id", getRoomById);
router.get("/rental-card", getAllRentalCard);

export default router;
