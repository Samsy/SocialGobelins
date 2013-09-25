// chat.js

// Module gérant le socket du chat.

// db mongo
var db = require('./db.js');

exports.start = function(io, jsonInfo) {

    // Lorsqu'un user se connecte (ouverture du socket)

    io.of('/chat').on('connection', function(socket) {

        // Envoi du premier message du chat (welcome!).
        socket.emit('message', {
            message: '<em>Bienvenue au Chat Gobelins</em>'
        });


         // "send" envoyé par un client lorsqu'un message est envoyé.
        socket.on('send', function(data) {

            // Si l'attribut "to" de data est présent, il s'agit d'un message privé.
            if (data.to) { 
                console.log('/chat : message from user '+data.from+' to user '+data.to);
                io.of('/chat').emit('private-message', data);

            } else { // Sinon, message visible par tous.

                console.log('/chat : message from user '+jsonInfo.usernames[data.user]);
                io.of('/chat').emit('message', data);   
            }
        });

    }); // Fin du socket

}; // Fin du module