var Interview = require('../models/interview.model.js');
var firebase  = require('../../firebase')
var Upload = require('../models/upload.model.js');
var utils = require('../utils')
var errors = require('../utils/errors')

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

function validateAssetExists(assetId, callback) {
    let exists = null;

    // Use axios to check if it exists in the database
    Upload.findOne({'_id': assetId}, function(err, upload) {

        exists = true;  

        if(err || !upload) {
            //No Asset found
            console.error("Asset (" + assetId + ") does not exist in database.");
            exists = false;
        }
        else {
            // Asset exists in database -> Add to filtered array
            let path = './uploads/' + upload.fullpath;
            if (!fs.existsSync(path)) {
                console.error("Asset (" + assetId + ") does not exist in database.");
                esists = false;
            } 
        }

        callback(exists, assetId);
    });
}

function filterLoadedAssets(loadedAssets, interviewID, callback) {
    console.log("Filtering Assets of Interview (" + interviewID + "):");

    // Check if list is empty
    if(loadedAssets.length == 0) {
        console.log("\tNothing to be done.");
        callback(false, []);
    }

    let filteredAssets = [];
    let modified = false;   // Track if we had to update anything and pass that on
    let curr = null;
    let callback_count = loadedAssets.length;    // Number of callbacks returned


    for (var i = loadedAssets.length - 1; i >= 0; i--) {
        curr = loadedAssets[i];

        // Remove if duplicate
        if(filteredAssets.includes(curr)) {
            console.log("\tRemoving Asset (" + assetId + ")");
            modified = true;
            continue;
        }

        // Check if Asset exists
        validateAssetExists(curr, (exists, assetId) => {
            if(exists) {
                console.log("\tKeeping Asset (" + assetId + ")");
                filteredAssets.push(assetId);
            }
            else {
                console.log("\tRemoving Asset (" + assetId + ")");
                modified = true;
            }
            callback_count--;
            if(callback_count <= 0){
                callback(modified, filteredAssets);
            }
            return;
        });

        continue;
    }
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
            
            // Filter loadedAssets and update if modified
            filterLoadedAssets(interview.loadedAssets, interview._id, (modified, filteredAssets) => {
                if(modified) {
                    interview.loadedAssets = filteredAssets;
                    Interview.findByIdAndUpdate({'_id': req.params.id}, interview, function(err, interview){
                        if (err) { return utils.handleMongoErrors(err, res) }
                        else {
                            console.log('Interview updated with filtered Assets.')
                            res.send(interview);
                        }
                    });
                }
                else {
                    res.send(interview);
                }
            });
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

exports.patchParticipants = function(req, res) {
    utils.authenticateRequest(req)
    .then((email) => {
        return userIsHost(req.params.id, email)
    })
    .then((email) => {
        Interview.findOne({'_id': req.params.id}, function(err, interview) {
            if (err) { return utils.handleMongoErrors(err, res) }
            else {
                interview.participants = interview.participants.filter(part => part != email);
                Interview.findByIdAndUpdate({'_id': req.params.id}, interview, function(err, interview){
                    if (err) { return utils.handleMongoErrors(err, res) }
                    else {
                        console.log('Interview' + req.params.id + 'updated')
                        res.send(interview);
                    }
                });
            }
        });
    })
    .catch((err) => {
        utils.handleErrors(err, res)
    })  
};


exports.patchAssets = function(req, res) {
    utils.authenticateRequest(req)
    .then((email) => {
        return userIsHost(req.params.id, email)
    })
    .then(() => {
        Interview.findOne({'_id': req.params.id}, function(err, interview) {
            if (err) { return utils.handleMongoErrors(err, res) }
            else if(interview) {
                // Remove if asset is already loaded, otherwise add asset to list
                if(interview.loadedAssets.includes(req.params.assetId)) {
                    console.log("Removing asset with id (" + req.params.assetId + ") from interview with id (" + req.params.id + ")");
                    interview.loadedAssets = interview.loadedAssets.filter((value, index, arr) => {
                        return (value != req.params.assetId);
                    });
                }
                else {
                    console.log("Adding asset with id (" + req.params.assetId + ") to interview with id (" + req.params.id + ")");
                    interview.loadedAssets.push(req.params.assetId);
                }
                Interview.findByIdAndUpdate({'_id': req.params.id}, interview, function(err, interview){
                    if (err) { return utils.handleMongoErrors(err, res) }
                    else {
                        console.log('Interview updated')
                        res.send(interview);
                    }
                });
            }
            else {
                console.log("No interview found with id: " + re.params.id);
                return res.status(404).send({message: "Interview not found with id " + req.params.id});
            }
        });
    })
    .catch((err) => {
        utils.handleErrors(err, res)
    })  
};