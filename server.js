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

const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')

const sessionOptions = session({
    store: new MongoStore({ mongoUrl: process.env.CONNECTION_STRING}),
    secret: '103921012312309',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true
    }

})

// const helmet = require('helmet')
// app.use(helmet())


app.use(sessionOptions)
app.use(flash())

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
