import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Tracker from "./pages/Tracker";
import Contact from "./pages/Contact";
import AddActivity from "./pages/AddActivity";
import "./styles/App.css";
import "./styles/Pages.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add-activity" element={<AddActivity />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
