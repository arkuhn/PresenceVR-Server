var Interview = require('../models/interview.model.js');


exports.create = function(req, res) {
    // Create and Save a new Note
    console.log(req.body);

    var interview = new Interview({
        host: req.body.data.host,
        details: req.body.data.details,
        occursOnDate: req.body.data.occursOnDate,
        occursAtTime: req.body.data.occursAtTime,
        scheduledOnDate: new Date().toLocaleDateString("en-US"),
        participants: req.body.data.participants,
        loadedAssets: ['test.asset'],
        loadedEnvironments: ['test.env']
        
    });

    interview.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Interview."});
        } else {
            console.log('no error')
            res.send(data);
        }
    });
};

exports.delete = function(req, res) {
    res.send({message: "Interview deleted successfully!"});
};

exports.update = function(req, res) {
    res.send({message: "Interview updated successfully!"});
};

exports.findOne = function(req, res) {
    res.send({message: "Interview successfully found!"});
    /*Interview.findOne({'name': req.params.roomName}, function(err, interview) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Interview not found with id " + req.params.roomId});
            }
            return res.status(500).send({message: "Error retrieving interview with id " + req.params.roomId});
        }

        if(!interview) {
            return res.status(404).send({message: "Room not found with id " + req.params.roomId});
        }

        res.send(interview);
    });*/
};

exports.findAll = function(req, res) {
    Interview.find({'host': req.params.host}, function(err, interviews){
        if(err){
            console.log(err)
            return res.status(500).send({message: "Some error occurred while retrieving interviews."});
        }
        else if(!interviews) {
            return res.status(404)
        }
        else {
            res.send(interviews);
        }
    });
};