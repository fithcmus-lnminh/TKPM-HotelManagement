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
    const rentalCard = await RentalCard.find()
      .populate("user")
      .populate("room");

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
    const userId = req.params.userId;
    const users = await User.find();

    const flag = users.findIndex((user) => {
      return user._id.toString() === userId;
    });

    if (flag === -1) {
      res.status(404);
      throw new Error("Người dùng không hợp lệ.");
    }

    const rentalCard = await RentalCard.find({ user: { _id: userId } })
      .populate("user")
      .select("-password")
      .populate("room");

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
    const type = req.params.type;
    const rooms = await Room.find({ type });

    if (rooms.length > 0) {
      res.json({
        rooms,
      });
    } else {
      res.status(404);
      throw new Error("Không tìm thấy phòng.");
    }
  } catch (err) {
    next(err);
  }
};

export const postCreateRoom = async (req, res, next) => {
  const { number, type, image, price, status, description } = req.body;

  try {
    const info = {
      number,
      type,
      image,
      price,
      status,
      description,
    };

    for (let key in info) {
      // if (info[key] === undefined) {
      if (Boolean(info[key])) {
        delete info[key];
      }
    }

    const room = await Room.create({
      ...info,
    });

    if (room) {
      res.status(201).json({
        ...info,
      });
    } else {
      res.status(404);
      throw new Error("Không tạo được phòng.");
    }
  } catch (err) {
    next(err);
  }
};

export const postCreateRentalCard = async (req, res, next) => {
  const { user, room, startDate, customerInfo } = req.body;

  try {
    const info = {
      user,
      room,
      startDate,
      customerInfo,
    };

    for (let key in info) {
      // if (info[key] === undefined) {
      if (Boolean(info[key])) {
        delete info[key];
      }
    }

    const rentalCard = await RentalCard.create({
      ...info,
    });

    if (rentalCard) {
      res.status(201).json({
        ...info,
      });
    } else {
      res.status(404);
      throw new Error("Không đặt được phòng.");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const rooms = await Room.find();

    const flag = rooms.findIndex((room) => {
      return room._id.toString() === roomId;
    });

    if (flag === -1) {
      res.status(404);
      throw new Error("Không tìm thấy phòng.");
    } else {
      await Room.deleteOne({ _id: roomId });
      res.status(201).json({
        success: true,
        message: "Xóa phòng thành công",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  const { number, type, image, price, status, description } = req.body;

  try {
    const roomId = req.params.roomId;
    const rooms = await Room.find();

    const flag = rooms.findIndex((room) => {
      return room._id.toString() === roomId;
    });

    if (flag === -1) {
      res.status(404);
      throw new Error("Không tìm thấy phòng.");
    } else {
      const info = {
        number,
        type,
        image,
        price,
        status,
        description,
      };

      for (let key in info) {
        if (info[key] === undefined) {
          delete info[key];
        }
      }

      const roomUpdate = await Room.updateOne({ _id: roomId }, info);

      if (roomUpdate) {
        res.status(201).json({
          room: roomUpdate,
          success: true,
          message: "Cập nhật thông tin phòng thành công",
        });
      } else {
        res.status(404);
        throw new Error("Không thể cập nhật được phòng này.");
      }
    }
  } catch (err) {
    next(err);
  }
};
