//database configs
var dbConfig = require('./configs/database.config.js');
var mongoose = require('mongoose');

//database setup
mongoose.connect(dbConfig.url, {});

var db = mongoose.connection;

db.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

db.once('open', function() {
    console.log("Successfully connected to the database");
});

module.exports = db;