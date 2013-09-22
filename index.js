var express = require("express");
var app = express();

//port d'écoute de l'application
var port = 3700;
var heroPosx;
var gamers = 0;
var heronumber = 0;
var numberOfSockets = 0;

var jsonInfo = {

    "sprites": [
        "sprites/sprite-lowki93.png",
        "sprites/sprite-Sylvar.png",
        "sprites/sprite-Lory.png",
        "sprites/sprite-leo.png",
        "sprites/sprite-Samsy.png"

    ],

    "positions": [],

    "gamers": 0,

    "heronumber": 1
};


// folder static envoyant les différent fichier script html et css.
app.use(express.static(__dirname + '/public'));


// socket io qui ecoute le port déclaré.
var io = require('socket.io').listen(app.listen(port));

// uniquement erreurs et warnings
io.set('log level', 1);


console.log("Listening on port " + port);


// lors de la connection de l'utilisateur 

io.sockets.on('connection', function(socket) {

    numberOfSockets++;

    console.log('New connection : sending json data');

    // la valeur gamers met a jour le nombre de personne connecté 
    jsonInfo.gamers = Object.keys(io.connected).length;

    console.log('Now there are '+jsonInfo.gamers+' users connected.');

    socket.emit('Id-Unique', Object.keys(io.open).length);

	//envoi en broadcast du fichier json info.
	io.sockets.emit('jsonInfo', jsonInfo);


	// envoi du premier message du chat.
    socket.emit('message', {
        message: 'Bienvenue au Chat Gobelins'
    });


    /** LISTENERS **/

    // envoi du message en broadcast lorsque le bouton send du chat est activé.
    socket.on('send', function(data) {
        io.sockets.emit('message', data);
    });


    // renvoi de la valeur d'un hero en particulier en broadcast vers tous les client.
    socket.on('move', function(data) {

        // on enregistre la dernière position connue.
        jsonInfo.positions[data.heronumber] = data.x;
        
        io.sockets.emit('moveFromServer', data);
    });


    // deconnection des utilisateurs.
    socket.on('disconnect', function() {

        numberOfSockets--;

        console.log('User disconnected. ');

        jsonInfo.gamers = Object.keys(io.open).length;
        console.log("Now there are "+Object.keys(io.open).length+" users connected.");


        socket.emit('Id-Unique', Object.keys(io.connected).length);
        io.sockets.emit('jsonInfo', jsonInfo);


    });


});


