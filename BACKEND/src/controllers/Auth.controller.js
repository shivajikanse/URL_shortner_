import catchAsync from "../utils/catchAsync.js";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { sendToken } from "../utils/sendToken.js";

// REGISTER USER
export const register_user = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const userExist = await User.findOne({ email });
  if (userExist)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });

  sendToken(user, 201, res);
});

//  LOGIN USER
export const Login_user = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  
  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  const isMatch = await user.comparePassword(password);

  if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

  sendToken(user, 200, res);
});
