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
    startDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("RentalCard", rentalCardModel);
