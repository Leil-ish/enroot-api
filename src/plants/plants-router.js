const express = require('express')
const path = require('path')
const PlantsService = require('./plants-service')
const {requireAuth} = require('../middleware/jwt-auth')
const jsonBodyParser = express.json()
const plantsRouter = express.Router()

plantsRouter
  .route('/')
  .get((req, res, next) => {
    PlantsService.getAllPlants(req.app.get('db'))
      .then(plants => {
        res.json(plants.map(PlantsService.serializePlant))
      })
      .catch(next)
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const {scientific_name, common_name, lifespan, growth_rate, growth_period, 
        temperature_minimum, shade_tolerance, precipitation_minimum, precipitation_maximum, 
        resprout_ability, family_common_name, duration, drought_tolerance, frost_free_days_minimum, 
        moisture_use} = req.body
    const newPlant = {scientific_name, common_name, lifespan, growth_rate, growth_period, 
        temperature_minimum, shade_tolerance, precipitation_minimum, precipitation_maximum, 
        resprout_ability, family_common_name, duration, drought_tolerance, frost_free_days_minimum, 
        moisture_use}

    for (const [key, value] of Object.entries(newPlant))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    newPlant.user_id = req.user.id

    PlantsService.insertPlant(
      req.app.get('db'),
      newPlant
    )
      .then(plant => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${plant.id}`))
          .json(PlantsService.serializePlant(plant))
      })
      .catch(next)
    })

plantsRouter
    .route('/add-plant')
    .get((req, res, next) => {
      PlantsService.getAllPlants(req.app.get('db'))
        .then(plants => {
          res.json(plants.map(PlantsService.serializePlant))
        })
        .catch(next)
    })
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
      const {common_name, lifespan, temperature_minimum, resprout_ability, duration} = req.body
      const newPlant = {common_name, lifespan, temperature_minimum, resprout_ability, duration}
  
      for (const [key, value] of Object.entries(newPlant))
        if (value == null)
          return res.status(400).json({
            error: `Missing '${key}' in request body`
          })
  
      newPlant.user_id = req.user.id
  
      PlantsService.insertPlant(
        req.app.get('db'),
        newPlant
      )
        .then(plant => {
          res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${plant.id}`))
            .json(PlantsService.serializePlant(plant))
        })
        .catch(next)
      })

plantsRouter
  .route('/:plant_id')
  .all(requireAuth)
  .all(checkPlantExists)
  .get((req, res) => {
    res.json(PlantsService.serializePlant(res.plant))
  })
  .delete((req, res, next) => {
    PlantsService.deletePlant(
      req.app.get('db'),
      req.params.plant_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

plantsRouter
  .route('/:plant_id/orders/')
  .all(requireAuth)
  .all(checkPlantExists)
  .get((req, res, next) => {
    PlantsService.getOrdersForPlant(
      req.app.get('db'),
      req.params.plant_id
    )
      .then(orders => {
        res.json(orders.map(PlantsService.serializePlantOrder))
      })
      .catch(next)
  })

plantsRouter
  .route('/:plant_id/add-order/')
  .all(requireAuth)
  .all(checkPlantExists)
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const {plant_id, maintenance_needed, frequency, details} = req.body
    const newOrder = {plant_id, maintenance_needed, frequency, details}

    for (const [key, value] of Object.entries(newOrder))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    newOrder.user_id = req.user.id

    PlantsService.insertOrder(
      req.app.get('db'),
      newOrder
    )
      .then(order => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${order.plant_id}`))
          .json(PlantsService.serializePlantOrder(order))
      })
      .catch(next)
    })

  plantsRouter
  .route('/:plant_id')
  .all(requireAuth)
  .all(checkPlantExists)
  .patch(requireAuth, jsonBodyParser, (req, res, next) => {
    const {scientific_name, growth_rate, growth_period, shade_tolerance, precipitation_maximum, precipitation_minimum, family_common_name, drought_tolerance, frost_free_days_minimum, moisture_use} = req.body
    const plantToUpdate = {scientific_name, growth_rate, growth_period, shade_tolerance, precipitation_maximum, precipitation_minimum, family_common_name, drought_tolerance, frost_free_days_minimum, moisture_use}

    const numberOfValues = Object.values(plantToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
      logger.error(`Invalid update without required fields`)
      return res.status(400).json({
        error: {
          message: `Request body must contain at least one field to update.`
        }
      })
    }

    PlantsService.updatePlant(
      req.app.get('db'),
      req.params.plant_id,
      plantToUpdate
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
    })

  plantsRouter
  .route('/:plant_id/orders/:order_id')
  .all(requireAuth)
  .all(checkOrderExists)
  .get((req, res, next) => {
    PlantsService.getOrderById(
      req.app.get('db'),
      req.params.order_id
    )
      .then(orders => {
        res.json(orders.map(PlantsService.serializePlantOrder))
      })
      .catch(next)
  })

  plantsRouter
  .route('/:plant_id/orders/:order_id')
  .all(requireAuth)
  .all(checkOrderExists)
  .delete((req, res, next) => {
    PlantsService.deleteOrder(
      req.app.get('db'),
      req.params.order_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

//Confirm that plants and orders exist before they are acted upon
async function checkPlantExists(req, res, next) {
  try {
    const plant = await PlantsService.getById(
      req.app.get('db'),
      req.params.plant_id
    )

    if (!plant)
      return res.status(404).json({
        error: `Plant doesn't exist`
      })

    res.plant = plant
    next()
  } catch (error) {
    next(error)
  }
}

async function checkOrderExists(req, res, next) {
  try {
    const order = await PlantsService.getOrderById(
      req.app.get('db'),
      req.params.order_id
    )

    if (!order)
      return res.status(404).json({
        error: `Order doesn't exist`
      })

    res.order = order
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = plantsRouter
