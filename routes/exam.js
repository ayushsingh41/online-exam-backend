import express from "express";
import Exam from "../models/Exam.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const exam = new Exam(req.body);
  await exam.save();
  res.json(exam);
});

router.get("/", auth, async (req, res) => {
  const exams = await Exam.find({ active: true }).populate("questions");
  res.json(exams);
});

export default router;
