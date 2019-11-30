const xss = require('xss')

const PlantsService = {
  getAllPlants(db) {
    return db
      .from('enroot_plants AS enroot_plant')
      .select(
        'enroot_plant.id',
        'enroot_plant.scientific_name',
        'enroot_plant.common_name',
        'enroot_plant.lifespan',
        'enroot_plant.growth_rate',
        'enroot_plant.growth_period',
        'enroot_plant.temperature_minimum',
        'enroot_plant.shade_tolerance',
        'enroot_plant.precipitation_minimum',
        'enroot_plant.precipitation_maximum',
        'enroot_plant.resprout_ability',
        'enroot_plant.family_common_name',
        'enroot_plant.duration',
        'enroot_plant.drought_tolerance',
        'enroot_plant.frost_free_days_minimum',
        'enroot_plant.moisture_use',
        'enroot_plant.user_id',
        'enroot_plant.seedling_vigor',
        'enroot_plant.flower_color',
        'enroot_plant.foliage_color',
        )
        .groupBy('enroot_plant.id')
      },
  
    getById(db, id) {
      return PlantsService.getAllPlants(db)
        .where('enroot_plant.id', id)
        .first()
    },

    getOrderById(db, id) {
      return db
      .from('enroot_orders AS enroot_order')
      .select(
        'enroot_order.id',
        'enroot_order.maintenance_needed',
        'enroot_order.frequency',
        'enroot_order.details',
      )
      .where('enroot_order.id', id)
    },
  
    //Handing some orders stuff here because they're connected to particular plant IDs
    getOrdersForPlant(db, plant_id) {
      return db
        .from('enroot_orders AS enroot_order')
        .select(
            'enroot_order.id',
            'enroot_order.maintenance_needed',
            'enroot_order.frequency',
            'enroot_order.details',
        )
        .where('enroot_order.plant_id', plant_id)
        .groupBy('enroot_order.id')
    },

    deleteOrder(db, id) {
      return db
      .from('enroot_orders AS enroot_order')
      .select(
        'enroot_order.id',
      )
      .where('enroot_order.id', id)
      .delete()
    },

    deletePlant(db, id) {
      return db
      .from('enroot_plants AS enroot_plant')
      .select(
        'enroot_plant.id',
        )
      .where('enroot_plant.id', id)
      .delete()
    },

    insertOrder(db, newOrder) {
      return db
        .insert(newOrder)
        .into('enroot_orders')
        .returning('*')
        .then(([order]) => order)
        .then(order =>
          PlantsService.getOrderById(db, order.plant_id)
        )
    },

    insertPlant(db, newPlant) {
      return db
        .insert(newPlant)
        .into('enroot_plants')
        .returning('*')
        .then(([plant]) => plant)
        .then(plant =>
          PlantsService.getById(db, plant.id)
        )
    },

    updatePlant(db, id, newPlantFields) {
      return db
      .from('enroot_plants AS enroot_plant')
      .select(
        'enroot_plant.id',
        )
      .where('enroot_plant.id', id)
      .update(newPlantFields)
    },

    serializePlant(plant) {
      return {
        id: plant.id,
        scientific_name: xss(plant.scientific_name),
        common_name: xss(plant.common_name),
        lifespan: xss(plant.lifespan),
        growth_rate: xss(plant.growth_rate),
        growth_period: xss(plant.growth_period), 
        temperature_minimum: plant.temperature_minimum,
        shade_tolerance: xss(plant.shade_tolerance),
        precipitation_minimum: plant.precipitation_minimum,
        precipitation_maximum: plant.precipitation_maximum,
        resprout_ability: xss(plant.resprout_ability),
        family_common_name: xss(plant.family_common_name),
        duration: xss(plant.duration),
        drought_tolerance: xss(plant.drought_tolerance),
        frost_free_days_minimum: plant.frost_free_days_minimum,
        moisture_use: xss(plant.moisture_use),
        user_id: plant.user_id,
        seedling_vigor: xss(plant.seedling_vigor),
        flower_color: xss(plant.flower_color),
        foliage_color: xss(plant.foliage_color),
      }
    },
  
    serializePlantOrder(order) {
      return {
        order_id: order.id,
        plant_id: order.plant_id,
        user_id: order.user_id,
        maintenance_needed: order.maintenance_needed,
        modified: new Date(order.modified),
        frequency: order.frequency,
        details: xss(order.content),
      }
    },
  }
  
  module.exports = PlantsService