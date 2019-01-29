module.exports = function(app) {

    var uploads = require('../controllers/upload.controller')
    // New upload
    app.post('/api/upload/assets', uploads.create);

}