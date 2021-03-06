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

    const existedIDC = await User.find({
      identity_card,
    });

    if (existedIDC.length > 0) {
      res.status(400);
      throw new Error("CMND/CCCD đã tồn tại");
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
      res.status(400);
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

    const existedEmail = await User.find({ email, _id: { $ne: req.user._id } });
    const existedIDC = await User.find({
      identity_card,
      _id: { $ne: req.user._id },
    });

    if (existedEmail.length > 0) {
      res.status(400);
      throw new Error("Địa chỉ email đã tồn tại");
    }
    if (existedIDC.length > 0) {
      res.status(400);
      throw new Error("CMND/CCCD đã tồn tại");
    }

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
      res.status(400);
      throw new Error("Không có user");
    }
  } catch (err) {
    next(err);
  }
};
export const getAllEmp = async (req, res, next) => {
  try {
    const emp = await User.find({
      $or: [{ role: "Receptionist" }, { role: "Manager" }],
    }).select("_id name email identity_card role createdAt");

    console.log(emp);

    if (emp.length > 0) {
      res.json(emp.reverse());
    } else {
      res.status(400);
      throw new Error("Không tìm thấy nhân viên.");
    }
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: "User" }).select(
      "_id name email identity_card avatar role createdAt"
    );

    if (users.length > 0) {
      res.json(users.reverse());
    } else {
      res.status(400);
      throw new Error("Không tìm thấy người dùng.");
    }
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (user && (await user.comparePassword(oldPassword))) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;

      await user.save();
      return res.status(200).json("Thay đổi mật khẩu thành công");
    } else {
      res.status(400);
      throw new Error("Mật khẩu cũ không đúng");
    }
  } catch (err) {
    next(err);
  }
};

export const createEmployee = async (req, res, next) => {
  const { name, identity_card, email, role } = req.body;

  try {
    const existedEmail = await User.find({ email });
    const existedIDC = await User.find({
      identity_card,
    });

    if (existedEmail.length > 0) {
      res.status(400);
      throw new Error("Địa chỉ email đã tồn tại");
    }
    if (existedIDC.length > 0) {
      res.status(400);
      throw new Error("CMND/CCCD đã tồn tại");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);
    const emp = await User.create({
      name,
      email,
      password: hashedPassword,
      identity_card,
      role,
    });

    if (emp) {
      res.status(201).json({
        _id: emp._id,
        name: emp.name,
        email: emp.email,
        role: emp.role,
        identity_card: emp.identity_card,
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.remove({ _id: userId });

    if (user.deletedCount > 0) {
      res.status(200).send("Xóa thành công");
    } else {
      res.status(400);
      res.send("Xóa thất bại");
    }
  } catch (err) {
    next(err);
  }
};
