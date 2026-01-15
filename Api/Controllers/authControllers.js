import User from "../../Api/Model/userModel.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../Utills/error.js";
import jwt from 'jsonwebtoken';
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  try {
    const savedUser = await newUser.save();
    const { password: _pw, ...userData } = savedUser._doc;
    res.status(201).json({ message: "User signed up successfully", user: userData });
    
  } catch (error) {
     next(error);
     
  }
};


export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {

      return res.status(401).json({ message: "Invalid credentials" });
    }
    const { password: _pw, ...userData } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    res.cookie("token", token, { httpOnly: true , expires: expiryDate});
    res.status(200).json({ message: "Signin successful", token, user: userData });
  } catch (error) {
    next(error);
  }
};


export const google = async (req, res, next) => {
  try {
     const user = await User.findOne({ email: req.body.email });
     if (user) {
       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
     const { password: _pw, ...rest } = user._doc;
     const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
     res.cookie("token", token, { httpOnly: true , expires: expiryDate});
     return res.status(200).json({ message: "Signin successful", token, user: rest });
      } else {
         const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
         const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
         const newUser = new User({ name: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(), 
          email: req.body.email, password: hashedPassword, 
          photo: req.body.photo });   
         
          await newUser.save();
          const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
       const { password: _pw2, ...rest } = newUser._doc;
       const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
       res.cookie("token", token, { httpOnly: true , expires: expiryDate});
          return res.status(201).json({ token, user: rest });
      } 
  } catch (error) {
       next(error);
  }}