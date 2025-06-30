import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookAppointmentPage = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/doctor/${doctorId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDoctor(res.data.data);
      } catch (error) {
        console.error("Failed to fetch doctor details", error);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  if (!doctor) return <div>Loading doctor details...</div>;

  return (
    <div>
      <h2>Book Appointment with Dr. {doctor.fullName}</h2>
      <p>Specialization: {doctor.specialization}</p>
      <p>Experience: {doctor.experience} years</p>
      <p>Fees: ₹{doctor.feesPerConsultation}</p>
      <p>Timings: {Array.isArray(doctor.timings) ? doctor.timings.join(", ") : doctor.timings}</p>

      {/* Appointment Form */}
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Date:</label>
        <input type="date" required />
        <br />
        <label>Time:</label>
        <input type="time" required />
        <br />
        <button type="submit">Confirm Appointment</button>
      </form>
    </div>
  );
};

export default BookAppointmentPage;