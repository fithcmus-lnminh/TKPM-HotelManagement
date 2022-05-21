import mongoose from "mongoose";

const cancelSchema = mongoose.Schema(
  {
    user_cancel: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    numOfDates: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("CancelRoom", cancelSchema);
