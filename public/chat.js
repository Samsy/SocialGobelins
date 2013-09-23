
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
    messages.push(data.message);
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
    var matches = command.match(/\/([a-zA-Z0-9_\-]+) ?(.*)/);

    if (matches && matches.length > 0) {
        command = matches[1];
        args = matches[2];


        // private message ? (command is an username)
        if (command in jsonInfos.usernames) {
            nick = command;
            text = args;
            chat.emit('private-message', {
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

    if(data.message && ( data.to == username || data.from == username)) {
        logMessage(data);
    } else {
        console.log("There is a problem:", data);
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
 

