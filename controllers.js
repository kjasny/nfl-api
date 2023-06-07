const { getAllTeams, getTeamById, addNewTeamModel } = require('./models')

const getAllTeamsController = (request, response) => {
    const teamsResult = getAllTeams()
    return response.send(teamsResult)
}

const getTeamByIdController = (request, response) => {
    const { id } = request.params
    const foundTeam = getTeamById(parseInt(id))
    return response.send(foundTeam)
}

const addNewTeamController = (request, response) => {
    const { location, mascot, abbreviation, conference, division } = request.body

    if(!location || !mascot || !abbreviation || !conference || !division) return response.status(400).send('All fields are required to add a team')

    const newTeam = { location, mascot, abbreviation, conference, division }

    const addedTeam = addNewTeamModel(newTeam)

    return response.send(addedTeam)
}

module.exports = { getAllTeamsController, getTeamByIdController, addNewTeamController }