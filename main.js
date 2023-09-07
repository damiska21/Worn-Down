var canvas = document.createElement("canvas");canvas.width = window.innerWidth-20;canvas.height = window.innerHeight - 20;document.body.appendChild(canvas);var c = canvas.getContext("2d");
var playerX = 100;
var playerY = 100;
var oldPlayerX = playerX; var oldPlayerY = playerY;
var playerHeight = 75;
var playerWidth = 50;

var tile = 50;
var offset = 0;

var friction = 0;
var gravity = 0;
var ground = 500;
var onground = true;

var coyoteTime = false;
var coyoteTimeTick = 0;

var mezernikDown = false;
var leftDown = false;
var rightDown = false;
var attackDown = false;
var facing = "right";

var oldTopCollidedX = 0;
var oldTopCollidedY = 0;
var oldBotCollidedX = 0;
var oldBotCollidedY = 0;
var botCollided = false;

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
    if (!onground) {
        gravity += 1.2;
        playerY += gravity;
    }
    if (mezernikDown && (onground || coyoteTime)) {
        if (coyoteTime) {
            coyoteTime = false;
        }
        gravity = -17;
        onground = false;
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
var enemyX = [250];
var enemyY = [250];
var oldEnemyX = [250];
var oldEnemyY = [250];
var enemyOnground = [false];
var enemyGravity = [0];
var enemyOldTopCollidedX = [0];
var enemyOldTopCollidedY = [0];
var enemyOldBotCollidedX = [0];
var enemyOldBotCollidedY = [0];
var enemyBotCollided = [false];
function enemy() {
    enemyX[0] += friction;
    function spawnEnemy(x, y, hp) {
        
    }
    for (let i = 0; i < enemyX.length; i++) {
        if (!enemyOnground[i]) {
            enemyGravity[i] += 1.2;
            enemyY[i] += enemyGravity[i];
        }

        var colExitEnemy = collision(offset, enemyX[i], enemyY[i], 75, 50, oldEnemyX[i], oldEnemyY[i], enemyOnground[i], enemyGravity[i], enemyOldTopCollidedX, enemyOldTopCollidedY, enemyOldBotCollidedX, enemyOldBotCollidedY, enemyBotCollided);
        enemyX[i] = colExitEnemy[1]; enemyY[i] = colExitEnemy[2]; enemyOnground[i] = colExitEnemy[5]; enemyGravity[i] = colExitEnemy[6]; enemyOldBotCollidedX[i] = colExitEnemy[7]; enemyOldBotCollidedY[i] = colExitEnemy[8]; enemyBotCollided[i] = enemyBotCollided[9];
    }
}
var attackX = 0;
var attackY = 0;
var attackHitboxOn = false;
var attackTiming = 0;
function Attack() {
    if (attackDown && attackTiming == 0) {
        switch (facing) {
            case "left":
                attackX = playerX-100; attackY = playerY;
                attackHitboxOn = true;attackTiming =0;
                break;
            case "right":
                attackX = playerX+playerWidth; attackY = playerY;
                attackHitboxOn = true;attackTiming =0;
                break;
        }
    }
    if (attackHitboxOn) {
        attackTiming++;
        if (attackTiming == 10) {
            attackHitboxOn=false;
            attackTiming=0;
        }
    }
    attackDown = false;
}
function attacking(x, y) {
    c.fillStyle = "red";
        c.fillRect(x, y, 100, 75);
}
function KeyDown(event) {
    switch(event.keyCode) {
        case 32://mezernik
            mezernikDown = true;
            break;
        case 87://W
            mezernikDown = true;facing="up";
            break;
        case 65://A
            leftDown = true;facing = "left";
            break;
        case 68://D
            rightDown = true;facing = "right";
            break;
        case 74: //J
            attackDown = true;
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
        case 74://J
            attackDown = false;
            break;
    }
}
function Click(event) {
    switch (event.button) {
        case 0:
            attackDown = true;
            break;
        default:
            break;
    }
}
var moved = 1500; //hranice přechodu kamery
var playerOffset = 900; //offset hráče od okraje obrazovky při přechodu
var cameraOffset = 600; //offset kamery při přechodu
function Camera() {
    if (playerX > moved) {
        offset += cameraOffset;
        playerX-=moved - playerOffset;
        offset = (Math.floor(offset*0.01))*100;
        console.log(offset);

    }else if (playerX < 200 && offset != 0) {
        offset -= cameraOffset;
        console.log(playerX - playerOffset);
        playerX+=moved - playerOffset;
        offset = (Math.floor(offset*0.01))*100;
        console.log(offset);
    }
}

function draw() { //loop co běží na kolik hertzů je monitor (60/144 převážně)
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "#D4FFE6";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "blue";
    c.fillRect(playerX, playerY, playerWidth, playerHeight);

    tilemap(offset);

    if(attackHitboxOn){
        attacking(attackX, attackY);
    }

    for (let i = 0; i < enemyX.length; i++) {
        c.fillStyle = "purple";
        c.fillRect(enemyX[i], enemyY[i], 50, 75);
    }
    window.requestAnimationFrame(draw);
}
function mainLoop() { // loop co běží na 60 FPS (o něco víc actually ale chápeš)
    player();
    Camera();
    Attack();
    var colExitPlayer = collision(offset, playerX, playerY, playerHeight, playerWidth, oldPlayerX, oldPlayerY, onground, gravity); playerX = colExitPlayer[1]; playerY = colExitPlayer[2]; onground = colExitPlayer[5]; gravity = colExitPlayer[6];
    
    enemy();
}
function slowLoop() { //loop co se spouští jednou za vteřinu
canvas.width = window.innerWidth-20;canvas.height = window.innerHeight - 20;
}

window.addEventListener("keydown", KeyDown);
window.addEventListener("keyup", KeyUp);
window.addEventListener("mousedown", Click);
setInterval(slowLoop, 1000);
setInterval(mainLoop, 16);
window.requestAnimationFrame(draw);