const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    email: {type: 'string', required: true},
    password: {type: 'string', required: true}
})

const HomeModel = mongoose.model('Logins', HomeSchema)

module.exports = HomeModel