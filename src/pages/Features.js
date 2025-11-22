import React from "react";

const Features = () => {
  const features = [
    {
      title: "Daily Activity Log",
      description: "Record workouts, walks, and other activities in seconds.",
    },
    {
      title: "Meal Logging",
      description: "Track key meals to build awareness of your nutrition.",
    },
    {
      title: "Simple Progress View",
      description:
        "See all your recent entries on a single screen to stay motivated.",
    },
    {
      title: "Anytime Anywhere",
      description:
        "Track wherever you are! From your phone, tablet, or laptop.",
    },
  ];

  return (
    <section className="page">
      <h2>Features</h2>
      <div className="grid">
        {features.map((f, idx) => (
          <div key={idx} className="card">
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;