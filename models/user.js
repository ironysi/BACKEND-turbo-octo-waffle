
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    name: String,
    password: String   
})

module.exports = mongoose.model('User', userSchema);