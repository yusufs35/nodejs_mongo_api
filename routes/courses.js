const express = require("express");
const Course = require("../schemas/course");

const router = express.Router();

router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.send(course);
});

router.post("/", async (req, res) => {
  const { code, name } = req.body;

  const course = new Course({
    code,
    name,
  });
  const inserted = await course.save();
  res.send(inserted);
});

router.put("/:id", async (req, res) => {
  const { code, name } = req.body;

  const course = {
    code,
    name,
  };

  const updated = await Course.findByIdAndUpdate(
    req.params.id,
    course,
    {new: true}
  );
  res.send(updated);
});

router.delete("/:id", async (req, res) => {
  const deleted = await Course.findByIdAndDelete(req.params.id);
  res.send(deleted);
});

module.exports = router;
