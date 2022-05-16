import Room from "../models/roomModel.js";
import Bill from "../models/billModel.js";

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function pad2(n) {
  return (n < 10 ? "0" : "") + n;
}
import RentalCard from "../models/rentalCardModel.js";
import User from "../models/userModel.js";

export const getAllRooms = async (req, res, next) => {
  try {
    const keyword = req.query.keyword
      ? {
          $expr: {
            $gt: [
              {
                $size: {
                  $regexFindAll: {
                    input: { $toString: "$number" },
                    regex: `${req.query.keyword}`,
                  },
                },
              },
              0,
            ],
          },
        }
      : {};
    const rooms = await Room.find(keyword);

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

export const getRoomByNumber = async (req, res, next) => {
  try {
    const room = await Room.find({ number: req.params.number });

    if (room) {
      res.json(room[0]);
    } else {
      res.status(404);
      throw new Error("Không tìm thấy phòng.");
    }
  } catch (err) {
    next(err);
  }
};

export const createBill = async (req, res, next) => {
  const { rentalCard, unitPrice, extraPrice, totalPrice } = req.body;

  try {
    const bill = await Bill.create({
      rentalCard,
      unitPrice,
      extraPrice,
      totalPrice,
    });

    if (bill) {
      res.status(200).json({
        _id: bill._id,
        rentalCard: bill.rentalCard,
        unitPrice: bill.unitPrice,
        extraPrice: bill.extraPrice,
        totalPrice: bill.totalPrice,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Bill.");
    }
  } catch (err) {
    next(err);
  }
};

export const getAllRentalCard = async (req, res, next) => {
  try {
    const rentalCard = await RentalCard.find()
      .populate({
        path: "user",
        select:
          "_id name email identity_card avatar dob phoneNumber role customerType address",
      })
      .populate({
        path: "room",
        select: "_id number type image price status description",
      });

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
      .populate({
        path: "user",
        select:
          "_id name email identity_card avatar dob phoneNumber role customerType address",
      })
      .populate({
        path: "room",
        select: "_id number type image price status description",
      });

    if (rentalCard.length > 0) {
      res.json({
        rentalCard: rentalCard.reverse(),
      });
    } else {
      res.status(404);
      throw new Error("Không có phiếu thuê nào.");
    }
  } catch (err) {
    next(err);
  }
};

export const rentalBillByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const rentalCards = await RentalCard.find({ user: userId });
    let bills = [];
    for (let r of rentalCards) {
      const bill = await Bill.find({ rentalCard: r._id }).populate({
        path: "rentalCard",
        select: "_id user room numOfDates startDate",
        populate: { path: "room" },
      });
      bills.push(bill[0]);
    }

    if (bills) {
      res.status(200).json({ bills: bills.reverse() });
    } else {
      res.status(404);
      throw new Error("Không tìm hóa đơn nào.");
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

export const rentalBillByUserIdAndBillId = async (req, res, next) => {
  const userId = req.params[userId];
  const billId = req.params[billId];

  try {
    const bill = await Bill.find({ _id: billId, user: userId });

    if (bill) {
      res.status(200).json({ bill });
    } else {
      res.status(404);
      throw new Error("Không tìm hóa đơn.");
    }
  } catch (err) {
    next(err);
  }
};
export const postCreateRoom = async (req, res, next) => {
  const { number, type, image, price, description } = req.body;

  try {
    const existedRoom = Room.find({ number: number });

    if (existedRoom) {
      throw new Error("Phòng đã tồn tại. Vui lòng thử số phòng khác");
    }

    const info = {
      number,
      type,
      image,
      price,
      status: true,
      description,
    };

    for (let key in info) {
      if (Boolean(info[key]) === false) {
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

export const getRevenueReport = async (req, res, next) => {
  const year = req.params[year];
  const month = req.params[month];
  const days = daysInMonth(month, year);

  var startDate = year + "-" + pad2(month) + "-01 00:00:00.000";
  var endDate = year + "-" + pad2(month) + "-" + pad2(days) + " 23:59:59.000";

  try {
    const bills = await Bill.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    if (bills) {
      let revenue = 0;
      for await (const bill of bills) {
        revenue += bill.totalPrice;
      }
      res.status(200).json(revenue);
    } else {
      res.status(404);
      throw new Error(
        "Không có doanh thu trong tháng " + month + " năm " + year
      );
    }
  } catch (err) {
    next(err);
  }
};
export const postCreateRentalCard = async (req, res, next) => {
  const { user, room, startDate, numOfDates, customerInfo } = req.body;

  try {
    const info = {
      user,
      room,
      startDate,
      numOfDates,
      customerInfo,
    };

    for (let key in info) {
      if (Boolean(info[key]) === false) {
        delete info[key];
      }
    }

    const room2 = await Room.findById(room);
    const bookedRoom = await Room.find({ number: room2.number });
    if (bookedRoom) {
      bookedRoom[0].status = false;
      await bookedRoom[0].save();
    }

    const rentalCard = await RentalCard.create({
      ...info,
    });

    console.log(rentalCard);

    if (rentalCard) {
      res.status(201).json({
        _id: rentalCard._id,
        user: rentalCard.user,
        room: rentalCard.room,
        startDate: rentalCard.startDate,
        numOfDates: rentalCard.numOfDates,
        customerInfo: rentalCard.customerInfo,
      });
    } else {
      res.status(404);
      throw new Error("Không đặt được phòng.");
    }
  } catch (err) {
    next(err);
  }
};

export const getDensityUseReport = async (req, res, next) => {
  const roomId = req.params[roomId];
  const year = req.params[year];
  const month = req.params[month];
  const days = daysInMonth(month, year);

  var startDate = year + "-" + pad2(month) + "-01 00:00:00.000";
  var endDate = year + "-" + pad2(month) + "-" + pad2(days) + " 23:59:59.000";

  try {
    const bills = await Bill.find({
      room: roomId,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    if (bills) {
      res.status(200).json(bills.length);
    } else {
      res.status(404);
      throw new Error(
        "Không có lượt đặt phòng nào trong tháng " + month + " năm " + year
      );
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
        if (Boolean(info[key]) === false) {
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

export const updateToPaid = async (req, res, next) => {
  const bill = await Bill.findById(req.params.id);

  try {
    if (bill) {
      bill.isPaid = true;
      bill.paidAt = Date.now();
      //paypal response
      bill.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedBill = await bill.save();
      res.json(updatedBill);
    } else {
      throw new Error("Không có hóa đơn này", 404);
    }
  } catch (err) {
    next(err);
  }
};

export const createRoomReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    const room = await Room.find({ number: req.params.number });

    if (room) {
      const alreadyReviewed = room[0].reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Bạn đã đánh giá phòng này");
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      room[0].reviews.push(review);

      room[0].numReviews = room[0].reviews.length;
      room[0].rating =
        room[0].reviews.reduce((acc, item) => acc + item.rating, 0) /
        room[0].reviews.length;

      await room[0].save();
      res.status(201).json("Đã thêm đánh giá");
    } else {
      throw new Error("Không có phòng này", 404);
    }
  } catch (err) {
    next(err);
  }
};
