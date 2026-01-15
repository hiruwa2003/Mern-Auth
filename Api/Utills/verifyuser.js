import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import User from "../Model/userModel.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(errorHandler(401, "You are not authenticated"));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional: fetch full user from DB
    const user = await User.findById(decoded.id);
    if (!user) return next(errorHandler(401, "User not found"));

    req.user = { id: user._id, name: user.name, email: user.email }; // attach user info
    next();
  } catch (err) {
    return next(errorHandler(403, "Token is not valid or expired"));
  }
};
