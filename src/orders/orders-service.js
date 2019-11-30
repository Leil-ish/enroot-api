const xss = require('xss')

const OrdersService = {

  getAllOrders(db) {
    return db
    .from('enroot_orders AS bib_order')
    .select(
      'bib_order.id',
      'bib_order.plant_id',
      'bib_order.user_id',
      'bib_order.maintenance_needed',
      'bib_order.modified',
      'bib_order.details',
    )
    .groupBy('bib_order.id')
  },

  getOrderById(db, id) {
    return db
    .from('enroot_orders AS bib_order')
    .select(
      'bib_order.id',
      'bib_order.maintenance_needed',
      'bib_order.modified',
      'bib_order.details',
    )
    .where('bib_order.id', id)
  },

  serializeOrder(order) {
    return {
      id: order.id,
      plant_id: order.plant_id,
      user_id: order.user_id,
      maintenance_needed: xss(order.maintenance_needed),
      details: xss(order.details),
      modified: new Date(order.modified),
    }
  }
}

module.exports = OrdersService