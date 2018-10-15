var Interview = require('../models/interview.model.js');


exports.create = function(req, res) {
    // Create and Save a new Note
    console.log(req.body);

    var interview = new Interview({
        host: req.body.host,
        subject: req.body.subject,
        occursOnDate: req.body.occursOnDate,
        occursAtTime: req.body.occursAtTime,
        scheduledOnDate: new Date().toLocaleDateString("en-US"),
        participants: req.body.participants,
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
    // Delete a room with the specified roomId in the request
    Interview.findOneAndRemove({'name': req.params.interviewId}, function(err, room) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Interview not found with id " + req.params.interviewId});
            }
            return res.status(500).send({message: "Could not delete interview with id " + req.params.interviewId});
        }

        if(!room) {
            return res.status(404).send({message: "Interview not found with id " + req.params.interviewId});
        }

        res.send({message: "Interview deleted successfully!"});
    });
};