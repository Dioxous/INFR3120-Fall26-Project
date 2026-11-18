const mongoose = require('mongoose');

let bugModel = mongoose.Schema({
    appName: String,
    severity: String,
    title: String,
    description: String,
    reproduction: String
},
{
    Collection: 'bugs'
});

module.exports = mongoose.model('Bug', bugModel);