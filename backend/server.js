const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
 

app.use((req, res, next) => {
  try {
    const body = req.body && Object.keys(req.body).length ? JSON.stringify(req.body) : "{}";
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - body: ${body}`);
  } catch (e) {
    console.log(`Request logger error: ${e}`);
  }
  next();
});

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : [
      "http://localhost:3000",
      "https://elaborate-cendol-1e6c19.netlify.app",
    ];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true
};
app.use(cors(corsOptions));


app.use("/images", express.static(path.join(__dirname, "images")));


const db = mysql.createConnection({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
console.log("Connecting to MySQL with:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
});

db.connect((err) => {
  if (err) {
    console.log("❌ Database connection failed:", err);
  } else {
    console.log("🟢 Connected to MySQL");
  }
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });


app.get("/", (req, res) => {
  res.json({
    message: "HealthTrack API is running",
    endpoints: ["/activities", "/categories"]
  });
});


app.get("/activities", (req, res) => {
  const q = "SELECT * FROM Activity ORDER BY ActivityDate DESC";
  db.query(q, (err, data) => {
    if (err) {
      console.log("Error fetching activities:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});


app.get("/categories", (req, res) => {
  const q = "SELECT * FROM ActivityCategory";
  db.query(q, (err, data) => {
    if (err) {
      console.log("Error fetching categories:", err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});


app.post("/activities", upload.single("image"), (req, res) => {
  const imgPath = req.file ? `/images/${req.file.filename}` : null;

  const q =
    "INSERT INTO Activity (Title, CategoryCode, DurationMin, ActivityDate, Notes, ImagePath) VALUES ?";
  const values = [
    [
      req.body.title,
      req.body.category,
      req.body.duration,
      req.body.date,
      req.body.notes,
      imgPath,
    ],
  ];

  db.query(q, [values], (err, result) => {
    if (err) {
      console.log("Error inserting activity:", err);
      return res.status(500).json(err);
    }
    return res.json({ success: true, message: "Activity added" });
  });
});


app.delete("/activities/:id", (req, res) => {
  const q = "DELETE FROM Activity WHERE ActivityID = ?";
  db.query(q, [req.params.id], (err, result) => {
    if (err) {
      console.log("Error deleting activity:", err);
      return res.status(500).json(err);
    }
    return res.json({ message: "Activity deleted" });
  });
});


app.delete("/activities", (req, res) => {
  const q = "DELETE FROM Activity";
  db.query(q, (err, result) => {
    if (err) {
      console.log("Error deleting all activities:", err);
      return res.status(500).json(err);
    }
    return res.json({ message: "All activities deleted" });
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});


 