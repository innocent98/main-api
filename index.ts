import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
const router = require("./routes/index");

dotenv.config();

// connect to database
const mongoUrl = process.env.MONGO_URL;

mongoose.set("strictQuery", true);
mongoose
  .connect(mongoUrl || "")
  .then(() => console.log("Database connected!"))
  .catch((err: any) => console.log(err));

//   middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.use(router);

// listen to the server
app.listen(process.env.PORT || 8070, () => {
  console.log("Server is running on port 8070.");
});
