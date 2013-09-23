var express = require("express");
var app = express();

//port d'écoute de l'application
var port = 3700;
var heroPosx;
var gamers = 0;
var heronumber = 0;
var numberOfSockets = 0;


// General data

var jsonInfo = {

    "sprites": [
        "sprites/sprite-lowki93.png",
        "sprites/sprite-Sylvar.png",
        "sprites/sprite-Lory.png",
        "sprites/sprite-leo.png",
        "sprites/sprite-Samsy.png"

    ],
    // pour l'instant l'user est affecté selon l'ordre de connexion
    "usernames": [
        "Lowki93",
        "Sylvar",
        "Lory",
        "Leo",
        "Samsy"
    ],
    // dernières positions enregistrées pour chaque user
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


// Socket : MOVING
// lors de la connection de l'utilisateur 

io.of('/map').on('connection', function(socket) {

    console.log('/map : New connection : sending json data');

    var id =  io.of('/map').clients().length;

    // la valeur gamers met a jour le nombre de personne connecté 
    jsonInfo.gamers = id;
    name = jsonInfo.usernames[id-1];

    socket.set('user', {
        id: id,
        name: name
    }, function() {

        console.log('/map : '+name+' connected. Now there are '+jsonInfo.gamers+' users connected.');

        socket.emit('Id-Unique', id);

        //envoi en broadcast du fichier json info.
        io.of('/map').emit('jsonInfo', jsonInfo);

    });



    /** LISTENERS **/
   

    // renvoi de la valeur d'un hero en particulier en broadcast vers tous les client.
    socket.on('move', function(data) {

        // on enregistre la dernière position connue.
        jsonInfo.positions[data.heronumber] = data.x;

        io.of('/map').volatile.emit('moveFromServer', data);
    });


    // deconnection des utilisateurs.
    socket.on('disconnect', function() {

        socket.get('user', function(err, user) {
            console.log('/map : User '+user.name+' disconnected. ');
        });
       

        jsonInfo.gamers = Object.keys(io.open).length;
        console.log("Now there are "+Object.keys(io.open).length+" users connected.");


    });


});


// SOCKET : CHAT

io.of('/chat').on('connection', function(socket) {

    // envoi du premier message du chat.
    socket.emit('message', {
        message: '<em>Bienvenue au Chat Gobelins</em>'
    });


     // envoi du message en broadcast lorsque le bouton send du chat est activé.
    socket.on('send', function(data) {
        data.message = '<b>'+data.from+'</b> : '+data.message;
        console.log('/chat : message from user '+jsonInfo.usernames[data.user]);
        io.of('/chat').emit('message', data);
    });

    // message privé : broadcast également mais seul le client concerné doit traiter le message.
    socket.on('private-message', function(data) {
        data.message = '<b>'+jsonInfo.usernames[data.user]+'</b> : '+data.message;
        console.log('/chat : message from user '+data.from+' to user '+data.to);
        io.of('/chat').emit('private-message', data);
    });

});