

// import ErrorHandler from "../middlewares/error.js";
// import Reservation from "../models/reservation.js";
// import nodemailer from "nodemailer";


// // Helper function to validate email format
// const isValidEmail = (email) => {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//   return regex.test(email);
// };

// // Helper function to validate phone number (minimum 10 digits)
// const isValidPhone = (phone) => {
//   const regex = /^[0-9]{10,15}$/;
//   return regex.test(phone);
// };

// // Helper function to validate name (only letters and spaces)
// const isValidName = (name) => {
//   const regex = /^[a-zA-Z\s]+$/;
//   return regex.test(name);
// };

// export const send_reservation = async (req, res, next) => {
//   const { firstName, lastName, email, date, time, phone } = req.body;

//   if (!firstName || !lastName || !email || !date || !time || !phone) {
//     return next(new ErrorHandler("Please fill the entire reservation form!", 400));
//   }

//   if (!isValidEmail(email)) {
//     return next(new ErrorHandler("Please enter a valid email address.", 400));
//   }

//   if (!isValidPhone(phone)) {
//     return next(new ErrorHandler("Please enter a valid phone number (at least 10 digits).", 400));
//   }

//   if (!isValidName(firstName) || !isValidName(lastName)) {
//     return next(new ErrorHandler("Name should only contain letters and spaces.", 400));
//   }

//   try {
//     await Reservation.create({ firstName, lastName, email, date, time, phone });

//     res.status(201).json({
//       success: true,
//       message: "Reservation sent successfully!",
//     });
//   } catch (error) {
//     if (error.name === "ValidationError") {
//       const validationErrors = Object.values(error.errors).map((err) => err.message);
//       return next(new ErrorHandler(validationErrors.join(", "), 400));
//     }

//     return next(error);
//   }
// };


// export const getAllReservations = async (req, res, next) => {
//   try {
//     const reservations = await Reservation.find();
//     res.status(200).json({
//       success: true,
//       reservations,
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

// // --- Delete a Reservation (for admin) ---
// export const deleteReservation = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const reservation = await Reservation.findById(id);
//     if (!reservation) {
//       return next(new ErrorHandler("Reservation not found!", 404));
//     }
//     await reservation.deleteOne();
//     res.status(200).json({
//       success: true,
//       message: "Reservation Deleted!",
//     });
//   } catch (error) {
//     return next(error);
//   }
// };


import ErrorHandler from "../middlewares/error.js";
import Reservation from "../models/reservation.js";
import nodemailer from "nodemailer";

// Helper function to validate email format
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return regex.test(email);
};

// Helper function to validate phone number (minimum 10 digits)
const isValidPhone = (phone) => {
  const regex = /^[0-9]{10,15}$/;
  return regex.test(phone);
};

// Helper function to validate name (only letters and spaces)
const isValidName = (name) => {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(name);
};

export const send_reservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;

  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please fill the entire reservation form!", 400));
  }

  if (!isValidEmail(email)) {
    return next(new ErrorHandler("Please enter a valid email address.", 400));
  }

  if (!isValidPhone(phone)) {
    return next(new ErrorHandler("Please enter a valid phone number (at least 10 digits).", 400));
  }

  if (!isValidName(firstName) || !isValidName(lastName)) {
    return next(new ErrorHandler("Name should only contain letters and spaces.", 400));
  }

  try {
    const reservationData = { firstName, lastName, email, date, time, phone };
    await Reservation.create(reservationData);

    // --- START: Email Sending Logic ---
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address from .env
        pass: process.env.EMAIL_PASS, // Your Gmail App Password from .env
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Reservation Confirmation at DineEase",
      html: `
        <h1>Reservation Confirmed!</h1>
        <p>Dear ${firstName} ${lastName},</p>
        <p>Thank you for choosing DineEase. Your table reservation is confirmed for:</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Time:</b> ${time}</p>
        <p>We look forward to welcoming you!</p>
        <p>Best regards,</p>
        <p>The DineEase Team</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        // We don't stop the process, just log the error
      } else {
        console.log("Email sent:", info.response);
      }
    });
    // --- END: Email Sending Logic ---

    res.status(201).json({
      success: true,
      message: "Reservation sent successfully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    return next(error);
  }
};


export const getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteReservation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return next(new ErrorHandler("Reservation not found!", 404));
    }
    await reservation.deleteOne();
    res.status(200).json({
      success: true,
      message: "Reservation Deleted!",
    });
  } catch (error) {
    return next(error);
  }
};