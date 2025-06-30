const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  type: { type: String, enum: ["user", "doctor", "admin"], default: "user" },
  isDoctor: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);