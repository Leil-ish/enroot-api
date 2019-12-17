const xss = require('xss')

const OrdersService = {

  getAllOrders(db) {
    return db
    .from('enroot_orders AS enroot_order')
    .select(
      'enroot_order.id',
      'enroot_order.plant_id',
      'enroot_order.user_id',
      'enroot_order.maintenance_needed',
      'enroot_order.frequency',
      'enroot_order.modified',
      'enroot_order.details',
    )
    .groupBy('enroot_order.id')
  },

  getOrderById(db, id) {
    return db
    .from('enroot_orders AS enroot_order')
    .select(
      'enroot_order.id',
      'enroot_order.maintenance_needed',
      'enroot_order.modified',
      'enroot_order.frequency',
      'enroot_order.details',
    )
    .where('enroot_order.id', id)
  },

  serializeOrder(order) {
    return {
      id: order.id,
      plant_id: order.plant_id,
      user_id: order.user_id,
      maintenance_needed: xss(order.maintenance_needed),
      frequency: order.frequency,
      details: xss(order.details),
      modified: new Date(order.modified),
    }
  }
}

module.exports = OrdersService