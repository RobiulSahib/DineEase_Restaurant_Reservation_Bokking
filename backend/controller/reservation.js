
// import ErrorHandler from "../middlewares/error.js";
// import Reservation from "../models/reservation.js";
// import nodemailer from "nodemailer";

// const timeToMinutes = (time) => {
//   const [hours, minutes] = time.split(':').map(Number);
//   return hours * 60 + minutes;
// };

// export const send_reservation = async (req, res, next) => {
//   const { firstName, lastName, email, date, time, phone, duration = 1 } = req.body;

//   if (!firstName || !lastName || !email || !date || !time || !phone) {
//     return next(new ErrorHandler("Please fill the entire reservation form!", 400));
//   }

//   try {
//     const openingTime = timeToMinutes('12:00');
//     const closingTime = timeToMinutes('23:00');
//     const requestedStartTime = timeToMinutes(time);
//     const requestedEndTime = requestedStartTime + (duration * 60);

//     if (requestedStartTime < openingTime) {
//       return next(new ErrorHandler("Restaurant opens at 12:00 PM. Please choose a later time.", 400));
//     }
//     if (requestedEndTime > closingTime) {
//       return next(new ErrorHandler(`Your booking duration of ${duration} hour(s) extends past our 11:00 PM closing time.`, 400));
//     }
//     const existingReservationsOnDate = await Reservation.find({ date });
//     for (const existing of existingReservationsOnDate) {
//       const existingStartTime = timeToMinutes(existing.time);
//       const existingEndTime = existingStartTime + (existing.duration * 60);
//       if (requestedStartTime < existingEndTime && requestedEndTime > existingStartTime) {
//         return next(new ErrorHandler("This time slot is unavailable due to an overlapping booking.", 400));
//       }
//     }
    
//     await Reservation.create({ firstName, lastName, email, date, time, phone, duration });

//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
//     });
//     const mailOptions = {
//       from: `"DineEase Reservations" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your Table Reservation is Confirmed!",
//       html: `<h1>Reservation Confirmed!</h1><p>Dear ${firstName} ${lastName},</p><p>Your table reservation for ${duration} hour(s) is confirmed for:</p><p><b>Date:</b> ${date}</p><p><b>Time:</b> ${time}</p><p>We look forward to welcoming you!</p><p>Best regards,</p><p>The DineEase Team</p>`,
//     };
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) console.error("Error sending email:", error);
//       else console.log("Email sent:", info.response);
//     });

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
//     res.status(200).json({ success: true, reservations });
//   } catch (error) {
//     return next(error);
//   }
// };

// export const deleteReservation = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const reservation = await Reservation.findById(id);
//     if (!reservation) {
//       return next(new ErrorHandler("Reservation not found!", 404));
//     }
//     await reservation.deleteOne();
//     res.status(200).json({ success: true, message: "Reservation Deleted!" });
//   } catch (error) {
//     return next(error);
//   }
// };

// export const getSingleReservation = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const reservation = await Reservation.findById(id);
//     if (!reservation) {
//       return next(new ErrorHandler("Reservation not found!", 404));
//     }
//     res.status(200).json({ success: true, reservation });
//   } catch (error) {
//     return next(error);
//   }
// };

// export const updateReservation = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     let reservation = await Reservation.findById(id);
//     if (!reservation) {
//       return next(new ErrorHandler("Reservation not found!", 404));
//     }
//     reservation = await Reservation.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
//     res.status(200).json({
//       success: true,
//       message: "Reservation Updated!",
//       reservation,
//     });
//   } catch (error) {
//     if (error.name === "ValidationError") {
//       const validationErrors = Object.values(error.errors).map((err) => err.message);
//       return next(new ErrorHandler(validationErrors.join(", "), 400));
//     }
//     return next(error);
//   }
// };


import ErrorHandler from "../middlewares/error.js";
import Reservation from "../models/reservation.js";
import nodemailer from "nodemailer";

// --- HELPER FUNCTIONS ---
const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const sendUpdateEmail = (reservation) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const mailOptions = {
    from: `"DineEase Reservations" <${process.env.EMAIL_USER}>`,
    to: reservation.email,
    subject: "Your Reservation Details Have Been Updated",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #1a1a1a;">Your Booking Has Been Updated</h1>
        <p>Dear ${reservation.firstName} ${reservation.lastName},</p>
        <p>Please note that an administrator has updated the details for your upcoming reservation. Here is the new information:</p>
        
        <h2 style="color: #1a1a1a;">Updated Booking Details:</h2>
        <p><strong>Date:</strong> ${reservation.date}</p>
        <p><strong>Time:</strong> ${reservation.time}</p>
        <p><strong>Duration:</strong> ${reservation.duration} hour(s)</p>
        <p><strong>Phone:</strong> ${reservation.phone}</p>
        
        <p>If these changes are incorrect or you have any questions, please contact us immediately.</p>
        <p>We look forward to seeing you!</p>
        <p>Warm regards,</p>
        <p><strong>The DineEase Team</strong></p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error("Error sending update email:", error);
    else console.log("Update email sent:", info.response);
  });
};

// --- CONTROLLER EXPORTS ---
export const send_reservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone, duration = 1 } = req.body;
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please fill the entire reservation form!", 400));
  }
  try {
    const openingTime = timeToMinutes('12:00');
    const closingTime = timeToMinutes('23:00');
    const requestedStartTime = timeToMinutes(time);
    const requestedEndTime = requestedStartTime + (duration * 60);
    if (requestedStartTime < openingTime) {
      return next(new ErrorHandler("Restaurant opens at 12:00 PM. Please choose a later time.", 400));
    }
    if (requestedEndTime > closingTime) {
      return next(new ErrorHandler(`Your booking duration of ${duration} hour(s) extends past our 11:00 PM closing time.`, 400));
    }
    const existingReservationsOnDate = await Reservation.find({ date });
    for (const existing of existingReservationsOnDate) {
      const existingStartTime = timeToMinutes(existing.time);
      const existingEndTime = existingStartTime + (existing.duration * 60);
      if (requestedStartTime < existingEndTime && requestedEndTime > existingStartTime) {
        return next(new ErrorHandler("This time slot is unavailable due to an overlapping booking.", 400));
      }
    }
    
    await Reservation.create({ firstName, lastName, email, date, time, phone, duration });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    const mailOptions = {
      from: `"DineEase Reservations" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Table Reservation is Confirmed!",
      html: `<h1>Reservation Confirmed!</h1><p>Dear ${firstName} ${lastName},</p><p>Your table reservation for ${duration} hour(s) is confirmed for:</p><p><b>Date:</b> ${date}</p><p><b>Time:</b> ${time}</p><p>We look forward to welcoming you!</p><p>Best regards,</p><p>The DineEase Team</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error("Error sending email:", error);
      else console.log("Email sent:", info.response);
    });

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
    res.status(200).json({ success: true, reservations });
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
    res.status(200).json({ success: true, message: "Reservation Deleted!" });
  } catch (error) {
    return next(error);
  }
};

export const getSingleReservation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return next(new ErrorHandler("Reservation not found!", 404));
    }
    res.status(200).json({ success: true, reservation });
  } catch (error) {
    return next(error);
  }
};

export const updateReservation = async (req, res, next) => {
  const { id } = req.params;
  try {
    let reservation = await Reservation.findById(id);
    if (!reservation) {
      return next(new ErrorHandler("Reservation not found!", 404));
    }
    
    const updatedReservation = await Reservation.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    sendUpdateEmail(updatedReservation);

    res.status(200).json({
      success: true,
      message: "Reservation Updated! The customer has been notified.",
      reservation: updatedReservation,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    return next(error);
  }
};