import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam"
  },
  questionText: String,
  options: [String],
  correctOption: Number
});

export default mongoose.model("Question", QuestionSchema);
