import "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  // if readystate is 0 (falsy) it means the connection is disconnected
  // so we continue.
  if (mongoose.connections[0].readyState) return;
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Succefully connected to db.");
  } catch (e) {
    console.error(e);
  }
};

// If the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("db connection disconnected.");
  console.log("Trying to reconnect...");
  connectDB();
});
// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("db connection disconnected through app termination.");
    process.exit(0);
  });
});

export default {
  connectDB,
};
