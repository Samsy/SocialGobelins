// map.js

// Module gérant le socket du déplacement des users.

// db mongo
var db = require('./db.js');


exports.start = function(io, jsonInfo) {
    
    // Lorsqu'un utilisateur se connecte (ouverture du socket)

    io.of('/map').on('connection', function(socket) {

        console.log('/map : New connection : sending json data');

        // On récupère les données de l'utilisateur avec son pseudo.
        // var userdata = db.getByUsername(pseudoEntréLorsDuLogin)

        // On enregistre les données dans ce socket (pseudo et ID),
        // puis on envoie les données nécéssaires au client.

        socket.set('user', {
            id: id, 
            name: name
        }, function() {

            console.log('/map : '+name+' connected. Now there are '+Object.keys(io.open).length+' users connected.');

            // Envoi au client de son ID (_id dans mongo)
            socket.emit('Id-Unique', id);

            // Envoi en broadcast des infos de tous les users (pour avoir les sprites, positions, pseudos...)
            io.of('/map').emit('jsonInfo', db.getAll());

        });



        /** LISTENERS **/
       

        // Lorsqu'un client envoie le signal de déplacement de son perso,
        // Ce mouvement est broadcasté vers tous les clients pour afficher le déplacement
        // effectif sur le canvas.

        socket.on('move', function(data) {
            io.of('/map').emit('moveFromServer', data);
        });


        // 'exit' est envoyé par un client lorsqu'il est sur le point de se déconnecter
        // (exemple : quand il ferme la page)
        
        socket.on('exit', function(data) {
            
            // on récupère le pseudo pour enregistrer la position.
            socket.get('user', function(err, user) {

                // On enregistre la dernière position connue :

                // db.registerLastPosition(user, data.x, data.y);

                console.log('/map : User '+user.name+' ready to disconnect. Last position registered at [x: '+data.x+' ]');
            });

            // enfin on ferme le socket.
            socket.disconnect();
        })


        // Lorsqu'un socket est fermé (suite à "exit", entre autres) :

        socket.on('disconnect', function() {

            // Log de la déconnexion.
            socket.get('user', function(err, user) {
                console.log('/map : User '+user.name+' disconnected. ');
            });
           
            // log
            console.log("Now there are "+Object.keys(io.open).length+" users connected.");

        });

    }); // Fin du socket map

} // Fin du module