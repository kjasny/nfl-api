const express = require('express')
const app = express()

const { getAllTeamsController, getTeamByIdController, addNewTeamController } = require('./controllers')

app.get('/teams', getAllTeamsController)

app.get('/teams/:id', getTeamByIdController)

app.post('/teams', express.json(), addNewTeamController)
   


app.listen(8080, () => {
    console.log('Listening on http://localhost:8080')
})