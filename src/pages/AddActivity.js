import React, { useState, useEffect } from "react";
import axios from "axios";

const AddActivity = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

 
  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("duration", duration);
    formData.append("date", date);
    formData.append("notes", notes);
    if (image) {
      formData.append("image", image); 
    }

    axios
      .post("http://localhost:5000/activities", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
        setMessage("Activity added successfully!");

      
        setTitle("");
        setCategory("");
        setDuration("");
        setDate("");
        setNotes("");
        setImage(null);

        
        const fileInput = document.getElementById("activityImageInput");
        if (fileInput) fileInput.value = "";
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error adding activity.");
      });
  };

  return (
  <section className="page add-activity-page">
    <div className="add-activity-container">
      <h2>Add New Activity</h2>
      <p>Fill the form below to add a new activity to HealthTrack.</p>

      {message && (
        <p className={message.includes("Error") ? "msg error" : "msg success"}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="card add-activity-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Morning Run"
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.CategoryCode} value={cat.CategoryCode}>
                {cat.Description}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Duration (minutes)</label>
            <input
              type="number"
              min="0"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 30"
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes about the activity"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Image (optional)</label>
          <input
            id="activityImageInput"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn-primary full-width-btn">
          Save Activity
        </button>
      </form>
    </div>
  </section>
);

};

export default AddActivity;
