// import mongoose from "mongoose";
// import validator from "validator";

// const reservationSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//     minLength: [3, "First name must be of at least 3 Characters."],
//     maxLength: [30, "First name cannot exceed 30 Characters."],
//   },
//   lastName: {
//     type: String,
//     required: true,
//     minLength: [3, "Last name must be of at least 3 Characters."],
//     maxLength: [30, "Last name cannot exceed 30 Characters."],
//   },
//   date: {
//     type: String,
//     required: true,
//   },
//   time: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     validate: [validator.isEmail, "Provide a valid email"],
//   },
//   phone: {
//     type: String,
//     required: true,
//     minLength: [11, "Phone number must contain 11 Digits."],
//     maxLength: [11, "Phone number must contain 11 Digits."],
//   },
// });

// // export const Reservation = mongoose.model("Reservation", reservationSchema);

// const Reservation = mongoose.model("Reservation", reservationSchema);
// export default Reservation;



// import mongoose from "mongoose";
// import validator from "validator";

// const reservationSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//     minLength: [3, "First name must be of at least 3 Characters."],
//     maxLength: [30, "First name cannot exceed 30 Characters."],
//   },
//   lastName: {
//     type: String,
//     required: true,
//     minLength: [3, "Last name must be of at least 3 Characters."],
//     maxLength: [30, "Last name cannot exceed 30 Characters."],
//   },
//   date: {
//     type: String, // Storing as String for simplicity with HTML date input
//     required: true,
//   },
//   time: {
//     type: String, // Storing as String for simplicity with HTML time input
//     required: true,
//   },
//   // --- START: NEW DURATION FIELD ---
//   duration: {
//     type: Number, // Duration in hours
//     required: true,
//     min: 1,
//     max: 3,
//   },
//   // --- END: NEW DURATION FIELD ---
//   email: {
//     type: String,
//     required: true,
//     validate: [validator.isEmail, "Provide a valid email"],
//   },
//   phone: {
//     type: String,
//     required: true,
//     minLength: [11, "Phone number must contain 11 Digits."],
//     maxLength: [11, "Phone number must contain 11 Digits."],
//   },
// });

// const Reservation = mongoose.model("Reservation", reservationSchema);
// export default Reservation;


import mongoose from "mongoose";
import validator from "validator";
import crypto from "crypto"; // 1. IMPORT CRYPTO

const reservationSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minLength: 3, maxLength: 30 },
  lastName: { type: String, required: true, minLength: 3, maxLength: 30 },
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: Number, required: true, min: 1, max: 3 },
  email: { type: String, required: true, validate: [validator.isEmail, "Provide a valid email"] },
  phone: { type: String, required: true, minLength: 11, maxLength: 11 },
  // --- START: NEW BOOKING ID FIELD ---
  bookingId: {
    type: String,
    unique: true,
  },
  // --- END: NEW BOOKING ID FIELD ---
});

// 2. Automatically generate a unique bookingId before saving
reservationSchema.pre("save", function (next) {
  if (!this.bookingId) {
    this.bookingId = crypto.randomBytes(8).toString("hex");
  }
  next();
});

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;



