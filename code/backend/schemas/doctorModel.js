const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  fullName: {
    type: String,
    required: true, // ✅ Make sure it's required
  },
  specialization: String,
  experience: String,
  feesPerConsultation: Number,
  status: {
    type: String,
    default: "pending",
  },
  timings: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);