import express from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import {
  getAllRooms,
  getRoomByNumber,
  createBill,
  rentalBillByUserId,
  rentalBillByUserIdAndBillId,
  getRevenueReport,
  getDensityUseReport,
  getAllRentalCard,
  getRentalCardById,
  getRoomByType,
  postCreateRoom,
  postCreateRentalCard,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";
import { isAdminOrManager } from "../middlewares/isAdminOrManager.js";

const router = express.Router();

router.get("/all-rooms", getAllRooms);
router.post("/create-bill", isAuth, createBill);
router.get("/rental-bill/:userId", rentalBillByUserId);
router.get("/rental-bill/:userId/:billId", rentalBillByUserIdAndBillId);
router.get(
  "/revenue-report/:year/:month",
  isAuth,
  isAdminOrManager,
  getRevenueReport
);
router.get(
  "/density-use-report/:roomId/:year/:month",
  isAuth,
  isAdminOrManager,
  getDensityUseReport
);
router.get("/rental-card", getAllRentalCard);
router.get("/rental-card/:userId", getRentalCardById);
router.post("/create-rental-card", isAuth, postCreateRentalCard);
router.get("/get-rooms-by-type/:type", getRoomByType);
router.post("/create-room", isAuth, isAdminOrManager, postCreateRoom);
router.put("/update-room/:roomId", isAuth, isAdminOrManager, updateRoom);
router.delete("/delete-room/:roomId", isAuth, isAdminOrManager, deleteRoom);
router.get("/:number", getRoomByNumber);

export default router;
