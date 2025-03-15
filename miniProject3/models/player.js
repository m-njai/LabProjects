"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Import the Sequelize instance

const Player = sequelize.define("Player", // Define the Player model
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, // Ensures unique ID is generated automatically
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    team_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    height_feet: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional field
    },
    height_inches: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional field
    },
    weight_pounds: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional field
    },
  },
  {
    modelName: "Player", // Use PascalCase for the model name
    tableName: "players", // Explicitly define the table name
    timestamps: true, // Enable createdAt and updatedAt fields
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
  }
);

module.exports = Player; // Export the Player model
