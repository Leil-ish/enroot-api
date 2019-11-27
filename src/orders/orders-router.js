const express = require('express')
const path = require('path')
const OrdersService = require('./orders-service')
const { requireAuth } = require('../middleware/jwt-auth')
const ordersRouter = express.Router()
const jsonBodyParser = express.json()

ordersRouter
  .route('/')
  .get((req, res, next) => {
    OrdersService.getAllOrders(req.app.get('db'))
      .then(orders => {
        res.json(orders.map(OrdersService.serializeOrder))
      })
      .catch(next)
  })

module.exports = ordersRouter
