require ('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV} = require('./config')
const plantsRouter = require('./plants/plants-router')
const tasksRouter = require('./tasks/tasks-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test',
  }))

app.use(cors())

app.use(helmet())

app.use(express.urlencoded({ extended: true }));

app.use('/api/tasks', tasksRouter)
app.use('/api/garden', plantsRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = {error: {message: 'server error'}}
    } else {
        console.error(error)
        response = {message: error.message, error}
    }
    res.status(500).json(response)
})

module.exports = app