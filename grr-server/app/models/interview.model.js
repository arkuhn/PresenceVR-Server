var mongoose = require('mongoose');

var InterviewSchema = mongoose.Schema({
    host: String,
    subject: String,
    occursOnDate: String,
    occursAtTime: String,
    scheduledOnDate: String,
    participants: [String],
    loadedAssets: [String],
    loadedEnvironments: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Interview', InterviewSchema);