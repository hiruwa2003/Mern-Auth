import { errorHandler } from "../Utills/error.js";
import bcrypt from "bcryptjs";
import User from "../Model/userModel.js";
import mongoose from "mongoose";

// Test route
export const test = (req, res) => {
  res.json({ message: "User route is working" });
};

// Update user
export const updateUser = async (req, res, next) => {
  try {
    // Ensure user can only update their own profile
    if (!mongoose.Types.ObjectId.isValid(req.params.id) || !req.user.id.equals(new mongoose.Types.ObjectId(req.params.id))) {
      return next(errorHandler(403, "You can update only your own profile"));
    }

    const updatedFields = {};

    if (req.body.name) updatedFields.name = req.body.name;
    if (req.body.email) updatedFields.email = req.body.email;
    if (req.body.photo) updatedFields.photo = req.body.photo;
    if (req.body.password) {
      updatedFields.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    res.status(200).json({
      message: "User updated successfully",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        photo: updatedUser.photo,
      },
    });
  } catch (error) {
    next(error);
  }
};
