var canvas = document.createElement("canvas");canvas.width = window.innerWidth-20;canvas.height = window.innerHeight - 20;document.body.appendChild(canvas);var c = canvas.getContext("2d");

var playerX = 100;
var playerY = 150;
var oldPlayerX = playerX; var oldPlayerY = playerY;
var playerHeight = 75;
var playerWidth = 50;
var tile = 50;
var friction = 0;
var gravity = 0;
var ground = 500;
var onGround = true;

var mezernikDown = false;
var leftDown = false;
var rightDown = false;

function player() {
    oldPlayerX = playerX;
    oldPlayerY = playerY;
    
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
    if (mezernikDown && onGround) {
        gravity = -17;
        onGround = false;
    }

    //aby nevyskočil z mapy

    if (playerY<0) {
        playerY=0;
    }if (playerY > vyska * tile) {
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
function collision() {
    var topLeftX = (playerX-(playerX % tile)) / tile;
    var topLeftY = (playerY-(playerY % tile)) / tile;
    var topLeftTile = tilemapV[topLeftY][topLeftX];

    var botLeftX = (playerX-(playerX % tile)) / tile;
    var botLeftY = ((playerY + playerHeight +0.001)-((playerY + playerHeight +0.001) % tile)) / tile;
    var botLeftTile = tilemapV[botLeftY][botLeftX];

    var botLeftX2 = ((playerX-(playerX % tile))) / tile;
    var botLeftY2 = ((playerY + playerHeight - 5.001)-((playerY + playerHeight - 5.001) % tile)) / tile;
    var botLeftTile2 = tilemapV[botLeftY2][botLeftX2];

    var botRightX = ((playerX + playerWidth)-((playerX + playerWidth) % tile)) / tile;
    var botRightY = ((playerY + playerHeight +0.001)-((playerY + playerHeight +0.001) % tile)) / tile;
    var botRightTile = tilemapV[botRightY][botRightX];

    var botRightX2 = ((playerX + playerWidth)-((playerX + playerWidth) % tile)) / tile;
    var botRightY2 = ((playerY + playerHeight - 5.001)-((playerY + playerHeight - 5.001) % tile)) / tile;
    var botRightTile2 = tilemapV[botRightY2][botRightX2];

    var topRightX = ((playerX + playerWidth)-((playerX + playerWidth) % tile)) / tile;
    var topRightY = (playerY-(playerY % tile)) / tile;
    var topRightTile = tilemapV[topRightY][topRightX];


    /*if (!topCollision()) {
        if (!rightCollision()) {
            if(botRightTile2 > 2 && botRightTile2 <7){
                leftCollision();
            }
        }
    }*/

    if (botLeftTile > 0) {
        if(!topCollision("botLeft", botLeftTile)){
            if(botLeftTile2 > 2 && botLeftTile2 <7){
                rightCollision();
            }
        }
    }
    if (botRightTile > 0) {
        if(!topCollision("botRight", botRightTile)){
            if(botRightTile2 > 2 && botRightTile2 <7){
                leftCollision();
            }
        }
    }

    if ((topLeftTile > 2 && topLeftTile < 7) || (botLeftTile2 > 2 && botLeftTile2 <7)) {
        rightCollision();
    } else if ((topRightTile == 2 || topRightTile == 7) || (botRightTile2 > 2 && botRightTile2 <7)) {
        leftCollision();
    }

    /*if (botLeftTile != 0 || botRightTile != 0) {
        if(!topCollision()){
            
            if ((topLeftTile > 2 && topLeftTile < 7) || (botLeftTile2 > 2 && botLeftTile2 <7)) {
                rightCollision();
            } else if ((topRightTile == 2 || topRightTile == 7) || (botRightTile2 > 2 && botRightTile2 <7)) {
                leftCollision();
            }
        }
    }*/

    if (topRightTile == 8 || topLeftTile == 8) {
        botCollision();
    }
    
    
    if (botLeftTile == 0 && botRightTile == 0) { onGround = false;} //padání (detekce bloků pod hráčem)
    
    function botCollision() {
        if (gravity < 0) {
        playerY += tile - (playerY % tile);
        }
    }
    function topCollision(playerTile, index) { //pokud byla kolize provedena vrací true
        if (gravity > 0) {//jinak false
            if (index == 1 || (index > 4 && index < 8)) {
                if(playerTile === "botLeft") {
                    if((botLeftY)*tile > oldPlayerY + playerHeight) {
                        playerY -= (playerY+playerHeight) % tile;
                        gravity = 0;
                        onGround = true;
                        return true;
                    }
                }
                if(playerTile === "botRight"){
                    if ((botRightY+1)*tile > oldPlayerY + playerHeight) {
                        playerY -= (playerY+playerHeight) % tile;
                        gravity = 0;
                        onGround = true;
                        return true;
                    }  
                }
            }
        }else if(onGround) {
            return true;
        }
        return false;
    }
    function rightCollision() {
        if (friction < 0) {
            if (oldPlayerX > botLeftX*tile +tile) {
                if (topLeftTile > 2 && topLeftTile < 7) {
                    playerX = topLeftX*tile + tile + 0.01; 
                    return true;
                }else if(botLeftTile2 > 2 && botLeftTile2 <7){
                    playerX = botLeftX*tile + tile + 0.01; 
                    return true;
                }
            }
        }
        return false;
    }

    function leftCollision() {
        if (friction > 0) {
            console.log(oldPlayerX + " b: " + (topRightX*tile - 0.01 - tile));
            if (oldPlayerX+playerWidth< (topRightX+2)*tile - 0.01 - tile) {
                if ((topRightTile == 2 || topRightTile == 7)) {
                    playerX = topRightX*tile - 0.01 - tile;
                    return true;
                }else if(botRightTile2 > 2 && botRightTile2 <7){
                    playerX = botRightX*tile - 0.01 - tile;
                    return true;
                }
            }
        }
        return false;
    }
}
function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "blue";
    c.fillRect(playerX, playerY, playerWidth, playerHeight);

    tilemap();
}

function mainLoop() {
    player();
    collision();
    draw();
    window.requestAnimationFrame(mainLoop);
}
function slowerMainLoop() {
canvas.width = window.innerWidth-20;canvas.height = window.innerHeight - 20;
}

window.addEventListener("keydown", KeyDown);
window.addEventListener("keyup", KeyUp);
setInterval(slowerMainLoop, 500);
window.requestAnimationFrame(mainLoop);