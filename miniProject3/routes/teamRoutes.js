"use strict";

const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController"); // Import teamController

// Route to fetch and insert teams into the database
router.get("/fetch-teams", (req, res) => {
  teamController.fetchAndInsertTeams()
    .then(() => res.status(200).send({ result: 200, message: "Teams fetched and inserted successfully." }))
    .catch((err) => res.status(500).send({ result: 500, error: err.message }));
});

// Route to get all teams
router.get("/", (req, res) => {
  teamController.getAllTeams()
    .then((teams) => res.status(200).send({ result: 200, data: teams }))
    .catch((err) => res.status(500).send({ result: 500, error: err.message }));
});

// Route to get a specific team by ID
router.get("/:id", (req, res) => {
  teamController.getTeamById(req.params.id)
    .then((team) => {
      if (team) {
        res.status(200).send({ result: 200, data: team });
      } else {
        res.status(404).send({ result: 404, error: "Team not found" });
      }
    })
    .catch((err) => res.status(500).send({ result: 500, error: err.message }));
});

// Route to update a team by ID
router.put("/:id", (req, res) => {
  teamController.updateTeam(req.params.id, req.body)
    .then((updatedTeam) => {
      if (updatedTeam && typeof updatedTeam === 'object') {
        res.status(200).send({ result: 200, data: updatedTeam });
      } else {
        res.status(404).send({ result: 404, error: "Team not found or invalid data" });
      }
    })
    .catch((err) => {
      console.error("Error updating team:", err.stack || err);
      res.status(500).send({ result: 500, error: err.message });
    });
});

// Route to delete a team by ID
router.delete("/:id", (req, res) => {
  teamController.deleteTeam(req.params.id)
    .then((deleted) => {
      if (deleted) {
        res.status(200).send({ result: 200, message: "Team deleted successfully." });
      } else {
        res.status(404).send({ result: 404, error: "Team not found" });
      }
    })
    .catch((err) => res.status(500).send({ result: 500, error: err.message }));
});

module.exports = router;
