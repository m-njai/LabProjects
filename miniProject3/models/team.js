"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Import Sequelize instance

const Team = sequelize.define("Team", // Correctly pass Sequelize instance here
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stadium: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "Team", // Use PascalCase for model name
    tableName: "teams", // Ensure table name matches naming convention
    timestamps: true, // Automatically add createdAt/updatedAt fields
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
  }
);

module.exports = Team;
