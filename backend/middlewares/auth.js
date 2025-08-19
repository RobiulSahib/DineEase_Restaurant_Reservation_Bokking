// backend/middlewares/auth.js

import User from "../models/user.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = async (req, res, next) => {
  const token = req.cookies.token; // Get token from the cookie

  if (!token) {
    return next(new ErrorHandler("Admin not authenticated!", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  if (req.user.role !== "admin") {
    return next(
      new ErrorHandler(
        `${req.user.role} not authorized for this resource!`,
        403
      )
    );
  }

  next(); // If everything is okay, proceed to the next function
};