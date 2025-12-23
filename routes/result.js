import express from "express";
import Result from "../models/Result.js";
import Exam from "../models/Exam.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

/* ---------------- STUDENT ---------------- */

// Submit result
router.post("/", auth, async (req, res) => {
  const result = new Result({
    studentId: req.user.id,
    examId: req.body.examId,
    score: req.body.score,
    submittedAt: new Date()
  });

  await result.save();
  res.json(result);
});

// Student score history
router.get("/student", auth, async (req, res) => {
  const results = await Result.find({ studentId: req.user.id })
    .populate("examId", "title");

  res.json(results);
});

/* ---------------- ADMIN ---------------- */

// Admin analytics
router.get("/admin/analytics", auth, async (req, res) => {
  const exams = await Exam.find();

  const analytics = [];

  for (const exam of exams) {
    const results = await Result.find({ examId: exam._id });
    const total = results.reduce((sum, r) => sum + r.score, 0);

    analytics.push({
      examTitle: exam.title,
      studentsAppeared: results.length,
      averageScore: results.length ? (total / results.length).toFixed(2) : 0
    });
  }

  res.json(analytics);
});

export default router;
