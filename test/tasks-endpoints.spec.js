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

  describe(`POST /api/tasks`, () => {
    beforeEach('insert plants', () =>
      helpers.seedPlantsTables(
        db,
        testUsers,
        testPlants,
      )
    )

    it(`creates an task, responding with 201 and the new task`, function() {
      this.retries(3)
      const testPlant = testPlants[0]
      const testUser = testUsers[0]
      const newTask = {
        maintenance_needed: 'Test new task',
        plant_id: testPlant.id,
      }
      return supertest(app)
        .post('/api/tasks')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newTask)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id')
          expect(row.maintenance_needed).to.eql(newTask.maintenance_needed)
          expect(row.details).to.eql(newTask.details)
          expect(row.frequency).to.eql(newTask.frequency)
          expect(res.body.plant_id).to.eql(newTask.plant_id)
          expect(res.headers.location).to.eql(`/api/tasks/${res.body.id}`)
          const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
          const actualDate = new Date(res.body.date_created).toLocaleString()
          expect(actualDate).to.eql(expectedDate)
        })
        .expect(res =>
          db
            .from('enroot_tasks')
            .select('*')
            .where({ id: res.body.id })
            .first()
            .then(row => {
              expect(row.maintenance_needed).to.eql(newTask.maintenance_needed)
              expect(row.details).to.eql(newTask.details)
              expect(row.frequency).to.eql(newTask.frequency)
              expect(row.plant_id).to.eql(newTask.plant_id)
              expect(row.user_id).to.eql(testUser.id)
              expect(row.modified).to.eql(testTask.modified)
              expect(row.content).to.eql(testTask.modified)
              const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
              const actualDate = new Date(row.date_created).toLocaleString()
              expect(actualDate).to.eql(expectedDate)
            })
        )
    })

    const requiredFields = ['maintenance_needed', 'plant_id']

    requiredFields.forEach(field => {
      const testPlant = testPlants[0]
      const testUser = testUsers[0]
      const newTask = {
        maintenance_needed: 'Test new task',
        plant_id: testPlant.id,
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newTask[field]

        return supertest(app)
          .post('/api/tasks')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .send(newTask)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          })
      })
    })
  })
})