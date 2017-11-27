const request = require('request');



function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info.v.iceServers);
  }
}

module.exports = request.bind(options, callback);