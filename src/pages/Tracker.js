import React, { useState, useEffect } from "react";
import axios from "axios";

const Tracker = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/activities")
      .then((res) => {
        setActivities(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Error loading activities");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this activity?")) return;

    axios
      .delete(`http://localhost:5000/activities/${id}`)
      .then((res) => {
        console.log(res.data);
        // remove deleted activity from state
        setActivities((prev) => prev.filter((a) => a.ActivityID !== id));
      })
      .catch((err) => {
        console.log(err);
        alert("Error deleting activity");
      });
  };

  const handleClearAll = () => {
    if (!window.confirm("Are you sure you want to delete ALL activities?")) return;

    axios
      .delete("http://localhost:5000/activities")
      .then((res) => {
        console.log(res.data);
        setActivities([]); // clear list in UI
      })
      .catch((err) => {
        console.log(err);
        alert("Error clearing activities");
      });
  };

  return (
    <section className="page tracker-page">
      <h2>Activity Tracker </h2>
      <p>Below is the list of logged activities </p>

      {loading && <p>Loading activities...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && activities.length === 0 && (
        <p>No activities in the database yet.</p>
      )}

      {/* Show Clear All only when there are activities */}
      {!loading && !error && activities.length > 0 && (
        <div style={{ marginBottom: "12px", display: "flex", gap: "8px" }}>
          <button className="btn-danger" onClick={handleClearAll}>
            Clear All
          </button>
        </div>
      )}

      {!loading && !error && activities.length > 0 && (
        <table
          className="card"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Title
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Category
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Duration (min)
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Date
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Notes
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Image
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((act) => (
              <tr key={act.ActivityID}>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {act.Title}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {act.Category || "-"}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {act.DurationMin || "-"}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {act.ActivityDate
                    ? new Date(act.ActivityDate).toLocaleDateString()
                    : "-"}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {act.Notes || "-"}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  {act.ImagePath ? (
                    <img
                      src={`http://localhost:5000${act.ImagePath}`}
                      alt="activity"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(act.ActivityID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Tracker;
