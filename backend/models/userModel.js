import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    identity_card: {
      type: Number,
      required: true,
    },
    dob: {
      type: Date,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "User",
    },
    //if role = "User"
    customerType: {
      type: String,
      enum: ["Domestic", "Foreigner"],
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
