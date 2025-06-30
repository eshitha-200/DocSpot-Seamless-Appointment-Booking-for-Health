const express = require("express");
const router = express.Router();
const { requireSignIn } = require("../middlewares/authMiddleware");
const {
  applyDoctorController,
  getAllDoctorsController,
} = require("../controllers/doctorC");

// ✅ Apply as a doctor
router.post("/apply-doctor", requireSignIn, applyDoctorController);

// ✅ Get all approved doctors (for users)
router.get("/get-approved", requireSignIn, async (req, res) => {
  try {
    const Doctor = require("../schemas/doctorModel");
    const doctors = await Doctor.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Approved doctors fetched",
      data: doctors,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to get doctors" });
  }
});

// ✅ (Optional) Get all (pending/approved) - used by admin
router.get("/all-doctors", requireSignIn, getAllDoctorsController);

// ✅ Get doctor by ID
router.get("/:doctorId", requireSignIn, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    res.status(200).send({
      success: true,
      message: "Doctor fetched successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Doctor not found", error });
  }
});

module.exports = router;