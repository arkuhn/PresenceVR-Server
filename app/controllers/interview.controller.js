var Interview = require('../models/interview.model.js');
var utils = require('../utils')
var errors = require('../utils/errors')
var uploadUtils = require('../utils/uploadUtils');


function userIsHost(id, email) {
    var query = Interview.findOne({'_id': id}).exec()
    return query.then((interview) => {
        if (!interview) { throw errors.notFound() }
        if (interview.host === email ) {
            return true
        }
        console.warn('User is not host')
        throw errors.badAuth()
    })
}


function leavingInterview(id, email, newData) {
    console.log("Checking if leaving Interview:")
    Interview.findOne({'_id': id}, function(err, interview) {
        console.log(email)
        let reconstructedInterview = newData;
        reconstructedInterview.participants.push(email);
        return isEquivalent(interview, reconstructedInterview);
    })
    return false;
}


function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

exports.create = function(req, res) {
    utils.authenticateRequest(req)
    .then((email) => {
        let participants = (req.body.data.participants).split(',')
        if (participants.length === 1 && participants[0] === '') {
            participants = []
        }
        var interview = new Interview({
            host: email,
            details: req.body.data.details,
            occursOnDate: req.body.data.occursOnDate,
            occursAtTime: req.body.data.occursAtTime,
            scheduledOnDate: new Date().toLocaleDateString("en-US"),
            participants: participants,
            loadedAssets: [],
            loadedEnvironment: 'default'
            
        });
        interview.save(function(err, data) {
            if (err) { return utils.handleMongoErrors(err, res) }
            else {
                console.log('Interview saved')
                res.send(data);
            }
        });
    })
    .catch((err) => {
        utils.handleErrors(err, res)
    })
};

exports.delete = function(req, res) {
    utils.authenticateRequest(req)
    .then((email) => {
        return userIsHost(req.headers.id, email)
    })
    .then(() => {
        Interview.findOneAndDelete({'_id': req.headers.id}, function(err, interview) { 
            if (err) { return utils.handleMongoErrors(err, res) }
            console.log('Interview deleted');
            res.send(interview);
        })
    })
    .catch((err) => {
        utils.handleErrors(err, res)
    })   
};

exports.update = function(req, res) {
    utils.authenticateRequest(req)
    .then((email) => {
        return userIsHost(req.params.id, email)
    })
    .then(() => {
        var payload = req.body.data

        //Handle the special case of participants
        if (payload.participants) {
            if (payload.participants.length === 1 && payload.participants[0] === '') {
                payload.participants = []
            }   
            payload.participants = payload.participants.split(',')
        }

        //Update multiple fields at once
        if (Object.keys(req.body.data).length > 1){
            payload = { $set: req.body.data }
        }
        return payload
    }).then((payload) => {
        Interview.findOneAndUpdate({'_id': req.params.id}, payload, function(err, interview) { 
            if (err) { return utils.handleMongoErrors(err, res) }
            console.log('Interview updated')
            res.send(interview);
        })
    })
    .catch((err) => {
        console.error(err)
        utils.handleErrors(err, res)
    })  
};

exports.findOne = function(req, res) {
    utils.authenticateRequest(req)
    .then(() => {
        return Interview.findOne({'_id': req.params.id}, function(err, interview) {
            if (err) { return utils.handleMongoErrors(err, res) }
    
            if(!interview) {
                return res.status(404).send({message: "Room not found with id " + req.params.id});
            }
            
            res.send(interview);
        });
    })
    .catch((err) => {
        utils.handleErrors(err, res)
    })  

    
};

exports.findAll = function(req, res) {
    utils.authenticateRequest(req)
    .then((email) => {
        Interview.find({$or: [{'host': email}, {'participants': email}]}, function(err, interviews){
            if (err) { return utils.handleMongoErrors(err, res) }
            else if(!interviews) {
                return res.status(404)
            }
            else {
                console.log('Sending all inteviews for ' + email)
                return res.send(interviews);
            }
        });
    })
    .catch((err) => {
        utils.handleErrors(err, res)
    })  
};

exports.patch = function(req, res) { 
    utils.authenticateRequest(req)
    .then((email) => {
        Interview.find({$or: [{'host': email}, {'participants': email}], $and: [{'_id': req.params.id}] }, function(err, interviews){
            if (err) { return utils.handleMongoErrors(err, res) }
            if (interviews && interviews[0]) {
                var interview = interviews[0]
                var isHost = (interview.host === email)
                var isParticipant = (interview.participants.includes(email))

                var isRenderOperation = (req.body.field === 'loadedAssets' && (req.body.op === 'remove' || req.body.op === 'add'))
                var isLeaveOperation = (req.body.field==='participants' && req.body.op === 'remove')
                if (!isHost && !isParticipant) {
                    return res.status(403).send({message: 'Unauthorized interview update'})
                }
                if (isParticipant && !isRenderOperation && !isLeaveOperation) {
                    return res.status(403).send({message: 'Unauthorized interview update'})
                }

                if (req.body.op === 'add') {
                    interview[req.body.field].push(req.body.value)
                }
                if (req.body.op === 'remove') {
                    var index = interview[req.body.field].indexOf(req.body.value)
                    if (index === -1) {
                        return res.status(404).send({message: 'Cannot remove element that does not exist'})
                    }
                    interview[req.body.field].splice(index, 1)
                }

                return Interview.findByIdAndUpdate({'_id': req.params.id}, interview, function(err, newInterview){
                    if (err) { return utils.handleMongoErrors(err, res) }
                    else {
                        console.log('Interview patched')
                        return res.send(interview);
                    }
                });

            }
            return res.status(500).send({message: 'User not host or participant of any such interview'})
        })
    })
}