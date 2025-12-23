import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema({
  title: String,
  duration: Number,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  active: Boolean
});

export default mongoose.model("Exam", ExamSchema);
