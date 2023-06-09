var canvas = document.createElement("canvas");canvas.width = 1000;canvas.height = 600;document.body.appendChild(canvas);var c = canvas.getContext("2d");

var playerX = 100;
var playerY = 150;
var oldPlayerX = playerX; var oldPlayerY = playerY;
var playerHeight = 50;
var playerWidth = 50;
var friction = 0;
var gravity = 0;
var ground = 300;
var onGround = true;

var mezernikDown = false;
var leftDown = false;
var rightDown = false;

function player() {
    //pohyb vpravo/vlevo a friction
    if (leftDown && friction > -10) {
        friction += -1.1;
    }
    else if (rightDown && friction < 10) {
        friction += 1.1;
    }
    else{
        friction *= 0.8;
    }
    if(friction < 1 && friction > -1){
        friction = 0;
    }

    if(leftDown && friction > 1) {
        friction -=2;
    }else if (rightDown && friction < 1) {
        friction += 2;
    }
    playerX += friction;

    //skok a gravitace
    if (!onGround) {
        gravity += 1.2;
        playerY += gravity;
    }

    if(playerY > ground) {
        onGround = true;
        gravity = 0;
    }else {
        onGround = false;
    }
    if (mezernikDown && onGround) {
        gravity = -17;
        onGround = false;
    }
}

function KeyDown(event) {
    switch(event.keyCode) {
        case 32://mezernik
            mezernikDown = true;
            break;
        case 87:
            mezernikDown = true;
            break;
        case 65://A
            leftDown = true;
            break;
        case 68://D
            rightDown = true;
            break;
    }
}
function KeyUp(event) {
    switch(event.keyCode) {
        case 32://mezernik
            mezernikDown = false;
            break;
        case 87:
            mezernikDown = false;
            break;
        case 65://A
            leftDown = false;
            break;
        case 68://D
            rightDown = false;
            break;
    }
}
function collision() {
    var topLeftX = (playerX-(playerX % 50)) / 50;
    var topLeftY = (playerY-(playerY % 50)) / 50;
    var topLeftTile = tilemapV[topLeftY][topLeftX];

    var botLeftX = (playerX-(playerX % 50)) / 50;
    var botLeftY = ((playerY + playerHeight +1)-((playerY + playerHeight +1) % 50)) / 50;
    var botLeftTile = tilemapV[botLeftY][botLeftX];

    var botRightX = ((playerX + playerWidth)-((playerX + playerWidth) % 50)) / 50;
    var botRightY = ((playerY + playerHeight +1)-((playerY + playerHeight +1) % 50)) / 50;
    var botRightTile = tilemapV[botRightY][botRightX];
if (gravity > 0) {
    
    if (botLeftTile == 1 || (botLeftTile > 4 && botLeftTile<8) || (botRightTile == 1) || (botLeftTile > 4 && botRightTile<8)) {
        topCollision();
    }
    
}
    //console.log(tilemapV[botLeftY][botLeftX] +" X: " +  botLeftX + " Y: " + botLeftY);
    console.log(tilemapV[topLeftY][topLeftX] +" X: " +  topLeftX + " Y: " + topLeftY);
    function topCollision() {
        playerY -= playerY % 50;
        gravity = 0;
        onGround = true;
    }
    oldPlayerX = playerX;
    oldPlayerY = playerY;
}
function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "blue";
    c.fillRect(playerX, playerY, 50, 50);

    tilemap();
}

function mainLoop() {
    player();
    collision();
    draw();
    window.requestAnimationFrame(mainLoop);
}

window.addEventListener("keydown", KeyDown);
window.addEventListener("keyup", KeyUp);
window.requestAnimationFrame(mainLoop);