module.exports = function(app) {

    var rooms = require('../controllers/room.controller.js');

    // Create a new room
    app.post('/api/rooms', rooms.create);

    // Retrieve all rooms
    app.get('/api/rooms', rooms.findAll);

    // Retrieve a single room with roomId
    app.get('/api/rooms/:roomName', rooms.findOne);

    // Update a room with roomId
    app.put('/api/rooms/:roomName', rooms.update);

    // Update vr mode for a room
    app.patch('/api/rooms/:roomName', rooms.patchRoom);

    // Delete a room with roomId
    app.delete('/api/rooms/:roomId', rooms.delete);
}