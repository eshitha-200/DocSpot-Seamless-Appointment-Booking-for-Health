const Doctor = require("../schemas/doctorModel");
const User = require("../schemas/userModel");

const applyDoctorController = async (req, res) => {
  try {
    const existingDoctor = await Doctor.findOne({ userId: req.body.userId });
    if (existingDoctor) {
      return res.status(400).send({
        success: false,
        message: "You already applied as doctor",
      });
    }

    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const newDoctor = new Doctor({
      ...req.body,
      fullName: user.fullName, // ✅ get full name from user table
      status: "pending",
    });

    await newDoctor.save();

    user.isDoctor = true;
    await user.save();

    res.status(201).send({
      success: true,
      message: "Doctor application submitted successfully",
    });
  } catch (error) {
    console.error("Apply doctor error:", error);
    res.status(500).send({
      success: false,
      message: "Error in applying doctor",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).send({
      success: true,
      message: "All doctors fetched",
      data: doctors,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching doctors",
      error,
    });
  }
};

// ✅ Approve or Reject Doctor
const updateDoctorStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, { status }, { new: true });

    res.status(200).send({
      success: true,
      message: `Doctor ${status} successfully`,
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error updating doctor status",
      error,
    });
  }
};

module.exports = {
  applyDoctorController,
  getAllDoctorsController,
  updateDoctorStatusController,
};
