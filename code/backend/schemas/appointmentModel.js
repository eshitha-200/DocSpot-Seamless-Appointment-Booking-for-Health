const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending", // optional: can be "confirmed", "rejected"
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;