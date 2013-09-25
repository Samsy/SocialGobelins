



exports.start = function(io, jsonInfo) {
        // Socket : MOVING
    // lors de la connection de l'utilisateur 

    io.of('/map').on('connection', function(socket) {

        console.log('/map : New connection : sending json data');


        socket.set('user', {
            id: id,
            name: name
        }, function() {

            console.log('/map : '+name+' connected. Now there are '+Object.keys(io.open).length+' users connected.');

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
           

            console.log("Now there are "+Object.keys(io.open).length+" users connected.");


        });


    });
}