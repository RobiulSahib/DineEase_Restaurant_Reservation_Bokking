// import mongoose from "mongoose";

// const feedbackSchema = new mongoose.Schema({
//   customerName: {
//     type: String,
//     required: [true, "Name is required."],
//     minLength: [3, "Name must be at least 3 characters long."],
//   },
//   rating: {
//     type: Number,
//     required: [true, "A rating is required."],
//     min: 1,
//     max: 5,
//   },
//   comment: {
//     type: String,
//     required: [true, "A comment is required."],
//     minLength: [5, "Comment must be at least 5 characters long."],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Feedback = mongoose.model("Feedback", feedbackSchema);
// export default Feedback;


import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, "Name is required."],
    minLength: [3, "Name must be at least 3 characters long."],
  },
  rating: {
    type: Number,
    required: [true, "A rating is required."],
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: [true, "A comment is required."],
    minLength: [5, "Comment must be at least 5 characters long."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;