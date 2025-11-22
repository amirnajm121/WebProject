import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent:\n" + JSON.stringify(form, null, 2));
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="page contact-page">
      <h2>Contact Us</h2>
      <p>Have a suggestion or feedback about HealthTrack?</p>

      <form className="card contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Message
          <textarea
            name="message"
            rows="4"
            required
            value={form.message}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="btn-primary">
          Send
        </button>
      </form>
    </section>
  );
};

export default Contact;