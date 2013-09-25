var express = require("express");
var app = express();

var chat = require("./chat.js");
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
        io.of('/map').volatile.emit('moveFromServer', data);
    });


    // juste avant la déconnexion effective, on enregistre la dernière position connue.
    socket.on('exit', function(data) {
        // on enregistre la dernière position connue.
        jsonInfo.positions[data.heronumber] = data.x;
        socket.get('user', function(err, user) {
            console.log('/map : User '+user.name+' ready to disconnect. Last position registered at [x: '+data.x+' ]');
        });

        socket.disconnect();
    })


    // deconnection des utilisateurs.
    socket.on('disconnect', function() {

        socket.get('user', function(err, user) {
            console.log('/map : User '+user.name+' disconnected. ');
        });
       

        jsonInfo.gamers = Object.keys(io.open).length;
        console.log("Now there are "+Object.keys(io.open).length+" users connected.");


    });


});


chat.start(io, jsonInfo);