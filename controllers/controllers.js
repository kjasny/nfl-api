const { getAllTeams, getTeamById, addNewTeamModel } = require('../models/models')

const getAllTeamsController = async (request, response) => {
    const teamsResult = await getAllTeams()
    return response.send(teamsResult)
}

const getTeamByIdController = async (request, response) => {
    const { id } = request.params
    const foundTeam = await getTeamById(parseInt(id))
    return response.send(foundTeam)
}

const addNewTeamController = async (request, response) => {
    const { location, mascot, abbreviation, conference, division } = request.body

    if(!location || !mascot || !abbreviation || !conference || !division) return response.status(400).send('All fields are required to add a team')

    const newTeam = { location, mascot, abbreviation, conference, division }

    const addedTeam = await addNewTeamModel(newTeam)

    return response.send(addedTeam)
}

module.exports = { getAllTeamsController, getTeamByIdController, addNewTeamController }