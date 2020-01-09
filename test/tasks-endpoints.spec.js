const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Tasks Endpoints', function() {
  let db

  const {
    testPlants,
    testUsers,
  } = helpers.makePlantsFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

    context('Given there are tasks in the database', () => {
      beforeEach('insert tasks', () =>
        helpers.seedPlantsTables(
          db,
          testUsers,
          testPlants,
        )
      )

      it('responds with 200 and all of the tasks', () => {
        const expectedTasks = testTasks.map(task =>
          helpers.makeExpectedTask(
            testUsers,
            testTask,
          )
        )
        return supertest(app)
          .get('/api/tasks')
          .expect(200, expectedTasks)
      })
    })
})