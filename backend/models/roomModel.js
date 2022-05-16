import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const roomSchema = mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      default: "Phòng đơn",
      enum: ["Phòng đơn", "Phòng đôi", "Phòng ba", "Phòng bốn", "Phòng VIP"],
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: Boolean,
      required: true,
      default: true, //true là còn phòng, false là hết phòng
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Room", roomSchema);
