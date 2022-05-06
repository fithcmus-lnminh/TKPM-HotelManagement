import express from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import {
  getAllRooms,
  getRoomById,
  createBill,
  rentalBillByUserId,
  rentalBillByUserIdAndBillId,
  getRevenueReport,
  getDensityUseReport
} from "../controllers/roomController.js";
import { isAdminOrManager } from "../middlewares/isAdminOrManager.js";

const router = express.Router();

router.get("/all-rooms", getAllRooms);
router.get("/:id", getRoomById);
router.post("/create-bill", isAuth, isAdminOrManager, createBill);
router.get("/rental-bill/:userId", rentalBillByUserId);
router.get("/rental-bill/:userId/:billId", rentalBillByUserIdAndBillId);
router.get("/revenue-report/:year/:month", isAuth, isAdminOrManager, getRevenueReport);
router.get("/density-use-report/:roomId/:year/:month", isAuth, isAdminOrManager, getDensityUseReport);

export default router;

