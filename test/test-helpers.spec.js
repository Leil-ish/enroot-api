const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
      {
        id: 1,
        first_name: 'Test-1',
        last_name: 'User-1',
        username: 'TU1',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        date_modified: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        id: 2,
        first_name: 'Test-2',
        last_name: 'User-2',
        username: 'TU2',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        date_modified: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        id: 3,
        first_name: 'Test-3',
        last_name: 'User-3',
        username: 'TU3',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        date_modified: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        id: 4,
        first_name: 'Test-4',
        last_name: 'User-4',
        username: 'TU4',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        date_modified: new Date('2029-01-22T16:28:32.615Z'),
      },
  ]
}

function makePlantsArray(users) {
  return [
        {"id":1,"scientific name":"Lyonia ferruginea (Walter) Nutt.","common_name":"Rusty Staggerbush","lifespan":"quam","growth_rate":"rutrum","growth_period":"praesent blandit","temperature_minimum":11,"shade_tolerance":"metus","precipitation_minimum":1,"precipitation_maximum":34,"resprout_ability":"blandit nam","family_common_name":"fermentum","durations":"iaculis","drought_tolerance":"ac","frost_free_days_minimum":187,"moisture_use":"varius","user_id":2},
        {"id":2,"scientific name":"Asclepias involucrata Engelm. ex Torr.","common_name":"Dwarf Milkweed","lifespan":"augue","growth_rate":"aliquam","growth_period":"et","temperature_minimum":37,"shade_tolerance":"molestie sed","precipitation_minimum":3,"precipitation_maximum":49,"resprout_ability":"massa","family_common_name":"vulputate justo","durations":"eu","drought_tolerance":"magna vulputate","frost_free_days_minimum":282,"moisture_use":"volutpat dui","user_id":1},
        {"id":3,"scientific name":"Cardamine californica (Nutt.) Greene var. cardiophylla (Greene) Rollins","common_name":"Milkmaids","lifespan":"sem praesent","growth_rate":"nulla","growth_period":"quisque","temperature_minimum":1,"shade_tolerance":"sed","precipitation_minimum":4,"precipitation_maximum":40,"resprout_ability":"vel","family_common_name":"luctus et","durations":"et","drought_tolerance":"donec","frost_free_days_minimum":209,"moisture_use":"convallis duis","user_id":2},
        {"id":4,"scientific name":"Callistemon phoeniceus Lindl.","common_name":"Lesser Bottlebrush","lifespan":"vivamus tortor","growth_rate":"sed magna","growth_period":"primis","temperature_minimum":35,"shade_tolerance":"viverra","precipitation_minimum":2,"precipitation_maximum":17,"resprout_ability":"curabitur","family_common_name":"vestibulum","durations":"rhoncus sed","drought_tolerance":"aliquam erat","frost_free_days_minimum":306,"moisture_use":"ante","user_id":1},
        {"id":5,"scientific name":"Opuntia polyacantha Haw. var. nicholii (L.D. Benson) Parfitt","common_name":"Navajo Bridge Pricklypear","lifespan":"eget","growth_rate":"magna","growth_period":"pharetra","temperature_minimum":47,"shade_tolerance":"duis bibendum","precipitation_minimum":5,"precipitation_maximum":3,"resprout_ability":"phasellus","family_common_name":"et","durations":"donec","drought_tolerance":"congue","frost_free_days_minimum":186,"moisture_use":"dictumst aliquam","user_id":2},
        {"id":6,"scientific name":"Sticta wrightii Tuck.","common_name":"Wright's Spotted Felt Lichen","lifespan":"quis tortor","growth_rate":"sapien","growth_period":"praesent","temperature_minimum":14,"shade_tolerance":"vestibulum aliquet","precipitation_minimum":3,"precipitation_maximum":14,"resprout_ability":"metus sapien","family_common_name":"elit proin","durations":"elementum","drought_tolerance":"diam in","frost_free_days_minimum":49,"moisture_use":"morbi","user_id":2},
        {"id":7,"scientific name":"Lupinus sparsiflorus Benth. ssp. mohavensis Dziekanowski & D. Dunn","common_name":"Coulter's Lupine","lifespan":"sit amet","growth_rate":"ligula","growth_period":"justo nec","temperature_minimum":7,"shade_tolerance":"duis bibendum","precipitation_minimum":3,"precipitation_maximum":23,"resprout_ability":"neque","family_common_name":"nascetur ridiculus","durations":"tellus","drought_tolerance":"aliquam","frost_free_days_minimum":39,"moisture_use":"facilisi cras","user_id":2},
        {"id":8,"scientific name":"Salsola kali L.","common_name":"Russian Thistle","lifespan":"quis libero","growth_rate":"scelerisque","growth_period":"hendrerit at","temperature_minimum":50,"shade_tolerance":"nullam","precipitation_minimum":4,"precipitation_maximum":23,"resprout_ability":"in","family_common_name":"porttitor","durations":"nisl nunc","drought_tolerance":"erat fermentum","frost_free_days_minimum":15,"moisture_use":"et ultrices","user_id":2},
        {"id":9,"scientific name":"Aristida purpurascens Poir. var. tenuispica (Hitchc.) Allred","common_name":"Arrowfeather Threeawn","lifespan":"sapien","growth_rate":"duis consequat","growth_period":"parturient","temperature_minimum":2,"shade_tolerance":"id pretium","precipitation_minimum":4,"precipitation_maximum":10,"resprout_ability":"ultrices","family_common_name":"nec nisi","durations":"placerat praesent","drought_tolerance":"nonummy","frost_free_days_minimum":197,"moisture_use":"primis in","user_id":1},
        {"id":10,"scientific name":"Trichomanes padronii Proctor","common_name":"Padron's Bristle Fern","lifespan":"accumsan","growth_rate":"nulla elit","growth_period":"risus dapibus","temperature_minimum":45,"shade_tolerance":"non","precipitation_minimum":1,"precipitation_maximum":31,"resprout_ability":"nec","family_common_name":"neque vestibulum","durations":"maecenas","drought_tolerance":"nonummy integer","frost_free_days_minimum":206,"moisture_use":"bibendum morbi","user_id":1},
        {"id":11,"scientific name":"Styphnolobium Schott","common_name":"Necklacepod","lifespan":"erat","growth_rate":"eros viverra","growth_period":"faucibus","temperature_minimum":12,"shade_tolerance":"nisi","precipitation_minimum":4,"precipitation_maximum":9,"resprout_ability":"sem sed","family_common_name":"nisi","durations":"vel","drought_tolerance":"eu est","frost_free_days_minimum":16,"moisture_use":"porta","user_id":1},
        {"id":12,"scientific name":"Betula ×eastwoodiae Sarg. (pro sp.)","common_name":"Birch","lifespan":"vel","growth_rate":"luctus et","growth_period":"risus","temperature_minimum":32,"shade_tolerance":"mauris","precipitation_minimum":3,"precipitation_maximum":11,"resprout_ability":"pede","family_common_name":"augue aliquam","durations":"tristique","drought_tolerance":"nulla","frost_free_days_minimum":162,"moisture_use":"commodo placerat","user_id":1},
        {"id":13,"scientific name":"Polygala rimulicola Steyerm.","common_name":"Steyermark's Milkwort","lifespan":"malesuada","growth_rate":"justo maecenas","growth_period":"in","temperature_minimum":13,"shade_tolerance":"at","precipitation_minimum":2,"precipitation_maximum":36,"resprout_ability":"proin interdum","family_common_name":"at lorem","durations":"mauris","drought_tolerance":"tortor","frost_free_days_minimum":352,"moisture_use":"neque","user_id":2},
        {"id":14,"scientific name":"Chamaerhodos Bunge","common_name":"Little Rose","lifespan":"viverra","growth_rate":"amet sapien","growth_period":"est quam","temperature_minimum":8,"shade_tolerance":"duis","precipitation_minimum":3,"precipitation_maximum":4,"resprout_ability":"morbi porttitor","family_common_name":"vestibulum sit","durations":"sed","drought_tolerance":"sapien placerat","frost_free_days_minimum":310,"moisture_use":"diam erat","user_id":1},
        {"id":15,"scientific name":"Populus ×jackii Sarg.","common_name":"Balm-of-gilead","lifespan":"diam","growth_rate":"id pretium","growth_period":"vulputate luctus","temperature_minimum":35,"shade_tolerance":"id","precipitation_minimum":5,"precipitation_maximum":28,"resprout_ability":"sit","family_common_name":"risus","durations":"dui","drought_tolerance":"non lectus","frost_free_days_minimum":142,"moisture_use":"tortor","user_id":1},
        {"id":16,"scientific name":"Sclerocarya Hochst.","common_name":"Sclerocarya","lifespan":"molestie nibh","growth_rate":"nullam","growth_period":"ac enim","temperature_minimum":15,"shade_tolerance":"felis","precipitation_minimum":2,"precipitation_maximum":39,"resprout_ability":"cursus vestibulum","family_common_name":"vel","durations":"eu","drought_tolerance":"maecenas","frost_free_days_minimum":290,"moisture_use":"nisi eu","user_id":1},
        {"id":17,"scientific name":"Prosthechea cochleata (L.) W.E. Higgins var. triandra (Ames) W.E. Higgins","common_name":"Clamshell Orchid","lifespan":"id","growth_rate":"posuere metus","growth_period":"sapien","temperature_minimum":39,"shade_tolerance":"convallis","precipitation_minimum":4,"precipitation_maximum":10,"resprout_ability":"at","family_common_name":"luctus rutrum","durations":"porttitor","drought_tolerance":"vestibulum ac","frost_free_days_minimum":265,"moisture_use":"vestibulum","user_id":1},
        {"id":18,"scientific name":"Viola L.","common_name":"Violet","lifespan":"bibendum","growth_rate":"lacus","growth_period":"nulla","temperature_minimum":31,"shade_tolerance":"elit proin","precipitation_minimum":3,"precipitation_maximum":25,"resprout_ability":"imperdiet","family_common_name":"dui maecenas","durations":"sagittis nam","drought_tolerance":"suspendisse","frost_free_days_minimum":125,"moisture_use":"nullam molestie","user_id":1},
        {"id":19,"scientific name":"Liriope spicata (Thunb.) Lour.","common_name":"Creeping Liriope","lifespan":"cubilia curae","growth_rate":"sed","growth_period":"porttitor pede","temperature_minimum":25,"shade_tolerance":"eget","precipitation_minimum":3,"precipitation_maximum":11,"resprout_ability":"pharetra","family_common_name":"id","durations":"odio porttitor","drought_tolerance":"praesent id","frost_free_days_minimum":174,"moisture_use":"erat quisque","user_id":2},
        {"id":20,"scientific name":"Kobresia simpliciuscula (Wahlenb.) Mack.","common_name":"Simple Bog Sedge","lifespan":"quis","growth_rate":"id lobortis","growth_period":"etiam pretium","temperature_minimum":37,"shade_tolerance":"turpis adipiscing","precipitation_minimum":1,"precipitation_maximum":41,"resprout_ability":"quam pede","family_common_name":"diam in","durations":"mi pede","drought_tolerance":"posuere","frost_free_days_minimum":233,"moisture_use":"lacus","user_id":2}
    ]
}

function makeOrdersArray(users, plants) {
  return [
        {"id":1,"plant_id":8,"user_id":2,"maintenance_needed":"pellentesque viverra pede ac diam cras pellentesque volutpat","frequency":"neque","details":"elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt"},
        {"id":2,"plant_id":10,"user_id":1,"maintenance_needed":"at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam","frequency":"eget","details":"nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum"},
        {"id":3,"plant_id":13,"user_id":2,"maintenance_needed":"luctus et ultrices posuere cubilia curae donec pharetra","frequency":"at diam nam","details":"vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus"},
        {"id":4,"plant_id":11,"user_id":1,"maintenance_needed":"libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in","frequency":"et","details":"eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa"},
        {"id":5,"plant_id":20,"user_id":2,"maintenance_needed":"nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede","frequency":"nulla justo","details":"congue etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam"},
        {"id":6,"plant_id":3,"user_id":1,"maintenance_needed":"nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper","frequency":"morbi a","details":"luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus"},
        {"id":7,"plant_id":16,"user_id":2,"maintenance_needed":"non pretium quis lectus suspendisse potenti in eleifend","frequency":"cras non velit","details":"sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam"},
        {"id":8,"plant_id":5,"user_id":1,"maintenance_needed":"penatibus et magnis dis parturient montes","frequency":"ipsum dolor sit","details":"non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci"},
        {"id":9,"plant_id":19,"user_id":2,"maintenance_needed":"dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus","frequency":"vivamus vel","details":"in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien"},
        {"id":10,"plant_id":15,"user_id":2,"maintenance_needed":"id ligula suspendisse ornare consequat lectus","frequency":"tristique in","details":"luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien"},
        {"id":11,"plant_id":6,"user_id":1,"maintenance_needed":"nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed","frequency":"aliquam","details":"tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum"},
        {"id":12,"plant_id":4,"user_id":2,"maintenance_needed":"vestibulum aliquet ultrices erat","frequency":"mattis nibh","details":"habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum"},
        {"id":13,"plant_id":5,"user_id":2,"maintenance_needed":"dolor sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut","frequency":"eget eleifend luctus","details":"tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum"},
        {"id":14,"plant_id":16,"user_id":1,"maintenance_needed":"pede posuere nonummy integer non","frequency":"nec condimentum","details":"nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa"},
        {"id":15,"plant_id":4,"user_id":2,"maintenance_needed":"nisl venenatis lacinia aenean sit amet","frequency":"convallis morbi odio","details":"justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat id mauris"},
        {"id":16,"plant_id":5,"user_id":1,"maintenance_needed":"imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem","frequency":"ipsum primis","details":"lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque"},
        {"id":17,"plant_id":6,"user_id":1,"maintenance_needed":"magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien","frequency":"nulla suscipit","details":"in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus"},
        {"id":18,"plant_id":10,"user_id":1,"maintenance_needed":"convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam","frequency":"eu","details":"integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus"},
        {"id":19,"plant_id":9,"user_id":2,"maintenance_needed":"orci nullam molestie nibh in","frequency":"aliquet","details":"suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue"},
        {"id":20,"plant_id":20,"user_id":2,"maintenance_needed":"vel enim sit amet nunc","frequency":"nulla ac enim","details":"diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi"}
    ]
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makePlantsArray,
  makeExpectedPlant,
  makeExpectedPlantOrders,
  makeMaliciousPlant,
  makeOrdersArray,

  makePlantsFixtures,
  cleanTables,
  seedPlantsTables,
  seedMaliciousPlant,
  makeAuthHeader,
  seedUsers,
}
