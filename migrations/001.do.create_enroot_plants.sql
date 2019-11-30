CREATE TABLE enroot_plants (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    scientific_name TEXT,
    common_name TEXT NOT NULL,
    lifespan TEXT,
    growth_rate TEXT,
    growth_period TEXT,
    temperature_minimum FLOAT,
    shade_tolerance TEXT,
    precipitation_minimum FLOAT,
    precipitation_maximum FLOAT,
    resprout_ability TEXT,
    family_common_name TEXT,
    duration TEXT,
    drought_tolerance TEXT,
    frost_free_days_minimum FLOAT,
    moisture_use TEXT
    seedling_vigor TEXT
    flower_color TEXT
    foliage_color TEXT
);