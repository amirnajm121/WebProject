import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";  

const Home = () => {
  
  return (
    <section className="page home">
      <div className="hero">
        <h1>HealthTrack</h1>
        <p>Your personal fitness and wellness companion.</p>
        <p>
          Log daily activities, meals, and workouts to stay consistent and
          motivated.
        </p>
        <Link to="/tracker" className="btn-primary">
       Start Tracking
      </Link>
      </div>
    </section>
  );
};

export default Home;