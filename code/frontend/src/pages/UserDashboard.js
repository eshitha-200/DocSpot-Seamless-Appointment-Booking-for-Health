import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css"; // Link the CSS file

const UserDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const getDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctor/get-approved", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDoctors(res.data.data);
    } catch (err) {
      alert("Error fetching doctors");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/appointment/book",
        {
          userId: localStorage.getItem("userId"),
          doctorId: bookingDoctor._id,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
      setBookingDoctor(null);
      setDate("");
      setTime("");
    } catch (error) {
      alert("Booking failed");
    }
  };

  return (
    <div className="user-dashboard-container">
      <div className="user-dashboard-wrapper">
        <div className="user-dashboard-header">
          <h2 className="text-primary">Welcome, User 👤</h2>
          <button
            className="apply-button"
            onClick={() => navigate("/apply-doctor")}
          >
            Apply as Doctor
          </button>
        </div>

        <h4 className="section-title">Available Doctors</h4>

        <div className="doctor-grid">
          {doctors.map((doctor) => (
            <div className="doctor-card" key={doctor._id}>
              <h4>{doctor.fullName || "Doctor"}</h4>
              <p>Specialization: {doctor.specialization}</p>
              <p>Experience: {doctor.experience} years</p>
              <p>Fees: ₹{doctor.feesPerConsultation}</p>
              <button
                className="book-button"
                onClick={() => setBookingDoctor(doctor)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {bookingDoctor && (
          <div className="booking-form">
            <h4>Book Appointment with Dr. {bookingDoctor.fullName || "Doctor"}</h4>
            <form onSubmit={handleBooking}>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
              <div className="form-buttons">
                <button type="submit">Confirm Booking</button>
                <button
                  type="button"
                  onClick={() => setBookingDoctor(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;