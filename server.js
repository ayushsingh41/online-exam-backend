import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.js";
import examRoutes from "./routes/exam.js";
import resultRoutes from "./routes/result.js";
import questionRoutes from "./routes/question.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// 🌐 Socket logic
io.on("connection", socket => {
  console.log("🟢 Admin/Student connected");

  socket.on("join-exam", ({ examId, user }) => {
    socket.join(examId);
    io.to(examId).emit("student-joined", user);
  });

  socket.on("violation", data => {
    io.to(data.examId).emit("violation-reported", data);
  });

  socket.on("exam-submitted", data => {
    io.to(data.examId).emit("exam-ended", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected");
  });
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/questions", questionRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Mongo error:", err.message));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server + Socket running on port ${PORT}`);
});