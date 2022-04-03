const express = require('express');
const route = express.Router()
const homeController = require('./controllers/homeController')

route
    .get('/', homeController.index)
    .post('/', homeController.handlePost)

route
    .get('/contato', (req, res, next) => {
        res.send('Hey')
    })
    

module.exports = route
