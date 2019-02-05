var Interview = require('../models/interview.model.js');
var firebase  = require('../../firebase')
var Upload = require('../models/upload.model.js');

function userIsHost(id, email) {
    Interview.findOne({'_id': id}, function(err, interview) {
        console.log("Validating Interview:")
        console.log(interview.host)
        if(interview.host != email){
            console.log("Invalid Host Email")
            return false
        }
    })
    return true;
}

function validateAssetExists(assetId, callback) {
    let exists = null;

    // Use axios to check if it exists in the database
    Upload.findOne({'_id': assetId}, function(err, upload) {
        if(err || !upload) {
            //No Asset found
            exists = false;
        }
        else {
            // Asset exists in database -> Add to filtered array
            // NOTE: We assume if it is in the database, the file exists too
            exists = true;
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
    firebase.authenticateToken(req.headers.authorization).then(({ email, name}) => {
        if({ email, name}) {

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
                if(err) {
                    console.log(err);
                    res.status(500).send({message: "Some error occurred while creating the Interview."});
                } else {
                    console.log('Interview saved')
                    res.send(data);
                }
            });
        }
    })
};

exports.delete = function(req, res) {
    console.log(req.headers)
    firebase.authenticateToken(req.headers.authorization).then(({ email, name}) => {
        if({ email, name}) {
            if(userIsHost(req.headers.id, email)) {
                Interview.findOneAndDelete({'_id': req.headers.id}, function(err, interview) { 
                    if(err) {
                        console.log(err);
                        res.status(500).send({message: "Some error occurred while deleting the Interview."});
                    } else {
                        console.log('Interview deleted');
                        res.send(interview);
                    }
                })
            } else {
                res.status(403).send('Forbidden: Invalid Host Email');
            }
        }
    })
};

exports.update = function(req, res) {
    firebase.authenticateToken(req.headers.authorization).then(({ email, name}) => {
        if({ email, name}) {
            console.log(req.body)
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
            
            Interview.findOneAndUpdate({'_id': req.params.id}, payload, function(err, interview) { 
                if(err) {
                    console.log(err);
                    res.status(500).send({message: "Some error occurred while updating the Interview."});
                } else {
                    console.log('Interview updated')
                    res.send(interview);
                }
            })
        }
    })
};

exports.findOne = function(req, res) {
    Interview.findOne({'_id': req.params.id}, function(err, interview) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Interview not found with id " + req.params.id});
            }
            return res.status(500).send({message: "Error retrieving interview with id " + req.params.id});
        }

        if(!interview) {
            return res.status(404).send({message: "Room not found with id " + req.params.id});
        }

        // Filter loadedAssets and update if modified
        filterLoadedAssets(interview.loadedAssets, interview._id, (modified, filteredAssets) => {
            console.log(modified);
            console.log(filteredAssets);
            if(modified) {
                interview.loadedAssets = filteredAssets;
                Interview.findByIdAndUpdate({'_id': req.params.id}, interview, function(err, interview){
                    if(err) {
                        console.log(err);
                        res.status(500).send({message: "Some error occurred while updating the Interview with filtered Assets."});
                    } else {
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
};

exports.findAll = function(req, res) {
    firebase.authenticateToken(req.headers.authorization).then(({ email, name}) => {
        if({ email, name}) {
            //Need to be using authenticated email not paramter email
            Interview.find({$or: [{'host': email}, {'participants': email}]}, function(err, interviews){
                if(err){
                    console.log(err)
                    return res.status(500).send({message: "Some error occurred while retrieving interviews."});
                }
                else if(!interviews) {
                    return res.status(404)
                }
                else {
                    return res.send(interviews);
                }
            });
        }
    })
};

exports.patchParticipants = function(req, res) {
    firebase.authenticateToken(req.headers.authorization).then(({email, name}) => {
        if({ email, name}) {
            Interview.findOne({'_id': req.params.id}, function(err, interview) {
                if(err) {
                    console.log(err);
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({message: "Interview not found with id " + req.params.id});
                    }
                    return res.status(500).send({message: "Error retrieving interview with id " + req.params.id});
                }
                else {
                    interview.participants = interview.participants.filter(part => part != email);
                    Interview.findByIdAndUpdate({'_id': req.params.id}, interview, function(err, interview){
                        if(err) {
                            console.log(err);
                            res.status(500).send({message: "Some error occurred while updating the Interview."});
                        } else {
                            console.log('Interview updated')
                            res.send(interview);
                        }
                    });
                }
            });
        }
    });
};

exports.patchAssets = function(req, res) {
    firebase.authenticateToken(req.headers.authorization).then(({email, name}) => {
        if({ email, name}) {
            Interview.findOne({'_id': req.params.id}, function(err, interview) {
                if(err) {
                    console.log(err);
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({message: "Interview not found with id " + req.params.id});
                    }
                    return res.status(500).send({message: "Error retrieving interview with id " + req.params.id});
                }
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
                        if(err) {
                            console.log(err);
                            res.status(500).send({message: "Some error occurred while updating the Interview."});
                        } else {
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
        }
    })
};