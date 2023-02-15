const express = require("express");
const Student = require("../schemas/student");

const router = express.Router();

//listeleme
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

//id ile sorgulma veya çağırma
router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id).
  populate({path: "courses", populate: {path: "scores"}}).
  exec();
  res.send(student);
});

//create student ekleme
router.post("/", async (req, res) => {
  const { firstName, lastName } = req.body;

  const student = new Student({
    firstName,
    lastName,
  });
  const inserted = await student.save();
  res.send(inserted);
});

//update student bilgi güncelleme
router.put("/:id", async (req, res) => {
  const { firstName, lastName } = req.body;

  const student = {
    firstName,
    lastName,
  };

  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    student,
    {new: true}
  );
  res.send(updated);
});

//delete student bilgi silme
router.delete("/:id", async (req, res) => {
  const deleted = await Student.findByIdAndDelete(req.params.id);
  res.send(deleted);
});
module.exports = router;
