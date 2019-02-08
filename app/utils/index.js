
var firebase  = require('../../firebase')
var Interview = require('../models/interview.model.js');
var Upload = require('../models/upload.model.js');
var errors = require('./errors')

exports.authenticateRequest = function(req) {
    return firebase.authenticateToken(req.headers.authorization).then(({ email }) => {
        if ( email ) {
            return email
        }
        console.warn('Request could not be authenticated')
        throw errors.badAuth()
    }).catch((err) => {
        console.error(err)
        throw errors.badAuth()
    })
}

/*
Takes an optional description for uncaught errors
*/
exports.handleErrors = function(err, res) {
    if (err.code && err.description) {
        return res.status(err.code).send(err.description)
    }
    
    return res.status(500).send()
}

exports.handleMongoErrors = function(err, res) {
    if (err.kind === 'ObjectId') {
        res.status(404).send('Resource not found')
    } else {
        res.status(500).send('Mongo error')
    }
}
