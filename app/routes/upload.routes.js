module.exports = function(app) {

    var uploads = require('../controllers/upload.controller')
    // New upload
    app.post('/api/uploads', uploads.create);

    // Retrieve all uploads
    app.get('/api/uploads', uploads.findAll);

    // Delete a specific upload by id
    app.get('/api/uploads/:id', uploads.delete);

}