import mongoose from "mongoose";
import DB_NAME from "../constants.js";

const connectDB = async () => {
  try {
    const conncetionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    // console.log(conncetionInstance)
    console.log(`mongoodb connected!! dbHost: ${conncetionInstance.connection.host}`);
  } catch (error) {
    console.log("Mongoodb connection failed:", error);
  }
};

export default connectDB;
