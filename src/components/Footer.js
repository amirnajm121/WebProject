import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} HealthTrack – Fitness & Wellness</p>
      <p className="footer-small">
        Track your daily activity, meals, and workouts in one place.
      </p>
    </footer>
  );
};

export default Footer;