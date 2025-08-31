

// import app from "./app.js";

// app.listen(process.env.PORT ||4000, ()=>{
//     console.log(`SERVER HAS STARTED AT PORT ${process.env.PORT}`);
// })

import app from "./app.js";
import { dbConnection } from "./database/dbConnection.js";

const startServer = async () => {
  try {
    await dbConnection();
    app.listen(process.env.PORT || 4000, () => {
      console.log(`SERVER HAS STARTED AT PORT ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database, server did not start.", error);
    process.exit(1);
  }
};

startServer();