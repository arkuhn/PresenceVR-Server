module.exports = function(app) {

    var uploads = require('../controllers/upload.controller')
    // New upload
    app.post('/api/uploads', uploads.create);

    // Retrieve all uploads
    app.get('/api/uploads', uploads.findAll);

}