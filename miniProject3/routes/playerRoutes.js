"use strict";

const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

// Route to fetch and insert players into the database (from API)
router.get("/fetch-and-insert-players", (req, res) => {
  Controllers.playerController.fetchAndInsertPlayers()
    .then(() => res.send({ result: 200, message: "Players fetched and inserted successfully." }))
    .catch(err => res.status(500).send({ result: 500, error: err.message }));
});

// Route to retrieve all players
router.get("/", (req, res) => {
  Controllers.playerController.getPlayers(res);
});

// Route to retrieve a specific player by ID
router.get("/:id", (req, res) => {
  Controllers.playerController.getPlayerById(req.params.id, res);
});

// Route to update a player's details
router.put("/:id", (req, res) => {
  Controllers.playerController.updatePlayer(req.params.id, req.body, res);
});

// Route to delete a player by ID
router.delete("/:id", (req, res) => {
  Controllers.playerController.deletePlayer(req.params.id, res);
});

module.exports = router;
