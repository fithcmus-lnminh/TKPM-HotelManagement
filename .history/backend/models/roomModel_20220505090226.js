import mongoose from "mongoose";

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
    desciption: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Room", roomSchema);
