module.exports = function(app) {

    var uploads = require('../controllers/upload.controller')
    // New upload
    app.post('/api/uploads', uploads.create);

    // Retrieve all uploads
    app.get('/api/uploads', uploads.findAll);

    // Retrieve one upload
    app.get('/api/uploads/:id', uploads.findOne);

    // Delete a specific upload by id
    app.delete('/api/uploads/:id', uploads.delete);

    // Retrieve a file by id
    app.get('/uploads/:uid/:filename/:token', uploads.getFile);

    //Dont permit GETs in scratch directory
    app.get('/uploads/*', (req, res)=> {
        res.status(500).send()
    })

    //Dont permit GETs without token included
    app.get('/uploads/*/*', (req, res)=> {
        res.status(500).send()
    })
}