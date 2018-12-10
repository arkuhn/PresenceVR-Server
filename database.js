//database configs
const { databaseConfig } = require('./configs');
var mongoose = require('mongoose');

//database setup
mongoose.connect(databaseConfig.url, {});

var db = mongoose.connection;

db.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

db.once('open', function() {
    console.log("Successfully connected to the database");
});

module.exports = db;