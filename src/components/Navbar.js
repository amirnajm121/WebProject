import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setOpen(!open);

  const isActive = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <header className="navbar">
      <div className="nav-logo">HealthTrack</div>
      <button className="nav-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`nav-links ${open ? "open" : ""}`}>
        <Link className={isActive("/")} to="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link
          className={isActive("/about")}
          to="/about"
          onClick={() => setOpen(false)}
        >
          About
        </Link>
        <Link
          className={isActive("/features")}
          to="/features"
          onClick={() => setOpen(false)}
        >
          Features
        </Link>
        <Link
          className={isActive("/tracker")}
          to="/tracker"
          onClick={() => setOpen(false)}
        >
          Tracker
        </Link>
        <Link
          className={isActive("/contact")}
          to="/contact"
          onClick={() => setOpen(false)}
        >
          Contact
        </Link>

        <Link to="/add-activity" className="nav-add-btn">+ Add Activity</Link>

      </nav>
    </header>
  );
};

export default Navbar;