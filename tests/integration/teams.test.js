const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it, afterEach, beforeEach, after, before } = require('mocha')

//step 2: pull in functions we are testing
const { getAllTeamsController, getTeamByIdController, addNewTeamController } = require('../../controllers/controllers');
const { teamsModel } = require('../../models/index')

//step 2 a : mock data
const { teamsMock, singleMock, invalidMock } = require('./teams.mocks')

//step 3 tie sinonChai to chai, import expect
chai.use(sinonChai)
const { expect } = chai

describe('Integration Tests - teams', () => {

    let stubbedSend
    let sandbox
    let stubbedFindAll
    let stubbedFindOne
    let stubbedCreate
    let stubbedStatus
    let response
    let stubbedSendStatus

    before(() => {
        sandbox = sinon.createSandbox()
        stubbedSend = sandbox.stub()
        stubbedFindAll = sandbox.stub(teamsModel, 'findAll')
        stubbedFindOne = sandbox.stub(teamsModel, 'findOne')
        stubbedCreate = sandbox.stub(teamsModel, 'create')
        stubbedStatus = sandbox.stub()
        stubbedSendStatus = sandbox.stub()
        response = {
            send: stubbedSend,
            status: stubbedStatus,
            sendStatus: stubbedSendStatus
        }
    })

    afterEach(() => {
        sandbox.reset()
    })

    describe('getAllTeamsController', () => {
        it('retrieve a list of teams from the database, then returns that list in res.send()', async () => {
            //Stub any external API or database
            stubbedFindAll.returns(teamsMock)

            //Call controller
            await getAllTeamsController({}, response)

            //Make assertions using expect
            expect(stubbedFindAll).to.have.callCount(1)
            expect(stubbedSend).to.have.been.calledWith(teamsMock)
        })
        it('returns a 500 error when database is unable to retrieve teams', async () => {
            stubbedFindAll.throws('ERROR')

            await getAllTeamsController({}, response)

            expect(stubbedFindAll).to.have.callCount(1)
            expect(stubbedSendStatus).to.have.been.calledWith(500)
        })
    })

    describe('getTeamByIdController', () => {
        it('finds the associated team by ID then calls res.send with that team', async () => {
            let singleDatabaseMock = {...singleMock, id: 5}
            stubbedFindOne.returns(singleDatabaseMock)

            const request = { params: { id: 5} }

            await getTeamByIdController(request, response)

            expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 5}})
            expect(stubbedSend).to.have.been.calledWith(singleDatabaseMock)
        })
        it('Team is not found in the database, and returns a 500 error', async () => {
            stubbedFindOne.throws('ERROR!')

            const request = { params: { id: -1 } }
            
            await getTeamByIdController(request, response)

            expect(stubbedFindOne).to.have.been.calledWith({ where: { id: -1 } })
            expect(stubbedSendStatus).to.have.been.calledWith(500)

        })
        it('Team is not found in the database, and returns a 404 error', async () => {
            stubbedFindOne.returns({})

            const request = { params: { id: -1 } }
            
            await getTeamByIdController(request, response)

            expect(stubbedFindOne).to.have.been.calledWith({ where: { id: -1 } })
            expect(stubbedSendStatus).to.have.been.calledWith(404)

        })
    })

    describe('addNewTeamController', () => {
        it('accepts new team and saves it, sends 201 status', async () => {

            stubbedCreate.returns(singleMock)
            stubbedStatus.returns({ send: stubbedSend})

            const request = { body: singleMock }

            await addNewTeamController(request, response)

            expect(stubbedCreate).to.have.been.calledWith(singleMock)
            expect(stubbedStatus).to.have.been.calledWith(201)
            expect(stubbedSend).to.have.been.calledWith(singleMock)
        })
        it('Lets the use know they did not impute a valid new team', async () => {
            stubbedStatus = sinon.stub().returns({send: stubbedSend})

            response = {status: stubbedStatus}
            const request = {body: invalidMock}

            await addNewTeamController(request, response)

            expect(stubbedStatus).to.have.been.calledWith(400)
            expect(stubbedSend).to.have.been.calledWith('All fields are required to add a team')
        })
    })
})