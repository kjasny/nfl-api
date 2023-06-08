const teams = require('./teams')

const getAllTeams = () => {
    return teams
}

const getTeamById = (id) => {
    const foundTeam = teams.find(team => team.id === id)
    return foundTeam
    
}

const addNewTeamModel = (newTeam) => {
    const id = teams.length + 1
    const newTeamWithId = {id, ...newTeam}
    
    teams.push(newTeamWithId)
    return newTeamWithId
}

module.exports = { getAllTeams, getTeamById, addNewTeamModel }