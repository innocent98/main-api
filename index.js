const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const router = require("./routes/index");
dotenv.config();

// connect to database
const mongoUrl = process.env.MONGO_URL;
mongoose.set("strictQuery", true);
mongoose
  .connect(mongoUrl || "")
  .then(function () {
    return console.log("Database connected!");
  })
  .catch(function (err) {
    return console.log(err);
  });

//   middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(router);

// listen to the server
app.listen(process.env.PORT || 8070, function () {
  console.log("Server is running on port 8070.");
});
