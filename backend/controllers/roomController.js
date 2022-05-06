import Room from "../models/roomModel.js";
import Bill from "../models/billModel.js";

function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

function pad2(n) {
  return (n < 10 ? '0' : '') + n;
}

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();

    if (rooms) {
      res.json(rooms);
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
        status: room.status
      });
    } else {
      res.status(404);
      throw new Error("Không tìm thấy phòng.");
    }
  } catch (err) {
    next(err);
  }
};

export const createBill = async (req, res, next) => {
  const {user, room, numOfDates, unitPrice, extraPrice, totalPrice} = req.body;

  try {
    const bill = await Bill.create({ user, room, numOfDates, unitPrice, extraPrice, totalPrice });

    if (bill) {
      res.status(200).json({
        _id: bill._id,
        user: bill.user,
        room: bill.room,
        numOfDates: bill.numOfDates,
        unitPrice: bill.unitPrice,
        extraPrice: bill.extraPrice,
        totalPrice: bill.totalPrice
      });
    } else {
      res.status(400);
      throw new Error("Invalid Bill.");
    }
  } catch (err) {
    next(err);
  }
};

export const rentalBillByUserId = async (req, res, next) => {
  const userId = req.params[userId];
  try {
    const bills = await Bill.find({ user: userId });

    if (bills) {
      res.status(200).json({bills});
    } else {
      res.status(404);
      throw new Error("Không tìm hóa đơn nào.");
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
      res.status(200).json({bill});
    } else {
      res.status(404);
      throw new Error("Không tìm hóa đơn.");
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
  var endDate = year + '-' + pad2(month) + '-' + pad2(days) + " 23:59:59.000";

  try {
    const bills = await Bill.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    });

    if (bills) {
      res.status(200).json(bills);
    } else {
      res.status(404);
      throw new Error("Không có lượt đặt phòng nào trong tháng " + month + ' năm ' + year);
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
  var endDate = year + '-' + pad2(month) + '-' + pad2(days) + " 23:59:59.000";

  try {
    const bills = await Bill.find({
      room: roomId,
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    });

    if (bills) {
      res.status(200).json(bills);
    } else {
      res.status(404);
      throw new Error("Không có lượt đặt phòng nào trong tháng " + month + ' năm ' + year);
    }
  } catch (err) {
    next(err);
  }
};
