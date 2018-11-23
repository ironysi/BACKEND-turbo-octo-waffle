const mongoose = require('mongoose');


const accountSchema = mongoose.Schema({
    lastsync: String,
    nickName: String,
    budget: {
        userName: String,
        budgetName: String,
        accountName: String
    },
    bank: {
        nickName: String,
        bankName: String,
        accountName: String
    }
})

module.exports = mongoose.model('Account', accountSchema);