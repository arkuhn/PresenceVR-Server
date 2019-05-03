var db = require('../../database');
var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
    name: String,
    vrMode: Boolean,
    currentBackground: String,
    currentAsset: String,
    backgroundImages: [String],
    assetImages: [String]
}, {
    timestamps: true
});

module.exports = db.model('Room', RoomSchema, 'rooms');