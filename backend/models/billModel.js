import mongoose from "mongoose";

const billSchema = mongoose.Schema(
  {
    rentalCard: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "RentalCard",
    },
    unitPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    extraPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    //if pay online
    paymentMethod: {
      type: String,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Bill", billSchema);
