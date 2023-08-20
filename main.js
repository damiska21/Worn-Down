var canvas = document.createElement("canvas");canvas.width = window.innerWidth-20;canvas.height = window.innerHeight - 20;document.body.appendChild(canvas);var c = canvas.getContext("2d");
var playerX = 100;
var playerY = 100;
var oldPlayerX = playerX; var oldPlayerY = playerY;
var playerHeight = 75;
var playerWidth = 50;

var tile = 50;
var offset = 15;
c.offsetLeft

var friction = 0;
var gravity = 0;
var ground = 500;
var onGround = true;

var coyoteTime = false;
var coyoteTimeTick = 0;

var mezernikDown = false;
var leftDown = false;
var rightDown = false;

function player() {
    oldPlayerX = playerX;
    oldPlayerY = playerY;
    
    //pohyb vpravo/vlevo a friction
    if (leftDown && friction > - 10) {
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
    if (mezernikDown && (onGround || coyoteTime)) {
        if (coyoteTime) {
            coyoteTime = false;
        }
        gravity = -17;
        onGround = false;
    }

    //aby nevyskočil z mapy

    if (playerY<0) {
        playerY=0;
    }if (playerY > (vyska * tile) + 50) {
        playerY = 100;
        playerX = 100;
    }if (playerX < 0) {
        playerX = 0;
    }if (playerX > sirka * tile) {
        
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
var moveCounter;
function Camera() {
    var cameraPos = offset;
    if (playerX - cameraPos > 150) {
        if (moveCounter == 0) {
            moveCounter++;
        }else if (moveCounter < 10 && moveCounter > 30) {
            cameraPos *= 1.05;
        }else if (moveCounter > 30) {
            moveCounter = 0;
        }
        if(moveCounter > 0) {
            moveCounter++;
        }
    }else if (playerX - cameraPos < 150) {
        cameraPos *= 0.95;
    }
    offset = cameraPos;
}

function draw() { //loop co běží na kolik hertzů je monitor (60/144 převážně)
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "#D4FFE6";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "blue";
    c.fillRect(playerX, playerY, playerWidth, playerHeight);

    tilemap(offset);

    window.requestAnimationFrame(draw);
}
function mainLoop() { // loop co běží na 60 FPS (o něco víc actually ale chápeš)
    player();
    Camera();
    collision(offset);
}
function slowLoop() { //loop co se spouští jednou za vteřinu
canvas.width = window.innerWidth-20;canvas.height = window.innerHeight - 20;
}

window.addEventListener("keydown", KeyDown);
window.addEventListener("keyup", KeyUp);
setInterval(slowLoop, 1000);
setInterval(mainLoop, 16);
window.requestAnimationFrame(draw);