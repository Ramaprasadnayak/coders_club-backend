const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
  status: { type: String, enum: ["Pending", "Solved"], default: "Pending" },
  lastSolvedAt: { type: Date },
  attempts: { type: Number, default: 0 }
});

userProgressSchema.index({ userId: 1, problemId: 1 }, { unique: true });

module.exports = mongoose.model("UserProgress", userProgressSchema);