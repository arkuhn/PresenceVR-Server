
module.exports = function(app) {

    var rooms = require('../controllers/room.controller.js');
    const multer = require('multer');
    const path = require('path');
    const UPLOAD_PATH = path.resolve(__dirname, "../../uploads");
    console.log(UPLOAD_PATH);
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, UPLOAD_PATH);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
    app.use(multer({storage: storage}).any());

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
    app.delete('/api/rooms/:roomName', rooms.delete);
}