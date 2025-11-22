import React, { useState } from "react";

const ActivityForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    date: "",
    type: "Workout",
    duration: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.duration) return;
    onAdd(form);
    setForm({ date: "", type: "Workout", duration: "", notes: "" });
  };

  return (
    <form className="card activity-form" onSubmit={handleSubmit}>
      <h3>Log Activity</h3>
      <label>
        Date
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Type
        <select name="type" value={form.type} onChange={handleChange}>
          <option>Workout</option>
          <option>Steps/Walking</option>
          <option>Meal</option>
          <option>Sleep</option>
          <option>Meditation</option>
        </select>
      </label>
      <label>
        Duration (minutes)
        <input
          type="number"
          name="duration"
          min="1"
          value={form.duration}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Notes
        <textarea
          name="notes"
          rows="3"
          placeholder="Optional notes..."
          value={form.notes}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="btn-primary">
        Add Activity
      </button>
    </form>
  );
};

export default ActivityForm;