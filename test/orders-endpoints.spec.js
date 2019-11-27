const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Orders Endpoints', function() {
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

  describe(`POST /api/orders`, () => {
    beforeEach('insert plants', () =>
      helpers.seedPlantsTables(
        db,
        testUsers,
        testPlants,
      )
    )

    it(`creates an order, responding with 201 and the new order`, function() {
      this.retries(3)
      const testPlant = testPlants[0]
      const testUser = testUsers[0]
      const newOrder = {
        maintenance_needed: 'Test new order',
        plant_id: testPlant.id,
      }
      return supertest(app)
        .post('/api/orders')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newOrder)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id')
          expect(row.maintenance_needed).to.eql(newOrder.maintenance_needed)
          expect(row.details).to.eql(newOrder.details)
          expect(row.frequency).to.eql(newOrder.frequency)
          expect(res.body.plant_id).to.eql(newOrder.plant_id)
          expect(res.headers.location).to.eql(`/api/orders/${res.body.id}`)
          const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
          const actualDate = new Date(res.body.date_created).toLocaleString()
          expect(actualDate).to.eql(expectedDate)
        })
        .expect(res =>
          db
            .from('enroot_orders')
            .select('*')
            .where({ id: res.body.id })
            .first()
            .then(row => {
              expect(row.maintenance_needed).to.eql(newOrder.maintenance_needed)
              expect(row.details).to.eql(newOrder.details)
              expect(row.frequency).to.eql(newOrder.frequency)
              expect(row.plant_id).to.eql(newOrder.plant_id)
              expect(row.user_id).to.eql(testUser.id)
              expect(row.modified).to.eql(testOrder.modified)
              expect(row.content).to.eql(testOrder.modified)
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
      const newOrder = {
        maintenance_needed: 'Test new order',
        plant_id: testPlant.id,
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newOrder[field]

        return supertest(app)
          .post('/api/orders')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .send(newOrder)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          })
      })
    })
  })
})