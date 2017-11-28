// Load required modules
const http    = require("http");              // http server core module
const https   = require("https");     // https server core module
const fs = require("fs");
var express = require("express");           // web framework external module
var serveStatic = require('serve-static');  // serve static files
var socketIo = require("socket.io");        // web socket external module
var easyrtc = require("../");               // EasyRTC external module
let request = require('request');
const configs = require("./configs/configs");
const PORT = 80;

// Set process name
process.title = "node-easyrtc";

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var app = express();
app.use(serveStatic('static', {'index': ['index.html']}));
app.use(express.static(__dirname + "/static/thing/", {dotfiles:'allow'}));
app.use(express.static(__dirname + "/static/example/", {dotfiles:'allow'}));
app.use(express.static(__dirname + "/static/", {dotfiles:'allow'}));

// Start Express http server on port 8080
//var webServer = http.createServer(app);
var webServer = https.createServer(
{
    key:  fs.readFileSync(configs.https.key),
    cert: fs.readFileSync(configs.https.cert)
},
httpApp);

// Start Socket.io so it attaches itself to Express server
var socketServer = socketIo.listen(webServer, {"log level":1});

easyrtc.setOption("logLevel", "debug");


easyrtc.on("getIceConfig", request.bind(this, configs.request, (error, response, body) => {
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

    //listen on PORT
    webServer.close();
    webServer.listen(PORT, function () {
        console.log(`listening on http://localhost:${PORT}`);
    }); 
});
