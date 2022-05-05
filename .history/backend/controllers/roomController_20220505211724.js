import Room from "../models/roomModel.js";
import RentalCard from "../models/rentalCardModel.js";
import User from "../models/userModel.js";

export const getAllRooms = async (req, res, next) => {
  try {
    const room = await Room.find();

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
  let userId = req.params.userId;
  console.log("userId: ", userId);
  console.log("type userId: ", typeof userId);

  const user = await User.findById({ parseInt(userId) });

  // const userId2 = parseInt(userId);
  // console.log("type userId2: ", typeof userId2);

  try {
    const rentalCard = await RentalCard.find({ user: { _id: userId } });

    if (rentalCard.length > 0) {
      rentalCard.forEach((item) => {
        console.log("UserId: ", item.user);
        console.log("RoomId: ", item.room);
      });
      res.json({
        user: rentalCard[0].user,
        room: rentalCard[0].room,
        startDate: rentalCard[0].startDate,
      });
    } else {
      res.status(404);
      throw new Error("Không có phiếu thuê nào.");
    }
  } catch (err) {
    next(err);
  }
};
