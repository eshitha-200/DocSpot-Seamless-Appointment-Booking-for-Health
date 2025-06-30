const express = require("express");
const router = express.Router();
const Appointment = require("../schemas/appointmentModel");
const { requireSignIn } = require("../middlewares/authMiddleware");

// ✅ Book appointment
router.post("/book", requireSignIn, async (req, res) => {
  try {
    const { userId, doctorId, date, time } = req.body;

    const newAppointment = new Appointment({
      userId,
      doctorId,
      date,
      time,
      status: "pending",
    });

    await newAppointment.save();

    res.status(201).send({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Booking failed", error });
  }
});

// ✅ Get appointments for doctor
router.get("/doctor-appointments", requireSignIn, async (req, res) => {
  try {
    const doctorId = req.body.userId; // set by authMiddleware
    const appointments = await Appointment.find({ doctorId });
    res.status(200).send({
      success: true,
      message: "Appointments fetched",
      data: appointments,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to get appointments", error });
  }
});


module.exports = router;