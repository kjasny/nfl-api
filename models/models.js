const {teamsModel } = require('./index')

const getAllTeams = async () => {

    try{
        const allTeams = await teamsModel.findAll()
    
        return allTeams
    } catch(error){
        throw new Error('ERROR!')
    }

}

const getTeamById = async (id) => {

    try{
        const foundTeam = await teamsModel.findOne({ where: { id }})
    
        return foundTeam
    } catch(error){
        throw new Error('Database error')
    } 
}

const addNewTeamModel = async (newTeam) => {
    const addedTeam = await teamsModel.create(newTeam)
    
    return addedTeam
}

module.exports = { getAllTeams, getTeamById, addNewTeamModel }