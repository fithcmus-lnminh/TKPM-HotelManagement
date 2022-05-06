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
        role: user.role,
        avatar: user.avatar,
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
  // const { name, email, password } = req.body;
  const {
    name,
    email,
    password,
    identity_card,
    avatar,
    dob,
    phoneNumber,
    role,
    customerType,
    address,
  } = req.body;

  try {
    const info = {
      name,
      email,
      password,
      identity_card,
      avatar,
      dob: new Date(dob),
      phoneNumber,
      role,
      customerType,
      address,
    };

    for (let key in info) {
      if (Boolean(info[key]) === false) {
        delete info[key];
      }
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("Email đã tồn tại");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // const user = await User.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });

    const user = await User.create({
      ...info,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        identity_card: 123456789,
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
    console.log("user: ", user);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
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
