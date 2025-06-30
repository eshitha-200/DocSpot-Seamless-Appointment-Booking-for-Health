import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DoctorDashboard.css"; // We'll create this

const DoctorDashboard = () => {
  const [approvedDoctors, setApprovedDoctors] = useState([]);

  const fetchApprovedDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctor/get-approved", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setApprovedDoctors(res.data.data);
    } catch (error) {
      console.log("Error fetching approved doctors", error);
    }
  };

  useEffect(() => {
    fetchApprovedDoctors();
  }, []);

  return (
    <div className="doctor-dashboard-container">
      <h2 className="dashboard-title">👨‍⚕ Welcome Doctor</h2>
      <h4 className="dashboard-subtitle">Approved Doctors List</h4>

      {approvedDoctors.length === 0 ? (
        <p className="no-doctors-text">No approved doctors available.</p>
      ) : (
        <div className="doctor-cards-container">
          {approvedDoctors.map((doctor) => (
            <div key={doctor._id} className="doctor-card">
              <p><strong>Name:</strong> {doctor.fullName || "N/A"}</p>
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
              <p><strong>Experience:</strong> {doctor.experience} years</p>
              <p><strong>Fees:</strong> ₹{doctor.feesPerConsultation}</p>
              <p><strong>Status:</strong> {doctor.status}</p>
              <p><strong>Timings:</strong> {Array.isArray(doctor.timings) ? doctor.timings.join(", ") : doctor.timings}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;