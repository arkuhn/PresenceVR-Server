var db = require('../../database')
var mongoose = require('mongoose')

var UploadSchema = new mongoose.Schema({
    name: String,
    owner: String,
    type: String,
    filetype: String
}, {
    timestamps: true
});

module.exports = db.model('Upload', UploadSchema, 'uploads');