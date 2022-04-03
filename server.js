const express = require('express');
const app = express();
const routes = require('./router');
const path = require('path');
const { global } = require('./middlewares/globals')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Connected to MongoDB')
        app.emit('start')
    })
    .catch(err => { console.log(err) })

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')))

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.on('start', () => {
    app.listen(3000, () => {
        console.log('listening on http://localhost:3000')
    })
})
app.use(global)
app.use(routes)