const Sequelize = require('sequelize')
const { teamsTemplate } = require('./teamsTemplate')

const connection = new Sequelize('nfl', 'k_teams_user', 'teams', {host: '173.230.134.130', dialect: 'mysql'})

const teamsModel = teamsTemplate(connection, Sequelize)

module.exports = { teamsModel }