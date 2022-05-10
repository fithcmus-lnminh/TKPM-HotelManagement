import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

export async function authUser(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        //res.send
        _id: user._id,
        name: user.name,
        email: user.email,
        identity_card: user.identity_card,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Nhập sai email hoặc mật khẩu");
      //res.status(401).send({ message: "Invalid email or password" });
    }
  } catch (err) {
    next(err);
  }
}

export async function registerUser(req, res, next) {
  const { name, email, password, identity_card, customerType } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("Email đã tồn tại");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      identity_card,
      customerType,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        identity_card: user.identity_card,
        customerType: user.customerType,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (err) {
    next(err);
  }
}

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        identity_card: user.identity_card,
        dob: user.dob?.toISOString().split("T")[0],
        customerType: user.customerType,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
      });
    } else {
      res.status(404);
      throw new Error("Không tìm thấy người dùng.");
    }
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, identity_card, dob, phone, address } = req.body;
    console.log(req.body);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.identity_card = identity_card || user.identity_card;
      user.dob = dob || user.dob;
      user.phoneNumber = phone || user.phoneNumber;
      user.address = address || user.address;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        identity_card: updatedUser.identity_card,
        dob: updatedUser.dob,
        phoneNumber: updatedUser.phoneNumber,
        address: updatedUser.address,
        role: updatedUser.role,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("Không có user");
    }
  } catch (err) {
    next(err);
  }
};
export const getAllManagers = async (req, res, next) => {
  try {
    const managers = await User.find({ role: "Manager" }).select(
      "_id name email identity_card avatar role"
    );

    if (managers.length > 0) {
      res.json(managers);
    } else {
      res.status(404);
      throw new Error("Không tìm thấy nhân viên.");
    }
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: "User" }).select(
      "_id name email identity_card avatar role"
    );

    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404);
      throw new Error("Không tìm thấy người dùng.");
    }
  } catch (err) {
    next(err);
  }
};
