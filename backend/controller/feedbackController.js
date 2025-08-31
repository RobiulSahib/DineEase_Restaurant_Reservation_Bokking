// import ErrorHandler from "../middlewares/error.js";
// import Feedback from "../models/feedback.js";

// // PUBLIC: Submit new feedback
// export const submitFeedback = async (req, res, next) => {
//   const { customerName, rating, comment } = req.body;

//   if (!customerName || !rating || !comment) {
//     return next(new ErrorHandler("Please provide your name, a rating, and a comment.", 400));
//   }

//   try {
//     await Feedback.create({ customerName, rating, comment });
//     res.status(201).json({
//       success: true,
//       message: "Thank you for your valuable feedback!",
//     });
//   } catch (error) {
//     if (error.name === "ValidationError") {
//       const validationErrors = Object.values(error.errors).map((err) => err.message);
//       return next(new ErrorHandler(validationErrors.join(", "), 400));
//     }
//     return next(error);
//   }
// };

// // ADMIN: Get all feedback
// export const getAllFeedback = async (req, res, next) => {
//   try {
//     const feedbackList = await Feedback.find().sort({ createdAt: -1 }); // Show newest first
//     res.status(200).json({
//       success: true,
//       feedback: feedbackList,
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

import ErrorHandler from "../middlewares/error.js";
import Feedback from "../models/feedback.js";

export const submitFeedback = async (req, res, next) => {
  const { customerName, rating, comment } = req.body;
  if (!customerName || !rating || !comment) {
    return next(new ErrorHandler("Please provide your name, a rating, and a comment.", 400));
  }
  try {
    await Feedback.create({ customerName, rating, comment });
    res.status(201).json({
      success: true,
      message: "Thank you for your valuable feedback!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    return next(error);
  }
};

export const getAllFeedback = async (req, res, next) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      feedback: feedbackList,
    });
  } catch (error) {
    return next(error);
  }
};