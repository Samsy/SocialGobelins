var express = require("express");
var app = express();

//port d'écoute de l'application
var port = 3700;
var heroPosx;
var gamers = 0;
var heronumber = 0;
var numberOfSockets;

var jsonInfo = {

    "sprites": [
        "sprites/sprite-lowki93.png",
        "sprites/sprite-Sylvar.png",
        "sprites/sprite-Lory.png",
        "sprites/sprite-leo.png",
        "sprites/sprite-Samsy.png"

    ],

    "gamers": 3,

    "heronumber": 1
};


// folder static envoyant les différent fichier script html et css.
app.use(express.static(__dirname + '/public'));


// socket io qui ecoute le port déclaré.
var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

// lors de la connection de l'utilisateur 
io.sockets.on('connection', function(socket) {

	//envoi en broadcast du fichier json info.
	io.sockets.emit('jsonInfo', jsonInfo);


	// envoi du premier message du chat.
    socket.emit('message', {
        message: 'Bienvenue au Chat Gobelins'
    });
    // envoi du message en broadcast lorsque le bouton send du chat est activé.
    socket.on('send', function(data) {
        io.sockets.emit('message', data);
        console.log("send");
    });

    // la valeur gamers met a jour le nombre de personne connecté 
    jsonInfo.gamers = Object.keys(io.connected).length;

    socket.emit('Id-Unique', Object.keys(io.open).length);
    // renvoi de la valeur d'un hero en particulier en broadcast vers tous les client.
    socket.on('move', function(data) {
        heroPosx = data.x;
        io.sockets.emit('moveFromServer', data);

    });


    // deconnection des utilisateurs.
    socket.on('disconnect', function() {


        console.log('user disconnected');

        jsonInfo.gamers = Object.keys(io.open).length;
        console.log(Object.keys(io.open).length);


        socket.emit('Id-Unique', Object.keys(io.connected).length);
        io.sockets.emit('jsonInfo', jsonInfo);


    });


});


