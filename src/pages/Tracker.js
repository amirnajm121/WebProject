import React, { useState } from "react";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";

const Tracker = () => {
  const [activities, setActivities] = useState([]);
  const [filterType, setFilterType] = useState("All");

  const handleAddActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  return (
    <section className="page tracker-page">
      <h2>Activity Tracker</h2>
      <p>Log your workouts, meals, and daily wellness activities.</p>

      <div className="tracker-layout">
        <ActivityForm onAdd={handleAddActivity} />

        <div className="card tracker-list-card">
          <div className="tracker-filters">
            <label>
              Filter by type:
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option>All</option>
                <option>Workout</option>
                <option>Steps/Walking</option>
                <option>Meal</option>
                <option>Sleep</option>
                <option>Meditation</option>
              </select>
            </label>
          </div>

          <ActivityList activities={activities} filterType={filterType} />
        </div>
      </div>
    </section>
  );
};

export default Tracker;