
module.exports = function(app) {

    var interviews = require('../controllers/interview.controller.js');
 
    // Create a new interview
    app.post('/api/interviews', interviews.create);

    // Delete an interview
    app.delete('/api/interviews/', interviews.delete);

    // Retrieve all interviews
    app.get('/api/interviews/:host', interviews.findAll);

    // Retrieve a single interview with interviewId
    app.get('/api/interview/:id', interviews.findOne);
    
    // Update a interview with interviewId
    app.put('/api/interviews/', interviews.update);

    // Patch an interview's participants list by removing the current user's email
    app.patch('/api/interviews/:id', interviews.patchParticipants);

    // Patch an interview's assets list by updating the assets loaded to be rendered
    app.patch('/api/interviews/:id/:assetId', interviews.patchAssets);

}