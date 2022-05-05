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
    },
    type: {
      type: String,
      required: true,
      default: "Single",
      enum: ["Single", "Double", "Triple", "Quad"],
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
    desciption: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Room", roomSchema);
