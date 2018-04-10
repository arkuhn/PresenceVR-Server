var mongoose = require('mongoose');

var RoomSchema = mongoose.Schema({
    name: String,
    vrMode: Boolean,
    currentBackground: String,
    currentAsset: String,
    backgroundImages: [String],
    assetImages: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', RoomSchema);