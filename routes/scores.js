const express = require("express");
const mongoose = require("mongoose");
const Score = require("../schemas/score");

const router = express.Router();

router.get("/", async (req, res) => {
  const scores = await Score.find().populate("_student").exec();
  res.send(scores);
});

router.get("/:id", async (req, res) => {
  const score = await Score.findById(req.params.id).populate("_student").exec();
  res.send(score);
});

router.post("/", async (req, res) => {
  const { score, student_id, course_id } = req.body;

  const newScore = new Score({
    score,
    _student: mongoose.Types.ObjectId(student_id),
    _course: mongoose.Types.ObjectId(course_id)
  });
  const inserted = await newScore.save();
  res.send(inserted);
});

router.put("/:id", async (req, res) => {
  const { score, student_id, course_id } = req.body;

  const newScore = {
    score,
    student_id,
    course_id
  };

  const updated = await Score.findByIdAndUpdate(
    req.params.id,
    newScore,
    {new: true}
  );
  res.send(updated);
});

router.delete("/:id", async (req, res) => {
  const deleted = await Score.findByIdAndDelete(req.params.id);
  res.send(deleted);
});

module.exports = router;
