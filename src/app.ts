import express from "express";
import dotenv from "dotenv";
import db from "./models/db";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await db.connectDB();
  } catch (e) {
    console.error(e);
  }
  console.log(`Server started on port: ${PORT}`);
});
