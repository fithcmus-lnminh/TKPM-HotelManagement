import mongoose from "mongoose";

const rentalCardModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
    numOfDates: {
      type: Number,
      required: true,
      default: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    // Nếu người quản lí đặt phòng cho khách
    customerInfo: {
      name: {
        type: String,
      },
      identity_card: {
        type: Number,
      },
      dob: {
        type: Date,
      },
      phoneNumber: {
        type: String,
      },
      address: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("RentalCard", rentalCardModel);
