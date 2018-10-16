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
    res.send({message: "Interview found successfully!"});
};

exports.findAll = function(req, res) {
    res.send({message: "All interviews found successfully!"});
};