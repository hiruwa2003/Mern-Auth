import User from "../../Api/Model/userModel.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../Utills/error.js";
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
     next(error);
     
  }
};
