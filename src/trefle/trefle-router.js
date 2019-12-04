const express = require('express')
const {requireAuth} = require('../middleware/jwt-auth')
const trefleRouter = express.Router()
const request =  require('request') 

trefleRouter
    .route('/')
    .all(requireAuth)
    request.get(`https://trefle.io/api/species?common_name=dogwood&token=${process.env.BEARER_TOKEN}`, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        console.dir(JSON.parse(body));
    })

module.exports = trefleRouter
