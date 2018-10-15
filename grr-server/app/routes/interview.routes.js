
module.exports = function(app) {

    var interviews = require('../controllers/interview.controller.js');
 
    // Create a new interview
    app.post('/api/interviews', interviews.create);

    // Delete an interview with interviewId
    app.delete('/api/rooms/:roomName', interviews.delete);

}