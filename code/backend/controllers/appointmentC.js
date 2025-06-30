const Appointment = require("../schemas/appointmentModel");

const bookAppointmentController = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).send({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to book appointment",
      error,
    });
  }
};

module.exports = { bookAppointmentController };