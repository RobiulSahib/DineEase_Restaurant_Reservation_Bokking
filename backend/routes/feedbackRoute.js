// import express from "express";
// import { submitFeedback, getAllFeedback } from "../controller/feedbackController.js";
// import { isAdminAuthenticated } from "../middlewares/auth.js";

// const router = express.Router();

// // Public route for submitting feedback
// router.post("/submit", submitFeedback);

// // Admin route to get all feedback
// router.get("/getall", isAdminAuthenticated, getAllFeedback);

// export default router;
import express from "express";
import { submitFeedback, getAllFeedback } from "../controller/feedbackController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/submit", submitFeedback);
router.get("/getall", isAdminAuthenticated, getAllFeedback);

export default router;