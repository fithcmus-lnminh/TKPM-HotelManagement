import Room from "../models/roomModel.js";
import RentalCard from "../models/rentalCardModel.js";
import User from "../models/userModel.js";

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();

    if (rooms.length > 0) {
      res.json({
        rooms: rooms,
      });
    } else {
      res.status(404);
      throw new Error("Không có phòng nào.");
    }
  } catch (err) {
    next(err);
  }
};

export const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.room._id);

    if (room) {
      res.json({
        _id: room._id,
        number: room.number,
        type: room.type,
        price: room.price,
        status: room.status,
      });
    } else {
      res.status(404);
      throw new Error("Không tìm thấy phòng.");
    }
  } catch (err) {
    next(err);
  }
};

export const getAllRentalCard = async (req, res, next) => {
  try {
    const rentalCard = await RentalCard.find();

    if (rentalCard.length > 0) {
      res.json({
        rentalCard,
      });
    } else {
      res.status(404);
      throw new Error("Không có phiếu thuê nào.");
    }
  } catch (err) {
    next(err);
  }
};

export const getRentalCardById = async (req, res, next) => {
  try {
    let userId = req.params.userId;
    let flag = -1;

    const users = await User.find();

    flag = users.findIndex((user) => {
      return user._id.toString() === userId;
    });

    if (flag === -1) {
      res.status(404);
      throw new Error("Người dùng không hợp lệ.");
    }

    const rentalCard = await RentalCard.find({ user: { _id: userId } });

    if (rentalCard.length > 0) {
      res.json({
        rentalCard,
      });
    } else {
      res.status(404);
      throw new Error("Không có phiếu thuê nào.");
    }
  } catch (err) {
    next(err);
  }
};

export const getRoomByType = async (req, res, next) => {
  try {
    let type = req.params.type;
    const rooms = await Room.find({ type });

    if (rooms.length > 0) {
      res.json({
        rooms,
      });
    } else {
      res.status(404);
      throw new Error("Không có phòng nào.");
    }
  } catch (err) {
    next(err);
  }
};

export const postCreateRoom = async (req, res, next) => {
  const { number, type, image, price, status, description } = req.body;

  try {
    const rooms = await Room.find();

    if (rooms.length > 0) {
      res.json({
        rooms: rooms,
      });
    } else {
      res.status(404);
      throw new Error("Không có phòng nào.");
    }
  } catch (err) {
    next(err);
  }
};
