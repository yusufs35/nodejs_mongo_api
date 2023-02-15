const mongoose = require("mongoose");
const { Schema } = mongoose;

const scoreSchema = new Schema({
  score: { type: Number, required: true },
  _student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  _course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
});

module.exports = mongoose.model("Score", scoreSchema);
