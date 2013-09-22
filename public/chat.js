
/***** CHAT *****/

var messages = [];

var sendButton = document.getElementById("send");
var content = document.getElementById("content");

socket.on('message', function (data) {
    if(data.message) {
        messages.push(data.message);
        var html = '';
        for(var i=0; i<messages.length; i++) {
            html += messages[i] + '<br />';
        }
        content.innerHTML = html;
    } else {
        console.log("There is a problem:", data);
    }
});

$('#chat form').submit(function(e) {

    e.preventDefault(); // avoid form default submission

    var text = $('#field').val();

    socket.emit('send', { message: text, user: heroNumber });

    $('#field').val('');
});
 

