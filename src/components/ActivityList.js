import React from "react";

const ActivityList = ({ activities, filterType }) => {
  const filtered =
    filterType === "All"
      ? activities
      : activities.filter((a) => a.type === filterType);

  if (filtered.length === 0) {
    return <p>No activities logged yet.</p>;
  }

  return (
    <ul className="activity-list">
      {filtered.map((activity, index) => (
        <li key={index} className="card activity-card">
          <div className="activity-header">
            <span className="activity-type">{activity.type}</span>
            <span className="activity-date">{activity.date}</span>
          </div>
          <p>
            <strong>Duration:</strong> {activity.duration} min
          </p>
          {activity.notes && (
            <p className="activity-notes">
              <strong>Notes:</strong> {activity.notes}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ActivityList;