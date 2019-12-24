const express = require('express')
const path = require('path')
const PlantsService = require('./plants-service')
// const TrefleService = require('../trefle/trefle-service')
const {requireAuth} = require('../middleware/jwt-auth')
const jsonBodyParser = express.json()
const plantsRouter = express.Router()
const fetch =  require('node-fetch') 


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
        moisture_use, user_id, seedling_vigor, flower_color, foliage_color} = req.body
    const newPlant = {scientific_name, common_name, lifespan, growth_rate, growth_period, 
        temperature_minimum, shade_tolerance, precipitation_minimum, precipitation_maximum, 
        resprout_ability, family_common_name, duration, drought_tolerance, frost_free_days_minimum, 
        moisture_use, user_id, seedling_vigor, flower_color, foliage_color}

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
    
let searchTerm;

plantsRouter
    .route('/trefle')
    .get(requireAuth, (req, res, next) => {
      const baseUrl = 'https://trefle.io/api/species?common_name=';	
      const token = `&token=${process.env.BEARER_TOKEN}`;

      const userSearch = (baseUrl, token, searchTerm) => {

      let newUrl = baseUrl + searchTerm + token;
      return newUrl;
      };	

      const apiUrl = userSearch(baseUrl, token, searchTerm);

      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          res.send({ data });
        })
        .catch(next)
    })

plantsRouter
    .route('/find-plant')
    .post(requireAuth, (req, res) => {
      searchTerm = req.body.searchTerm;
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
      const {common_name} = req.body
      const newPlant = {common_name}
  
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
  .route('/:plant_id/tasks/')
  .all(requireAuth)
  .all(checkPlantExists)
  .get((req, res, next) => {
    PlantsService.getTasksForPlant(
      req.app.get('db'),
      req.params.plant_id
    )
      .then(tasks => {
        res.json(tasks.map(PlantsService.serializePlantTask))
      })
      .catch(next)
  })

plantsRouter
  .route('/:plant_id/add-task/')
  .all(requireAuth)
  .all(checkPlantExists)
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const {plant_id, maintenance_needed, frequency, details} = req.body
    const newTask = {plant_id, maintenance_needed, frequency, details}

    for (const [key, value] of Object.entries(newTask))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    newTask.user_id = req.user.id

    PlantsService.insertTask(
      req.app.get('db'),
      newTask
    )
      .then(task => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${task.plant_id}`))
          .json(PlantsService.serializePlantTask(task))
      })
      .catch(next)
    })

  plantsRouter
  .route('/:plant_id')
  .all(requireAuth)
  .all(checkPlantExists)
  .patch(requireAuth, jsonBodyParser, (req, res, next) => {
    const {plantId, scientific_name, lifespan, growth_rate, growth_period, 
      temperature_minimum, shade_tolerance, precipitation_minimum, precipitation_maximum, 
      resprout_ability, family_common_name, duration, drought_tolerance, frost_free_days_minimum, 
      moisture_use, seedling_vigor, flower_color, foliage_color} = req.body
    const plantToUpdate = {plantId, scientific_name, lifespan, growth_rate, growth_period, 
      temperature_minimum, shade_tolerance, precipitation_minimum, precipitation_maximum, 
      resprout_ability, family_common_name, duration, drought_tolerance, frost_free_days_minimum, 
      moisture_use, seedling_vigor, flower_color, foliage_color}

    const numberOfValues = Object.values(plantToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
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
  .route('/:plant_id/tasks/:task_id')
  .all(requireAuth)
  .all(checkTaskExists)
  .get((req, res, next) => {
    PlantsService.getTaskById(
      req.app.get('db'),
      req.params.task_id
    )
      .then(tasks => {
        res.json(tasks.map(PlantsService.serializePlantTask))
      })
      .catch(next)
  })

  plantsRouter
  .route('/:plant_id/tasks/:task_id')
  .all(requireAuth)
  .all(checkTaskExists)
  .delete((req, res, next) => {
    PlantsService.deleteTask(
      req.app.get('db'),
      req.params.task_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

//Confirm that plants and tasks exist before they are acted upon
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

async function checkTaskExists(req, res, next) {
  try {
    const task = await PlantsService.getTaskById(
      req.app.get('db'),
      req.params.task_id
    )

    if (!task)
      return res.status(404).json({
        error: `Task doesn't exist`
      })

    res.task = task
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = plantsRouter
