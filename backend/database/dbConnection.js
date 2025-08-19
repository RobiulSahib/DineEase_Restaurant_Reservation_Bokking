// import mongoose from "mongoose";

// export const dbConnection = () => {
//   mongoose
//     .connect(process.env.MONGO_URI, {
//       dbName: "restaurantDB",
//     })
//     .then(() => {
//       console.log("Connected to database!");
//     })
//     .catch((err) => {
//       console.log(`Some error occured while connecing to database: ${err}`);
//     });
// };
import mongoose from "mongoose";
export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "restaurantDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to database!");
  } catch (err) {
    console.error(`❌ Error connecting to database: ${err}`);
    process.exit(1); // Exit app if DB connection fails
  }
};


// import mongoose from "mongoose";
// import User from "../models/user.js"; // 1. IMPORT THE USER MODEL

// export const dbConnection = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       dbName: "restaurantDB",
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ Connected to database!");

//     // --- START: TEMPORARY ADMIN CREATION LOGIC ---
//     const adminEmail = "admin@example.com";
//     const adminPassword = "adminpassword"; // Use a more secure password in a real project!

//     const adminExists = await User.findOne({ email: adminEmail });
//     if (!adminExists) {
//       await User.create({
//         name: "Admin",
//         email: adminEmail,
//         password: adminPassword,
//         role: "admin",
//       });
//       console.log("✅ Admin user created successfully!");
//     } else {
//       console.log("ℹ️ Admin user already exists.");
//     }
//     // --- END: TEMPORARY ADMIN CREATION LOGIC ---

//   } catch (err) {
//     console.error(`❌ Error connecting to database or creating admin: ${err}`);
//     process.exit(1);
//   }
// };