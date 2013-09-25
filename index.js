var express = require("express");
var app = express();

var chat = require("./chat.js");
var map = require("./map.js");
var db = require("./db.js");
var auth = require("./auth.js");

//port d'écoute de l'application
var port = 3700;
var heroPosx;
var gamers = 0;
var heronumber = 0;
var numberOfSockets = 0;


// On récupère le tableau json contenant les données de tous les users.
var jsonInfo = db.getAll();

app.use(express.cookieParser('Th15154S3cr3t'));
app.use(express.session()); // on utilise le gestionnaire de sessions d'Express

// // Middleware qui doit vérifier la connexion de l'utilisateur.
// app.use(auth.authenticate());
// app.use('/login', auth.login());

// Express utilisera le dossier public pour envoyer les fichiers clients (index.html, js, etc.)
app.use(express.static(__dirname + '/public'));

// clear the console and welcome!
var lines = process.stdout.getWindowSize()[1];
for(var i = 0; i < lines; i++) {
    console.log('\r\n');
}

console.log("\t\t ------------- SOCIAL GOBELINS --------------");
console.log("\t\t ------------ Real time chat app ------------\n");



// On déclare socket.io qui écoute sur le port déclaré.
var io = require('socket.io').listen(app.listen(port));

// On log uniquement erreurs et warnings
io.set('log level', 1);

console.log("Listening on port " + port);

// Démarrage du module de déplacement.
map.start(io, jsonInfo);
// Démarrage du module de chat.
chat.start(io, jsonInfo);