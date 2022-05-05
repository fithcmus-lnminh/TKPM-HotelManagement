import express from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import {
  getAllRooms,
  getRoomById,
  getAllRentalCard,
  getRentalCardById,
  getRoomByType,
} from "../controllers/roomController.js";
import { isAdminOrManager } from "../middlewares/isAdminOrManager.js";

const router = express.Router();

router.get("/all-rooms", getAllRooms);
router.get("/rental-card", getAllRentalCard);
router.get("/rental-card/:userId", getRentalCardById);
router.get("/?type=Single", getRoomByType);
router.get("/:id", getRoomById);

export default router;
