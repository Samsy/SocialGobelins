var express = require("express");
var app = express();

var chat = require("./chat.js");
var map = require("./map.js");
var db = require("./db.js");

//port d'écoute de l'application
var port = 3700;
var heroPosx;
var gamers = 0;
var heronumber = 0;
var numberOfSockets = 0;


// General data

var jsonInfo = db.getJson();


// folder static envoyant les différent fichier script html et css.
app.use(express.static(__dirname + '/public'));

// clear the console.
var lines = process.stdout.getWindowSize()[1];
for(var i = 0; i < lines; i++) {
    console.log('\r\n');
}

console.log("\t\t ------------- SOCIAL GOBELINS --------------");
console.log("\t\t ------------ Real time chat app ------------\n");

// socket io qui ecoute le port déclaré.
var io = require('socket.io').listen(app.listen(port));

// uniquement erreurs et warnings
io.set('log level', 1);


console.log("Listening on port " + port);


map.start(io, jsonInfo);
chat.start(io, jsonInfo);