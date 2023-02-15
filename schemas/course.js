const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    _student: { type: Schema.Types.ObjectId, ref: "Student" },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

courseSchema.virtual("scores", {
  ref: "Score",
  localField: "_id",
  foreignField: "_course",
});

module.exports = mongoose.model("Course", courseSchema);
