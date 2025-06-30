// src/pages/ApplyDoctorPage.js
import React, { useState } from "react";
import axios from "axios";
import "./ApplyDoctorPage.css";

const ApplyDoctorPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    specialization: "",
    experience: "",
    feesPerConsultation: "",
    timings: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/doctor/apply-doctor",
        {
          ...formData,
          userId: localStorage.getItem("userId"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply as doctor");
    }
  };

  return (
    <div className="apply-doctor-container">
      <h2>Apply As Doctor</h2>
      <form className="apply-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="experience"
          placeholder="Experience (in years)"
          value={formData.experience}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="feesPerConsultation"
          placeholder="Fees Per Consultation"
          value={formData.feesPerConsultation}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="timings"
          placeholder="Timings (e.g. 10am-5pm)"
          value={formData.timings}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyDoctorPage;