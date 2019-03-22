module.exports = function(app) {

    var twilio = require('../controllers/twilio.controller.js');

    app.get('/api/token', twilio.getToken);

}