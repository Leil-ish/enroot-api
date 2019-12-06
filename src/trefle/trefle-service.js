const TrefleService = {
  getAllApiPlants(requestToApi) {
    return requestToApi
      .from('api as api_plants')
      .select(
        'api_plants.id',
        'api_plants.scientific_name',
        'api_plants.common_name',
        'api_plants.lifespan',
        'api_plants.growth_rate',
        'api_plants.growth_period',
        'api_plants.temperature_minimum',
        'api_plants.shade_tolerance',
        'api_plants.precipitation_minimum',
        'api_plants.precipitation_maximum',
        'api_plants.resprout_ability',
        'api_plants.family_common_name',
        'api_plants.duration',
        'api_plants.drought_tolerance',
        'api_plants.frost_free_days_minimum',
        'api_plants.moisture_use',
        'api_plants.user_id',
        'api_plants.seedling_vigor',
        'api_plants.flower_color',
        'api_plants.foliage_color',
        'api_plants.user_id',
        )
        .groupBy('api_plants.id')
      },

    getById(requestToApi, id) {
        return ApiService.getAllApiPlants(requestToApi)
          .where('api_plants.id', id)
          .first()
      },

      serializeApiPlant(api_plant) {
        return {
          id: api_plant.id,
          scientific_name: xss(api_plant.scientific_name),
          common_name: xss(api_plant.common_name),
          lifespan: xss(api_plant.lifespan),
          growth_rate: xss(api_plant.growth_rate),
          growth_period: xss(api_plant.growth_period), 
          temperature_minimum: api_plant.temperature_minimum,
          shade_tolerance: xss(api_plant.shade_tolerance),
          precipitation_minimum: api_plant.precipitation_minimum,
          precipitation_maximum: api_plant.precipitation_maximum,
          resprout_ability: xss(api_plant.resprout_ability),
          family_common_name: xss(api_plant.family_common_name),
          duration: xss(api_plant.duration),
          drought_tolerance: xss(api_plant.drought_tolerance),
          frost_free_days_minimum: api_plant.frost_free_days_minimum,
          moisture_use: xss(api_plant.moisture_use),
          user_id: api_plant.user_id,
          seedling_vigor: xss(api_plant.seedling_vigor),
          flower_color: xss(api_plant.flower_color),
          foliage_color: xss(api_plant.foliage_color),
        }
      },
}

module.exports = TrefleService