const http    = require("http");              // http server core module
const https   = require("https");     // https server core module
const fs = require("fs");
var express = require("express");           // web framework external module
//let forceSsl = require('express-force-ssl');
var serveStatic = require('serve-static');  // serve static files
let socketIo = require("socket.io");        // web socket external module
var easyrtc = require("../index.js");               // EasyRTC external module
// let request = require('request');
// const configs = require("../../server_example/configs/configs");
// let env = require('node-env-file');
// env(__dirname + '/.env');