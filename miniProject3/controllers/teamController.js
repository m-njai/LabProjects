"use strict";

const Team = require("../models/team"); // Import the Team model
const axios = require("axios"); // Import Axios for API requests

const teamsApiUrl = "https://api.balldontlie.io/v1/teams";
const apikey = "d88ce3df-7785-471b-b982-e0fde0733e4a";

// Fetch and insert teams data from the API
const fetchAndInsertTeams = async () => {
  try {
    console.log("Fetching teams from the API...");
       const response = await axios.get(teamsApiUrl, { 'headers': { 'Authorization': apikey } });
    const teams = response.data.data; // The 'data' key contains the teams list

    // Prepare team data for insertion
    const teamData = teams.map((team) => ({
      id: team.id,
      name: team.full_name,
      city: team.city,
      abbreviation: team.abbreviation,
      conference: team.conference,
      division: team.division,
    }));

    // Insert teams into the database (bulk insert for efficiency)
    await Team.bulkCreate(teamData, { ignoreDuplicates: true });
    console.log("All teams have been successfully inserted!");
    return { result: 201, message: "Teams inserted successfully." };
  } catch (error) {
    console.error("Error fetching or inserting teams:", error.message);
    throw new Error("Failed to fetch or insert teams.");
  }
};

// Get all teams
const getAllTeams = async () => {
  try {
    const teams = await Team.findAll();
    console.log("Fetched teams:", teams); // Print result for debugging
    return { result: 200, data: teams };
  } catch (error) {
    console.error("Error fetching teams:", error.message);
    throw new Error(error.message);
  }
};

// Get a team by ID
const getTeamById = async (id) => {
  try {
    const team = await Team.findByPk(id);
    if (team) {
      console.log("Fetched team:", team); // Print result for debugging
      return { result: 200, data: team };
    } else {
      console.log(`Team not found for ID: ${id}`); // Log details
      return { result: 404, error: "Team not found" };
    }
  } catch (error) {
    console.error("Error fetching team by ID:", error.message);
    throw new Error(error.message);
  }
};

// Update a team by ID
const updateTeam = async (id, data) => {
  try {
    const [rowsUpdated, [updatedTeam]] = await Team.update(data, { where: { id }, returning: true });
    if (rowsUpdated) {
      console.log("Updated team:", updatedTeam); // Print result for debugging
      return { result: 200, data: updatedTeam };
    } else {
      console.log(`No team found to update with ID: ${id}`); // Log details
      return { result: 404, error: "Team not found" };
    }
  } catch (error) {
    console.error("Error updating team:", error.message);
    throw new Error(error.message);
  }
};

// Delete a team by ID
const deleteTeam = async (id) => {
  try {
    const deleted = await Team.destroy({ where: { id } });
    if (deleted) {
      console.log(`Deleted team with ID: ${id}.`); // Print result for debugging
      return { result: 204, message: "Team deleted successfully." };
    } else {
      console.log(`No team found to delete with ID: ${id}`); // Log details
      return { result: 404, error: "Team not found" };
    }
  } catch (error) {
    console.error("Error deleting team:", error.message);
    throw new Error(error.message);
  }
};

module.exports = {
  fetchAndInsertTeams,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
