import express from "express";
import Question from "../models/Question.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Add question
router.post("/", auth, async (req, res) => {
  const q = new Question(req.body);
  await q.save();
  res.json(q);
});

// Get questions by exam
router.get("/:examId", auth, async (req, res) => {
  const questions = await Question.find({ examId: req.params.examId });
  res.json(questions);
});

// Delete question
router.delete("/:id", auth, async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ msg: "Question deleted" });
});

export default router;
