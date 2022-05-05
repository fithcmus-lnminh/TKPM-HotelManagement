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
  try {
    let userId = req.params.userId;
    console.log("userId: ", userId);
    console.log("type userId: ", typeof userId);

    const users = await User.find();
    console.log("users: ", users);

    let flag = -1;

    flag = users.findIndex((user) => {
      console.log("_id: ", user._id);
      return user._id === new ObjectId(userId);
    });

    console.log("flag: ", flag);

    // if (!user) {
    //   res.status(404);
    //   throw new Error("Người dùng không hợp lệ.");
    // }

    const rentalCard = await RentalCard.find({ user: { _id: userId } });
    console.log("RentalCard: ", rentalCard);

    if (rentalCard.length > 0) {
      rentalCard.forEach((item) => {
        console.log("UserId: ", item.user);
        console.log("RoomId: ", item.room);
      });
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
