const express = require("express");
const studentRouter = require("./routes/students");
const courseRouter = require("./routes/courses");
const scoreRouter = require("./routes/scores");
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");

const app = express();

const connectionString = "mongodb://localhost:27017/school";

app.use(bodyParser.json());
mongoose.set("strictQuery", false);
mongoose.connect(connectionString, (e) => {
  if (e) {
    console.log(e);
  } else {
    console.log("Connected to database");
  }
});

app.use("/students", studentRouter);
app.use("/courses", courseRouter);
app.use("/scores", scoreRouter);

app.listen(5000, () => {
  console.log(`Server started on port 5000`);
});
