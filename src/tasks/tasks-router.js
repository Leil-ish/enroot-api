const express = require('express')
const TasksService = require('./tasks-service')
const { requireAuth } = require('../middleware/jwt-auth')
const tasksRouter = express.Router()

tasksRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    TasksService.getAllTasks(req.app.get('db'))
      .then(tasks => {
        res.json(tasks.map(TasksService.serializeTask))
      })
      .catch(next)
  })

module.exports = tasksRouter
