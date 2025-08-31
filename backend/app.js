// // backend/app.js
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { errorMiddleware } from "./middlewares/error.js";
// import reservationRouter from "./routes/reservationRoute.js";
// import userRouter from "./routes/userRoute.js";
// import { dbConnection } from "./database/dbConnection.js";

// const app = express();

// dotenv.config({ path: "./config/config.env" });

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     methods: ["POST", "GET", "DELETE", "PUT"], // Ensure PUT is here
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use("/api/v1/reservation", reservationRouter);
// app.use("/api/v1/user", userRouter);

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
import feedbackRouter from "./routes/feedbackRoute.js";

const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routers
app.use("/api/v1/reservation", reservationRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/feedback", feedbackRouter);

app.use(errorMiddleware);

export default app;