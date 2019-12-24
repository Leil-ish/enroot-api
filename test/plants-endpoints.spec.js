const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Plants Endpoints', function() {
  let db

  const {
    testUsers,
    testPlants,
    testTasks,
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

  describe(`GET /api/garden`, () => {
    context(`Given no plants`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/garden')
          .expect(200, [])
      })
    })

    context('Given there are plants in the database', () => {
      beforeEach('insert plants', () =>
        helpers.seedPlantsTables(
          db,
          testUsers,
          testPlants,
          testTasks,
        )
      )

      it('responds with 200 and all of the plants', () => {
        const expectedPlants = testPlants.map(plant =>
          helpers.makeExpectedPlant(
            testUsers,
            testPlants,
            testTasks,
          )
        )
        return supertest(app)
          .get('/api/garden')
          .expect(200, expectedPlants)
      })
    })

    context(`Given an XSS attack plant`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousPlant,
        expectedPlant,
      } = helpers.makeMaliciousPlant(testUser)

      beforeEach('insert malicious plant', () => {
        return helpers.seedMaliciousPlant(
          db,
          testUser,
          maliciousPlant,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/garden`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedPlant.title)
            expect(res.body[0].content).to.eql(expectedPlant.content)
          })
      })
    })
  })

  describe(`GET /api/garden/:plant_id`, () => {
    context(`Given no plants`, () => {
      beforeEach(() =>
        helpers.seedUsers(db, testUsers)
      )

      it(`responds with 404`, () => {
        const plantId = 123456
        return supertest(app)
          .get(`/api/garden/${plantId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Plant doesn't exist` })
      })
    })

    context('Given there are plants in the database', () => {
      beforeEach('insert plants', () =>
        helpers.seedPlantsTables(
          db,
          testUsers,
          testPlants,
          testTasks,
        )
      )

      it('responds with 200 and the specified plant', () => {
        const plantId = 2
        const expectedPlant = helpers.makeExpectedPlant(
          testUsers,
          testPlants[plantId - 1],
          testTasks,
        )

        return supertest(app)
          .get(`/api/garden/${plantId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedPlant)
      })
    })

    context(`Given an XSS attack plant`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousPlant,
        expectedPlant,
      } = helpers.makeMaliciousPlant(testUser)

      beforeEach('insert malicious plant', () => {
        return helpers.seedMaliciousPlant(
          db,
          testUser,
          maliciousPlant,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/garden/${maliciousPlant.id}`)
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.eql(expectedPlant.title)
            expect(res.body.content).to.eql(expectedPlant.content)
          })
      })
    })
  })

  describe(`GET /api/garden/:plant_id/tasks`, () => {
    context(`Given no plants`, () => {
      beforeEach(() =>
        helpers.seedUsers(db, testUsers)
      )

      it(`responds with 404`, () => {
        const plantId = 123456
        return supertest(app)
          .get(`/api/garden/${plantId}/tasks`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Plant doesn't exist` })
      })
    })

    context('Given there are tasks for plant in the database', () => {
      beforeEach('insert plants', () =>
        helpers.seedPlantsTables(
          db,
          testUsers,
          testPlants,
          testTasks,
        )
      )

      it('responds with 200 and the specified tasks', () => {
        const plantId = 1
        const expectedTasks = helpers.makeExpectedPlantTasks(
          testUsers, plantId, testTasks
        )

        return supertest(app)
          .get(`/api/garden/${plantId}/tasks`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedTasks)
      })
    })
  })
})
