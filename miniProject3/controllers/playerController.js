"use strict";

const axios = require("axios"); // For API requests
const Player = require("../models/player"); // Your Player model

const playerApiUrl = "https://api.balldontlie.io/v1/players";
const apikey = "d88ce3df-7785-471b-b982-e0fde0733e4a";

// Function to fetch and insert players into the database
const fetchAndInsertPlayers = async () => {
  try {
    console.log("Fetching players from API...");
    const response = await axios.get(playerApiUrl, { 'headers': { 'Authorization': apikey } }); // Fetch data from API
    const players = response.data.data; // Extract players data from response

    // Transform player data into the desired format for bulk insertion
    const playerData = players.map((player) => ({
      id: player.id,
      first_name: player.first_name,
      last_name: player.last_name,
      position: player.position || "Unknown", // Handle missing position data
      team_id: player.team?.id || null, // Handle missing team data
      team_name: player.team?.full_name || "N/A", // Provide default team name
      height_feet: player.height_feet || null, // Optional field
      height_inches: player.height_inches || null, // Optional field
      weight_pounds: player.weight_pounds || null, // Optional field
    }));

    console.log("Inserting players into the database...");
    await Player.bulkCreate(playerData, { ignoreDuplicates: true }); // Efficient bulk insertion
    console.log("Players fetched and inserted successfully.");
  } catch (error) {
    console.error(error);
    console.error("Error fetching and inserting players:", error.message);
  }
};

// Retrieve all players
const getPlayers = async (res) => {
  try {
    const players = await Player.findAll();
    console.log("Fetched players:", players); // Log results for debugging
    res.send({ result: 200, data: players });
  } catch (error) {
    console.error("Error retrieving players:", error.message);
    res.status(500).send({ result: 500, error: error.message });
  }
};

// Retrieve a player by ID
const getPlayerById = async (id, res) => {
  try {
    const player = await Player.findByPk(id);
    if (player) {
      console.log("Fetched player:", player); // Log results for debugging
      res.send({ result: 200, data: player });
    } else {
      console.log(`Player with ID ${id} not found.`);
      res.status(404).send({ result: 404, error: "Player not found" });
    }
  } catch (error) {
    console.error("Error retrieving player by ID:", error.message);
    res.status(500).send({ result: 500, error: error.message });
  }
};

// Update a player's details
const updatePlayer = async (id, data, res) => {
  try {
    const [rowsUpdated, [updatedPlayer]] = await Player.update(data, {
      where: { id },
      returning: true,
    });
    if (rowsUpdated) {
      console.log("Updated player:", updatedPlayer); // Log updated player
      res.send({ result: 200, data: updatedPlayer });
    } else {
      console.log(`Player with ID ${id} not found for update.`);
      res.status(404).send({ result: 404, error: "Player not found" });
    }
  } catch (error) {
    console.error("Error updating player:", error.message);
    res.status(500).send({ result: 500, error: error.message });
  }
};

// Delete a player by ID
const deletePlayer = async (id, res) => {
  try {
    const deleted = await Player.destroy({ where: { id } });
    if (deleted) {
      console.log(`Deleted player with ID ${id}.`); // Log deletion
      res.send({ result: 204, message: "Player deleted successfully." });
    } else {
      console.log(`Player with ID ${id} not found for deletion.`);
      res.status(404).send({ result: 404, error: "Player not found" });
    }
  } catch (error) {
    console.error("Error deleting player:", error.message);
    res.status(500).send({ result: 500, error: error.message });
  }
};

module.exports = {
  fetchAndInsertPlayers,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
};
