

/***********************************/
/******* SOCKET LISTENERS **********/
/***********************************/


/* Emitted when a player moves */

socket.on('moveFromServer', function(data) {


    if (data.status == 'left') {

        playerArray[data.heronumber].x -= playerArray[data.heronumber].speed * data.modu;
    }

    if (data.status == 'right') {

        playerArray[data.heronumber].x += playerArray[data.heronumber].speed * data.modu;
    }

    playerArray[data.heronumber].currentState = data.status;
    updateAnimation(playerArray[data.heronumber].stateAnimations[playerArray[data.heronumber].currentState]);
});


/* Emitted to tell the player ID */

socket.on('Id-Unique', function(data) {
    console.log("Got unique ID from server : "+data);
    heroNumber = data - 1;
});


/* General information on players broadcasted by server */

socket.on('jsonInfo', function(data) {
    

    jsonInfos = data;

    console.log(data);

    playerArray = new Array();
    spriteLeftAnimArray = new Array();
    spriteRightAnimArray = new Array();
    spriteTilesArray = new Array();

    connectedUser = jsonInfos.gamers;

    console.log("Got json players info. "+connectedUser+" users connected.");

    for (var i = 0; i < connectedUser; i++) {

        var spriteTiles = new Tileset(jsonInfos.sprites[i], 41.5, 41.5);
        spriteTilesArray.push(spriteTiles);

        var spriteLeftAnim = new Animation(spriteTilesArray[i], ['3,0', '4,0', '5,0'], 100);
        spriteLeftAnimArray.push(spriteLeftAnim);

        var spriteRightAnim = new Animation(spriteTilesArray[i], ['0,0', '1,0', '2,0'], 100);
        spriteRightAnimArray.push(spriteRightAnim);

        // si position enregistrée, on la récupère sinon par défaut au milieu de la scène.
        var startPosition = jsonInfos.positions[i] ? jsonInfos.positions[i] : canvas.width / 2;

        var player = new Sprite({
            'left': spriteLeftAnimArray[i],
            'right': spriteRightAnimArray[i]
        }, 'right', startPosition, canvas.height / 2, 41.5, 41.5, 150);

        playerArray.push(player);
    }

    setInterval(main, 10);
});