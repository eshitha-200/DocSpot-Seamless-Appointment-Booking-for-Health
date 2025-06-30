const express = require("express");
const router = express.Router();
const Doctor = require("../schemas/doctorModel");
const { requireSignIn } = require("../middlewares/authMiddleware");

// ✅ Get all doctors (pending + approved + rejected)
router.get("/all-doctors", requireSignIn, async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).send({
      success: true,
      message: "All doctor applications",
      data: doctors,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching doctors",
      error,
    });
  }
});

// ✅ Update doctor application status (approve/reject)
router.put("/update-doctor-status", requireSignIn, async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, { status }, { new: true });

    res.status(200).send({
      success: true,
      message: `Doctor status updated to ${status}`,
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to update doctor status",
      error,
    });
  }
});

module.exports = router;