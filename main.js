var canvas = document.createElement("canvas");canvas.width = 500;canvas.height = 500;document.body.appendChild(canvas);var c = canvas.getContext("2d");

var playerX = 100;
var playerY = 150;
var friction = 0;
var gravity = 0;
var ground = 150;
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
        playerY = ground;
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
function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "blue";
    c.fillRect(playerX, playerY, 50, 50);

    tilemap();
}

function mainLoop() {
    player();
    draw();
    window.requestAnimationFrame(mainLoop);
}

window.addEventListener("keydown", KeyDown);
window.addEventListener("keyup", KeyUp);
window.requestAnimationFrame(mainLoop);