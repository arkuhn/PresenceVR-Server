var db = require('../../database')
var mongoose = require('mongoose')

var InterviewSchema = new mongoose.Schema({
    host: String,
    details: String,
    occursOnDate: String,
    occursAtTime: String,
    scheduledOnDate: String,
    participants: [String],
    loadedAssets: [String],
    hostCamInVR: Boolean,
    loadedEnvironment: String
}, {
    timestamps: true
});

module.exports = db.model('Interview', InterviewSchema, 'interviews');