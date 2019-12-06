const express = require('express')
const {requireAuth} = require('../middleware/jwt-auth')
const trefleRouter = express.Router()
const request =  require('request') 
const fetch = require('node-fetch');

module.exports = (trefleRouter) => {

	let searchTerm;


    trefleRouter
        .route('/')
        .get((req, res, next) => {
            const baseUrl = 'https://trefle.io/api/species?common_name=';	
            const token = `&token=${process.env.BEARER_TOKEN}`;

            const userSearch = (baseUrl, token, searchTerm) => {

            let newUrl = baseUrl + searchTerm + token;
            return newUrl;
            };	

            const apiUrl = userSearch(baseUrl, token, searchTerm);


		fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                res.send({ data });
            })
            .catch(err => {
                res.redirect('/error');
            });
	})

}

// https://trefle.io/api/species?common_name=dogwood&token=${process.env.BEARER_TOKEN}