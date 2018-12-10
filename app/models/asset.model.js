var db = require('../../database')
var mongoose = require('mongoose')

var AssetSchema = new mongoose.Schema({
    name: String,
    uploadedOnDate: String,
    owner: String,
    type: String
}, {
    timestamps: true
});

module.exports = db.model('Asset', AssetSchema, 'assets');