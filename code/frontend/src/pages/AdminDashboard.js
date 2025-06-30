// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctor/all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDoctors(res.data.data);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    }
  };

  const updateDoctorStatus = async (doctorId, status) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/update-doctor-status`,
        { doctorId, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
      fetchDoctors(); // Refresh list after update
    } catch (error) {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Admin Dashboard 🛠</h2>
      {doctors.length === 0 ? (
        <p>No doctor applications available.</p>
      ) : (
        doctors.map((doctor) => (
          <div key={doctor._id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{doctor.fullName}</h5>
              <p>Email: {doctor.email}</p>
              <p>Specialization: {doctor.specialization}</p>
              <p>Experience: {doctor.experience} years</p>
              <p>Status: {doctor.status}</p>
              <div className="d-flex gap-2">
                {doctor.status !== "approved" && (
                  <button
                    className="btn btn-success"
                    onClick={() => updateDoctorStatus(doctor._id, "approved")}
                  >
                    Approve
                  </button>
                )}
                {doctor.status !== "rejected" && (
                  <button
                    className="btn btn-danger"
                    onClick={() => updateDoctorStatus(doctor._id, "rejected")}
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;