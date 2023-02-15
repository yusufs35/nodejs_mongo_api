const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


studentSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: '_student'
})

module.exports = mongoose.model("Student", studentSchema );
