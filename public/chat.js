
/***** CHAT *****/

var chat = io.connect('http://'+ADDR+':'+PORT+'/chat');

var messages = [];

var sendButton = document.getElementById("send");
var content = document.getElementById("content");

var username = null;


/**
* Logs a message into the chat console.
*
*/
function logMessage(data)
{
    msg = '';

    if (data.from) {
        msg += '<strong>'+data.from+'</strong> ';
        if (data.to) {
            msg += '<em>(to '+data.to+')</em>';
        }
        msg += ' : ';
    }

    msg += data.message;

    messages.push(msg);
    var html = '';
    for(var i=0; i<messages.length; i++) {
        html += messages[i] + '<br />';
    }
    content.innerHTML = html;
}


/**
* Parses a chat command.
* 
*/


function parseCommand(command)
{
    var matches = command.match(/\/([a-zA-Z0-9_\-]+)(.*)/);

    if (matches && matches.length > 0) {
        command = matches[1];
        args = matches[2];

        console.log('Command : '+command);

        // private message ? (command is an username)
        if (jsonInfos.usernames.indexOf(command) != -1) {
            nick = command;
            text = args;

            chat.emit('send', {
                to: nick,       // dest
                from: username, // exp (me)
                message: text,
                user: heroNumber
            });
        }


        if (command == 'who') {
            logMessage(username)
        }

        if (command == 'me') {
            text = username+' '+args;
            chat.emit('send', {
                from: username,
                message: text,
                user: heroNumber
            });
        }


        // quit
        if (command == 'quit' || command == 'exit') {
            window.close();
        }
    }
            
}

chat.on('message', function (data) {
    if(data.message) {
        logMessage(data);
    } else {
        console.log("There is a problem:", data);
    }
});


chat.on('private-message', function (data) {

    // si on est destinataire ou récepteur du message on l'affiche.

    console.log('Private message for '+data.to);

    if(data.message && ( data.to == username || data.from == username)) {
        logMessage(data);
    }

});

$('#chat form').submit(function(e) {

    e.preventDefault(); // avoid form default submission

    var text = $('#field').val();

    if (text.match(/\/.+/) ) { // is it a command ?
        parseCommand(text);

    } else {
        chat.emit('send', { from: username, message: text, user: heroNumber });   
    }
    

    $('#field').val('');
});
 

