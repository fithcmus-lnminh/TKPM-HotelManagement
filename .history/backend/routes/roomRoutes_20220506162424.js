import express from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import {
  getAllRooms,
  getRoomById,
  getAllRentalCard,
  getRentalCardById,
  getRoomByType,
  postCreateRoom,
  postCreateRentalCard,
  // updateRoom,
  // deleteRoom,
} from "../controllers/roomController.js";
import { isAdminOrManager } from "../middlewares/isAdminOrManager.js";
import { isManager } from "../middlewares/isManager.js";

const router = express.Router();

router.get("/all-rooms", getAllRooms);
router.get("/rental-card", getAllRentalCard);
router.get("/rental-card/:userId", getRentalCardById);
router.get("/get-rooms-by-type/:type", getRoomByType);
router.post("/create-room", isAuth, isAdminOrManager, postCreateRoom);
router.post("/create-rental-card", postCreateRentalCard);
// router.put("/update-room/:roomId", updateRoom);
// router.delete("/delete-room/:roomId", deleteRoom);
router.get("/:id", getRoomById);

export default router;
