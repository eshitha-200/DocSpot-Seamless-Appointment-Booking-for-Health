// src/pages/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="homepage-header">
        <h1 className="logo">DocSpot</h1>
        <div className="header-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h2>Find & Book Doctors Seamlessly</h2>
        <p>Your health, our priority. Simple. Secure. Fast.</p>
        <button className="get-started-btn" onClick={() => navigate("/register")}>
          Get Started
        </button>

        <ul className="features-list">
              <li>Verified & Trusted Doctors</li>
              <li>Hassle-free Appointment Booking</li>
              <li>Secure Medical Information Access</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        © 2025 DocSpot. Built with 💙
      </footer>
    </div>
  );
};

export default HomePage;