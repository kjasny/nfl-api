const {teamsModel } = require('./index')

const getAllTeams = async () => {
    const allTeams = await teamsModel.findAll()
    
    return allTeams
}

const getTeamById = async (id) => {
    const foundTeam = await teamsModel.findOne({ where: { id }})
    
    return foundTeam
    
}

const addNewTeamModel = async (newTeam) => {
    const addedTeam = await teamsModel.create(newTeam)
    
    return addedTeam
}

module.exports = { getAllTeams, getTeamById, addNewTeamModel }