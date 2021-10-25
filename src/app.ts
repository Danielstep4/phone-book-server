import express from "express";
import dotenv from "dotenv";
import db from "./models/db";
import helmet from "helmet";
import cors from "cors";
import router from "./routes";

dotenv.config();

const app = express();

// Global middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await db.connectDB();
  } catch (e) {
    console.error(e);
  }
  console.log(`Server started on port: ${PORT}`);
});
