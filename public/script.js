var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;


var jsonInfos;
var playerArray = new Array();
var spriteLeftAnimArray = new Array();
var spriteRightAnimArray = new Array();
var spriteTilesArray = new Array();
var connectedUser;
var heroNumber;
var posxOrigin;
var connectedUser = 0;

console.log('in');
// instantiate the bubble
drawing = new Image();
drawing.src = "bulles/0.png";

// load image of the game, background etc..
function imageLoaded() {
    game.imagesLoaded++;
}

// set tileset as an image
function Tileset(image, tileWidth, tileHeight) {
    this.image = new Image();
    game.images++;
    this.image.onload = imageLoaded;
    this.image.src = image;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
}

// animation key
function Animation(tileset, frames, frameDuration) {
    this.tileset = tileset;
    this.frames = frames;
    this.currentFrame = 0;
    this.frameTimer = Date.now();
    this.frameDuration = frameDuration;
}

// divide the tileset into sprite
function Sprite(stateAnimations, startingState, x, y, width, height, speed) {
    this.stateAnimations = stateAnimations;
    this.currentState = startingState;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
}


// draw the sprite 
function drawSprite(sprite) {
    ctx.drawImage(
        sprite.stateAnimations[sprite.currentState].tileset.image,
        sprite.stateAnimations[sprite.currentState].frames[sprite.stateAnimations[sprite.currentState].currentFrame].split(',')[0] * sprite.stateAnimations[sprite.currentState].tileset.tileWidth,
        sprite.stateAnimations[sprite.currentState].frames[sprite.stateAnimations[sprite.currentState].currentFrame].split(',')[1] * sprite.stateAnimations[sprite.currentState].tileset.tileHeight,
        sprite.stateAnimations[sprite.currentState].tileset.tileWidth,
        sprite.stateAnimations[sprite.currentState].tileset.tileHeight,
        Math.round(sprite.x),
        Math.round(sprite.y),
        sprite.width,
        sprite.height
    );
}

// update the animation
function updateAnimation(anim) {
    if (Date.now() - anim.frameTimer > anim.frameDuration) {
        if (anim.currentFrame < anim.frames.length - 1) anim.currentFrame++;
        else anim.currentFrame = 0;
        anim.frameTimer = Date.now();
    }
}

// image of the game, background etc..
var game = {
    images: 0,
    imagesLoaded: 0,
    backgroundColor: '#000'
}


//key listener
var keysDown = {};
window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});



// render function
function render() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = game.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);



    for (var i = 0; i < jsonInfos.gamers; i++) {

        drawSprite(playerArray[i]);
        ctx.drawImage(drawing, playerArray[i].x, playerArray[i].y - 40);

    }


}

// main function
function main() {
    update((Date.now() - then) / 1000);
    if (game.images == game.imagesLoaded) {
        render();
    }
    then = Date.now();
}

var then = Date.now();




// update key actions / emit info to server
function update(mod) {

    if (37 in keysDown) {

        socket.emit('move', {
            x: playerArray[heroNumber].x,
            status: 'left',
            heronumber: heroNumber,
            modu: mod
        });
 
    } else if (39 in keysDown) {

        socket.emit('move', {
            x: playerArray[heroNumber].x,
            status: 'right',
            heronumber: heroNumber,
            modu: mod
        });
    }
}



