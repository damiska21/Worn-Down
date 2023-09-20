var canvas = document.createElement("canvas");canvas.width = window.innerWidth-20;canvas.height = window.innerHeight - 20;document.body.appendChild(canvas);var c = canvas.getContext("2d");
var playerX = 100;
var playerY = 100;
var oldPlayerX = playerX; var oldPlayerY = playerY;
var playerHeight = 75;
var playerWidth = 50;

class entity {
    constructor(X, Y, height, width) {
        this.X = X,
        this.Y = Y,
        this.oldX = 0,
        this.oldY = 0,
        this.onground = false,
        this.gravity = 0,
        this.friction= 0,
        this.oldTopCollidedX= -1,
        this.oldTopCollidedY= -1,
        this.oldBotCollidedX= -1,
        this.oldBotCollidedY= -1,
        this.botCollided = false,
        this.sideCollided = "left",
        this.moving = false,
        this.height = height,
        this.width = width,
    
        this.coyoteTime = 0,
        this.coyoteTimeTick = 0
    }

    jump(){
        this.gravity = -17;
    }
    move(direction){
        switch (direction) {
            case "left":
                if (friction > -10) {
                    this.friction += -1.1;
                }
                break;
            case "right":
                if (friction < 10) {
                    this.friction += 1.1;
                }
                break;
            case "no":
                if (friction > 0 || friction < 0) {
                    this.friction *= 0.8;
                }
                if (friction > -0.05 && friction < 0.05) {
                    this.friction = 0;   
                }
                break;
            default:
                break;
        }
    }
}

class enemies {
    constructor(){
        this.E = [];
    }
    newEnemy(X, Y, height, width){
        let e = new entity(X, Y, height, width);
        this.E.push(e);
    }
    getEnemyNum(){
        return this.E.length;
    }
    getEnemy(index){
        return this.E[index];
    }
}
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
var EA = new enemies(); //EA znamená enemy array btw :D
EA.newEnemy(250, 250, 75, 50);
EA.newEnemy(350, 100, 75, 50);

function enemy() {
    for (let i = 0; i < EA.getEnemyNum(); i++) {
        EA.E[i].oldX = EA.E[i].X;
        EA.E[i].X += EA.E[i].friction;

        if (!EA.E[i].onground) {
            EA.E[i].gravity += 1.2;
        }
        EA.E[i].Y += EA.E[i].gravity;

        EA.E[i] = collisionT(EA.E[i], offset);

        if (EA.E[i].sideCollided == "right" || EA.E[i].sideCollided == "left") {
            //EA.E[i].move("no");
            EA.E[i].jump();
        }
    }
}
var attackX = 0;
var attackY = 0;
var attackHitboxOn = false;
var attackTiming = 0;
var attackXsize = 100;
function Attack() {
    if (attackDown && attackTiming == 0) {
        switch (facing) {
            case "left":
                attackX = playerX-attackXsize; attackY = playerY;
                attackHitboxOn = true;attackTiming =0;
                break;
            case "right":
                attackX = playerX+playerWidth; attackY = playerY;
                attackHitboxOn = true;attackTiming =0;
                break;
        }
    }
    if(attackHitboxOn){
        for (let i = 0; i < EA.getEnemyNum(); i++) {
            console.log(EA.E[i].Y+" > "+attackY);
            if (EA.E[i].X > attackX && EA.E[i].Y > attackY && EA.E[i].X + EA.E[i].height < attackX+attackXsize && EA.E[i].Y + 75) {
              console.log("niga");  
            }
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
//jenom na texturu
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

        for (let i = 0; i < enemyE.X.length; i++) {
            enemyE.X[i]-=moved - playerOffset;
        }
    }else if (playerX < 200 && offset != 0) {
        offset -= cameraOffset;
        console.log(playerX - playerOffset);
        playerX+=moved - playerOffset;
        offset = (Math.floor(offset*0.01))*100;
        console.log(offset);
        for (let i = 0; i < 5/*niga*/ ; i++) {
            enemyE.X+=moved - playerOffset;
        }
    }
    
}

function draw() { //loop co běží na kolik hertzů je monitor (60/144 převážně)
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "#D4FFE6";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "blue";
    c.fillRect(playerX, playerY, playerWidth, playerHeight);

    tilemap(offset, 2);

    if(attackHitboxOn){
        attacking(attackX, attackY);
    }

    for (let i = 0; i < EA.getEnemyNum(); i++) {
        c.fillStyle = "black";
        c.fillRect(EA.E[i].X, EA.E[i].Y, EA.E[i].width, EA.E[i].height);
    }
    window.requestAnimationFrame(draw);
}
function mainLoop() { // loop co běží na 60 FPS (o něco víc actually ale chápeš)
    player();
    Camera();
    Attack();
    var colExitPlayer = collision(offset, playerX, playerY, playerHeight, playerWidth, oldPlayerX, oldPlayerY, onground, gravity, "player"); playerX = colExitPlayer[1]; playerY = colExitPlayer[2]; onground = colExitPlayer[5]; gravity = colExitPlayer[6];
    
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