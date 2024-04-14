var express = require("express");
var app = express();
var mongoose = require("mongoose");
var cors = require("cors");
var helmet = require("helmet");
var morgan = require("morgan");
var dotenv = require("dotenv");
var router = require("./routes/index");
dotenv.config();
// connect to database
var mongoUrl = process.env.MONGO_URL;
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
