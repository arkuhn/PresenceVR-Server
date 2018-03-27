var Room = require('../models/room.model.js');


exports.create = function(req, res) {
    // Create and Save a new Note
    console.log(req.body);
    if(!req.body.currentBackground) {
        return res.status(400).send({message: "Room can not be empty"});
    }

    var room = new Room({name: req.body.name || "Untitled Room", vrMode: false,
        currentBackground: req.body.currentBackground, backgroundImages: ["bridge.png", "city.jpg",
            "puydesancy.jpg", "stock360.png", "vr_background.jpg"]});

    room.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Room."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all notes from the database.
    Room.find(function(err, rooms){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving rooms."});
        } else {
            res.send(rooms);
        }
    });
};

exports.findOne = function(req, res) {
    Room.findOne({'name': req.params.roomName}, function(err, room) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Room not found with id " + req.params.roomId});
            }
            return res.status(500).send({message: "Error retrieving room with id " + req.params.roomId});
        }

        if(!room) {
            return res.status(404).send({message: "Room not found with id " + req.params.roomId});
        }

        res.send(room);
    });
};

exports.update = function(req, res) {
    // Update a room identified by the roomId in the request
    Room.findOne({'name': req.params.roomName}, function(err, room) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Room not found with id " + req.params.roomName});
            }
            return res.status(500).send({message: "Error finding room with id " + req.params.roomName});
        }

        if(!room) {
            return res.status(404).send({message: "Room not found with id " + req.params.roomName});
        }

        room.name = req.body.name;
        room.vrMode = Boolean(req.body.vrMode);
        room.currentBackground = req.body.currentBackground;

        room.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update room with id " + req.params.roomId});
            } else {
                res.send(room);
            }
        });
    });
};


exports.patchRoom = function(req, res) {
    // Update a room identified by the roomId in the request
    Room.findOne({'name': req.params.roomName}, function(err, room) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Room not found with id " + req.params.roomName});
            }
            return res.status(500).send({message: "Error finding room with id " + req.params.roomName});
        }

        if(!room) {
            return res.status(404).send({message: "Room not found with id " + req.params.roomName});
        }

        if(req.body.name) {
            room.name = req.body.name;
        }
        if(req.body.vrMode === true) {
            room.vrMode = true;
        }
        if(req.body.vrMode === false) {
            room.vrMode = false;
        }
        if(req.body.currentBackground) {
            room.currentBackground = req.body.currentBackground;
        }
        if(req.files) {
            if(req.files[0].fieldname === "backgroundImage") {
                room.backgroundImages.push(req.files[0].originalname);
            }
            if(req.files[0].fieldname === "assetImage") {
                room.assetImages.push(req.files[0].originalname);
            }
        }

        room.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update room with id " + req.params.roomId});
            } else {
                res.send(room);
            }
        });
    });
};

exports.delete = function(req, res) {
    // Delete a room with the specified roomId in the request
    Room.findOneAndRemove({'name': req.params.roomName}, function(err, room) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Room not found with id " + req.params.roomId});
            }
            return res.status(500).send({message: "Could not delete room with id " + req.params.roomId});
        }

        if(!room) {
            return res.status(404).send({message: "Room not found with id " + req.params.roomId});
        }

        res.send({message: "Room deleted successfully!"});
    });
};