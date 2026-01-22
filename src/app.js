// src/app.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./modules/auth/auth.routes");
const { authenticate } = require("./middleware/auth.middleware");
const { errorHandler } = require("./middleware/error.middleware");

const app = express();

// global middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// health check
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// protected route example
app.get("/protected", authenticate, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});

app.use("/auth", authRoutes);
app.use(errorHandler);

module.exports = app;
