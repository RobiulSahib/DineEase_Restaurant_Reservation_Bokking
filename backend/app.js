


// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import { errorMiddleware } from "./middlewares/error.js";
// import reservationRouter from "./routes/reservationRoute.js";
// import { dbConnection } from "./database/dbConnection.js";

// const app = express();

// // Load environment variables
// dotenv.config({ path: "./config/config.env" });

// console.log("MONGO_URI:", process.env.MONGO_URI);
// console.log("PORT:", process.env.PORT);

// // CORS setup
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["POST"],
//     credentials: true,
//   })
// );

// // Middleware to parse incoming requests
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // API routes
// app.use("/api/v1/reservation", reservationRouter);

// // Test route to verify server is running
// app.get("/api/v1/test", (req, res) => {
//   return res.status(200).json({
//     success: true,
//     message: "Test route is working!",
//   });
// });

// // Optional: a basic root route
// app.get("/", (req, res) => {
//   return res.status(200).json({
//     success: true,
//     message: "HELLO WORLD AGAIN",
//   });
// });

// // Connect to MongoDB
// dbConnection();

// // Error handling middleware
// app.use(errorMiddleware);

// export default app;



// backend/app.js

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser"; // 1. Import cookie-parser
// import { errorMiddleware } from "./middlewares/error.js";
// import reservationRouter from "./routes/reservationRoute.js";
// import userRouter from "./routes/userRoute.js"; // 2. Import user router
// import { dbConnection } from "./database/dbConnection.js";

// const app = express();

// dotenv.config({ path: "./config/config.env" });

// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["POST", "GET", "DELETE"], // Add GET and DELETE
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser()); // 3. Use cookie-parser

// // API routes
// app.use("/api/v1/reservation", reservationRouter);
// app.use("/api/v1/user", userRouter); // 4. Use the user router

// dbConnection();
// app.use(errorMiddleware);
// export default app;


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import userRouter from "./routes/userRoute.js"; 
import { dbConnection } from "./database/dbConnection.js";

const app = express();

dotenv.config({ path: "./config/config.env" });

// --- START: THIS IS THE CORRECTED SECTION ---
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Pass the URL string directly
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);
// --- END: CORRECTED SECTION ---

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use("/api/v1/reservation", reservationRouter);
app.use("/api/v1/user", userRouter); 

dbConnection();
app.use(errorMiddleware);
export default app;