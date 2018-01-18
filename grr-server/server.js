// Load required modules
const http    = require("http");              // http server core module
const https   = require("https");     // https server core module
const fs = require("fs");
var express = require("express");           // web framework external module
let forceSsl = require('express-force-ssl');
var serveStatic = require('serve-static');  // serve static files
let socketIo = require("socket.io");        // web socket external module
var easyrtc = require("../index");               // EasyRTC external module
let request = require('request');
const configs = require("./configs/configs");
let env = require('node-env-file');
env(__dirname + '/.env');

const HTTP_PORT = 8080;
const HTTPS_PORT = 8000;
let rest = [];
let dir1, dir2;

let prod = parseInt(process.env.PROD);

if (prod) {
    console.log('Production Enabled');
} else {
    console.log("Development Enabled");
}

// Set process name
process.title = "node-easyrtc";

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var app = express();
//Disbale forceSsl in dev
//app.use(forceSsl);
app.use(serveStatic('static', {'index': 'grr-ui/public/videoparse.html'}));
app.use(express.static("grr-ui/src/static/thing/", {dotfiles:'allow'}));
app.use(express.static("grr-ui/src/static/example/", {dotfiles:'allow'}));
app.use(express.static("grr-ui/public/", {dotfiles:'allow'}));


let httpServer = http.createServer(app);

let options, socketServer, secureServer;

if (prod) { 
    options = {
        key:  fs.readFileSync(configs.https.key),
        cert: fs.readFileSync(configs.https.cert)
    }

    secureServer = https.createServer( options, app);
    socketServer = socketIo.listen(secureServer, {"log level":1});
} else {
    socketServer = socketIo.listen(httpServer, {"log level":1});
}
// Start Express http server on port 8080
//var webServer = http.createServer(app);


// Start Socket.io so it attaches itself to Express server


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
    if (prod) {
        secureServer.listen(HTTPS_PORT, function () {
            console.log(`setup HTTPS Server`);
        });
    }

    httpServer.listen(HTTP_PORT, function() {
        console.log(`Setup HTTP Server`);
    });
});
