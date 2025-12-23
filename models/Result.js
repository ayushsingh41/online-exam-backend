import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam"
  },
  score: Number,
  submittedAt: Date
});

export default mongoose.model("Result", ResultSchema);
