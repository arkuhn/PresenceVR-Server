var mongoose = require('mongoose');

var RoomSchema = mongoose.Schema({
    name: String,
    vrMode: Boolean,
    currentBackground: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', RoomSchema);