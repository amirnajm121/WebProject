

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();


const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://elaborate-cendol-1e6c19.netlify.app"
  ],
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use("/images", express.static("images")); 


const db = mysql.createConnection({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "healthtrackdb",
  port: process.env.MYSQLPORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL (healthtrackdb)");
  }
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); 
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });



app.get("/activities", (req, res) => {
  const q = `
    SELECT a.ActivityID, a.Title, a.DurationMin, a.ActivityDate,
           a.Notes, a.ImagePath,
           c.Description AS Category
    FROM Activity a
    LEFT JOIN ActivityCategory c ON a.CategoryCode = c.CategoryCode
    ORDER BY a.ActivityDate DESC, a.ActivityID DESC
  `;
  db.query(q, (err, results) => {
    if (err) {
      console.log("Error fetching activities:", err);
      return res.status(500).json(err);
    }
    return res.json(results);
  });
});



app.get("/categories", (req, res) => {
  const q = "SELECT CategoryCode, Description FROM ActivityCategory";
  db.query(q, (err, results) => {
    if (err) {
      console.log("Error fetching categories:", err);
      return res.status(500).json(err);
    }
    return res.json(results);
  });
});



app.post("/activities", upload.single("image"), (req, res) => {
  const title = req.body.title;
  const category = req.body.category || null; 
  const duration = req.body.duration || null;
  const date = req.body.date || null;
  const notes = req.body.notes || null;

  
  const imagePath = req.file ? "/images/" + req.file.filename : null;

  const q = `
    INSERT INTO Activity (Title, CategoryCode, DurationMin, ActivityDate, Notes, ImagePath)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [title, category, duration, date, notes, imagePath];

  db.query(q, values, (err, result) => {
    if (err) {
      console.log("Error inserting activity:", err);
      return res.status(500).json(err);
    }
    return res.json({ message: "Activity added successfully", id: result.insertId });
  });
});



app.get("/search/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM Activity WHERE ActivityID = ?";
  db.query(q, [id], (err, result) => {
    if (err) {
      console.log("Error fetching single activity:", err);
      return res.status(500).json(err);
    }
    return res.json(result);
  });
});



app.put("/update/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;

  const title = req.body.title;
  const category = req.body.category || null;
  const duration = req.body.duration || null;
  const date = req.body.date || null;
  const notes = req.body.notes || null;

  const newImagePath = req.file ? "/images/" + req.file.filename : null;

  
  let q;
  let values;

  if (newImagePath) {
    q = `
      UPDATE Activity
      SET Title = ?, CategoryCode = ?, DurationMin = ?, ActivityDate = ?, Notes = ?, ImagePath = ?
      WHERE ActivityID = ?
    `;
    values = [title, category, duration, date, notes, newImagePath, id];
  } else {
    q = `
      UPDATE Activity
      SET Title = ?, CategoryCode = ?, DurationMin = ?, ActivityDate = ?, Notes = ?
      WHERE ActivityID = ?
    `;
    values = [title, category, duration, date, notes, id];
  }

  db.query(q, values, (err, result) => {
    if (err) {
      console.log("Error updating activity:", err);
      return res.status(500).json(err);
    }
    return res.json({ message: "Activity updated successfully" });
  });
});



app.delete("/activities/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM Activity WHERE ActivityID = ?";
  db.query(q, [id], (err, result) => {
    if (err) {
      console.log("Error deleting activity:", err);
      return res.status(500).json(err);
    }
    return res.json({ message: "Activity deleted successfully" });
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
  console.log("HealthTrack backend running on port " + PORT);
});
