const Player = require('./player'); // require the model
const Team = require('./team'); // require the model

'use strict'

async function init() {
    await Player.sync();
    await Team.sync();
    // sync the model
    // also sync any extra models here
};

init();
// Sequelize will auto-generate foreign key column names based on the table names
Team.belongsTo(Player);
Player.hasMany(Team);

module.exports = {
    Player,
    Team,
    // export the model
    // also export any extra models here
};