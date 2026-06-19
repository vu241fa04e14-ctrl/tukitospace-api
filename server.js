require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Connect MongoDB
connectDB();

/* =========================
   CORS CONFIG (FIXED)
========================= */
app.use(
  cors({
    origin: "https://taskmanager-zenx.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
// Handle preflight requests

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   ROUTES
========================= */

// Health check route
app.get("/", (req, res) => {
  res.send("TukitoSpace API Running");
});

// API routes
app.use("/api/tasks", taskRoutes);

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running On Port ${PORT}`);
});