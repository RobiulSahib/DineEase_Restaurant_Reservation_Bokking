import User from "../models/user.js";
import ErrorHandler from "../middlewares/error.js";

// A simple function to send the token in a cookie
const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    ),
    httpOnly: true, // Prevents client-side JS from accessing the cookie
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};

// --- Admin Registration (run this once to create your admin) ---
export const register = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return next(new ErrorHandler("Please fill all fields!", 400));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("User already exists!", 400));
  }
  const user = await User.create({ name, email, password, role });
  sendToken(user, 201, res, "User Registered!");
};

// --- Admin Login ---
export const login = async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide all details!", 400));
  }
  const user = await User.findOne({ email }).select("+password"); // We need the password to compare
  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }
  if (user.role !== role) {
    return next(new ErrorHandler("User with this role not found!", 404));
  }
  sendToken(user, 200, res, "Login Successful!");
};

// --- Admin Logout ---
export const logout = (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
};