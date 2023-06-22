const { getAllTeams, getTeamById, addNewTeamModel } = require('../models/models')

const getAllTeamsController = async (request, response) => {
    try{
        const teamsResult = await getAllTeams()
        return response.send(teamsResult)
    } catch(error){
        return response.sendStatus(500)
    }
}

const getTeamByIdController = async (request, response) => {
    
    try{
        const { id } = request.params
        const foundTeam = await getTeamById(parseInt(id))
        if(!foundTeam.id) return response.sendStatus(404)

        return response.send(foundTeam)
    } catch(error){
        return response.sendStatus(500)
    }
}

const addNewTeamController = async (request, response) => {

        const { location, mascot, abbreviation, conference, division } = request.body

        if(!location || !mascot || !abbreviation || !conference || !division) return response.status(400).send('All fields are required to add a team')
    
        const newTeam = { location, mascot, abbreviation, conference, division }
    
        const addedTeam = await addNewTeamModel(newTeam)
    
        return response.status(201).send(addedTeam)

}

module.exports = { getAllTeamsController, getTeamByIdController, addNewTeamController }