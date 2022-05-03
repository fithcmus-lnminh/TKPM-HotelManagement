import mongoose from "mongoose";

const cancelSchema = mongoose.Schema(
  {
    user_cancel: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    rental_card: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "RentalCard",
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
