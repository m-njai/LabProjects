"use strict";

const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const sequelize = require("./db"); // Import the Sequelize instance to verify database connection

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for frontend integration

// Serve Static Files (React Frontend)
app.use(express.static(path.join(__dirname, "client/build")));

// Verify Database Connection
sequelize.authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch(err => console.error("Database connection error:", err));

// Sync Sequelize Models
sequelize.sync({ force: false }) // Set to 'true' to recreate tables during development
  .then(() => console.log("Database models synced successfully."))
  .catch(err => console.error("Error syncing database models:", err));

// Home route
app.get("/", (req, res) => {
  console.log("Welcome endpoint hit!"); // Logging result
  res.send("Welcome to the player and team management app!");
});

// Define routes
const playerRoutes = require("./routes/playerRoutes");
app.use("/api/players", playerRoutes);

const teamRoutes = require("./routes/teamRoutes");
app.use("/api/teams", teamRoutes);

// Set port and listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
