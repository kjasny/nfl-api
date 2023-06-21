const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')

//step 2: pull in functions we are testing
const { getAllTeamsController, getTeamByIdController, addNewTeamController } = require('../../controllers/controllers');
const { teamsModel } = require('../../models/index')

//step 2 a : mock data
const { teamsMock, singleMock } = require('./teams.mocks')

//step 3 tie sinonChai to chai, import expect
chai.use(sinonChai)
const { expect } = chai

describe('Integration Tests - teams', () => {
    describe('getAllTeamsController', () => {
        it('retrieve a list of teams from the database, then returns that list in res.send()', async () => {
            //Stub any external API or database
            const stubbedFindAll = sinon.stub(teamsModel, 'findAll').returns(teamsMock)
            const stubbedSend = sinon.stub()

            //response should be object
            const response = { send: stubbedSend}

            //Call controller
            await getAllTeamsController({}, response)

            //Make assertions using expect
            expect(stubbedFindAll).to.have.callCount(1)
            expect(stubbedSend).to.have.been.calledWith(teamsMock)
        })
    })

    describe('getTeamByIdController', () => {
        it('finds the associated team by ID then calls res.send with that team', async () => {
            const stubbedSend = sinon.stub()
            const stubbedFindOne = sinon.stub(teamsModel, 'findOne').returns(singleMock)

            const response = { send: stubbedSend }
            const request = { params: { id: 5} }

            await getTeamByIdController(request, response)

            expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 5}})
            expect(stubbedSend).to.have.been.calledWith(singleMock)
        })
    })

    describe('addNewTeamController', () => {
        it('accepts new team and saves it, sends 201 status', async () => {
            const stubbedSend = sinon.stub()
            const stubbedCreate = sinon.stub(teamsModel, 'create').returns(singleMock)
            const stubbedStatus = sinon.stub().returns({ send: stubbedSend})

            const response = { status: stubbedStatus }
            const request = { body: singleMock }

            await addNewTeamController(request, response)

            expect(stubbedCreate).to.have.been.calledWith(singleMock)
            expect(stubbedStatus).to.have.been.calledWith(201)
            expect(stubbedSend).to.have.been.calledWith(singleMock)
        })
    })
})