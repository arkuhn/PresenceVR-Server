// Load required modules
var https   = require("https");     // https server core module
var fs      = require("fs");        // file system core module
var express = require("express");   // web framework external module
var io      = require("socket.io"); // web socket external module
var easyrtc = require("easyrtc");   // EasyRTC external module
let request = require('request');
const iceConfigs = require("./configs/iceConfigs");

// Set process name
process.title = "node-easyrtc";

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();
httpApp.use(serveStatic('static', {'index': ['index.html']}));
httpApp.use(express.static(__dirname + "/static/thing/", {dotfiles:'allow'}));
httpApp.use(express.static(__dirname + "/static/example/", {dotfiles:'allow'}));
httpApp.use(express.static(__dirname + "/static/"));

// Start Express https server on port 8443
var webServer = https.createServer(
{
    key:  fs.readFileSync("/pathtokeys/domain.key"),
    cert: fs.readFileSync("/pathtokeys/domain.crt")
},
httpApp);

// Start Socket.io so it attaches itself to Express server
var socketServer = socketIo.listen(webServer, {"log level":1});

easyrtc.setOption("logLevel", "debug");


easyrtc.on("getIceConfig", request.bind(this, iceConfigs.request, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        let info = JSON.parse(body);
        console.log(info.v.iceServers);
        easyrtc.setOption('appIceServers', info.v.iceServers);
      }
}));


// Overriding the default easyrtcAuth listener, only so we can directly access its callback
easyrtc.events.on("easyrtcAuth", function(socket, easyrtcid, msg, socketCallback, callback) {
    easyrtc.events.defaultListeners.easyrtcAuth(socket, easyrtcid, msg, socketCallback, function(err, connectionObj){
        if (err || !msg.msgData || !msg.msgData.credential || !connectionObj) {
            callback(err, connectionObj);
            return;
        }

        connectionObj.setField("credential", msg.msgData.credential, {"isShared":false});

        console.log("["+easyrtcid+"] Credential saved!", connectionObj.getFieldValueSync("credential"));

        callback(err, connectionObj);
    });
});

// To test, lets print the credential to the console for every room join!
easyrtc.events.on("roomJoin", function(connectionObj, roomName, roomParameter, callback) {
    console.log("["+connectionObj.getEasyrtcid()+"] Credential retrieved!", connectionObj.getFieldValueSync("credential"));
    easyrtc.events.defaultListeners.roomJoin(connectionObj, roomName, roomParameter, callback);
});



// Start EasyRTC server
var rtc = easyrtc.listen(app, socketServer, null, function(err, rtcRef) {
    console.log("Initiated");

    rtcRef.events.on("roomCreate", function(appObj, creatorConnectionObj, roomName, roomOptions, callback) {
        console.log("roomCreate fired! Trying to create: " + roomName);

        appObj.events.defaultListeners.roomCreate(appObj, creatorConnectionObj, roomName, roomOptions, callback);
    });

    //listen on port 8080
    webServer.close();
    webServer.listen(8080, function () {
        console.log('listening on http://localhost:8080');
    }); 
});