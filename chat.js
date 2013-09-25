// SOCKET : CHAT


exports.start = function(io, jsonInfo) {

    io.of('/chat').on('connection', function(socket) {

        // envoi du premier message du chat.
        socket.emit('message', {
            message: '<em>Bienvenue au Chat Gobelins</em>'
        });


         // envoi du message en broadcast lorsque le bouton send du chat est activé.
        socket.on('send', function(data) {

            if (data.to) { // message privé
                console.log('/chat : message from user '+data.from+' to user '+data.to);
                io.of('/chat').emit('private-message', data);
            } else {
                console.log('/chat : message from user '+jsonInfo.usernames[data.user]);
                io.of('/chat').emit('message', data);   
            }
        });


    });

};