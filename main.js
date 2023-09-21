var canvas = document.createElement("canvas");canvas.width = window.innerWidth-20;canvas.height = window.innerHeight - 20;document.body.appendChild(canvas);var c = canvas.getContext("2d");
var playerX = 100;
var playerY = 100;
var oldPlayerX = playerX; var oldPlayerY = playerY;
var playerHeight = 75;
var playerWidth = 50;

class entity {
    constructor(X, Y, height, width, hp, moveSpeed) {
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
        this.moving = "no",
        this.height = height,
        this.width = width,

        this.hp = hp,
        this.invulnerable = false,
        this.hitTimeTick = 0,
        this.hitTime = false,

        this.moveSpeed = moveSpeed,
    
        this.coyoteTime = false,
        this.coyoteTimeTick = 0
    }

    jump(){
        this.gravity = -17;
        this.onground = false;
    }
    move(direction){
        if (direction === undefined) {
            switch (this.moving) {
                case "left":
                    if (this.friction > -this.moveSpeed) {
                        this.friction -= 1.1;
                    }
                    break;
                case "right":
                    if (this.friction < this.moveSpeed) {
                        this.friction += 1.1;
                    }
                    break;
                case "no":
                    if (this.friction != 0) {
                        this.friction *= 0.8;
                    }
                    if (this.friction > -0.05 && this.friction < 0.05) {
                        this.friction = 0;
                    }
                    break;
                default:
                    break;
            }
            return;
        }
        switch (direction) {
            case "left":
                if (this.friction > -this.moveSpeed) {
                    this.friction += -1.1;
                    this.moving = "left";
                }
                break;
            case "right":
                if (this.friction < this.moveSpeed) {
                    this.friction += 1.1;
                    this.moving = "right";
                }
                break;
            case "no":
                if (this.friction != 0) {
                    this.friction *= 0.8;
                    this.moving = "no";
                }
                if (this.friction > -0.05 && this.friction < 0.05) {
                    this.friction = 0;
                    this.moving = "no";
                }
                break;
            default:
                break;
        }
    }
    hit(hitpoints, index){
        if (!this.invulnerable) {
            this.hp -= hitpoints;
            this.invulnerable = true; console.log("enemy " + index + " hp "+ this.hp);
        }
        
        this.hitTime = true;
        if (this.hp <= 0) {
            EA.E.splice(index, 1);
        }
    }

}

class enemies {
    constructor(){
        this.E = [];
    }
    newEnemy(X, Y, height, width, hp){
        let e = new entity(X, Y, height, width, hp);
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

var player = new entity(100, 100, 75, 50, 50, 10);
function playe() {
    player.oldX = player.X;

    
    
    //pohyb vpravo/vlevo a friction
    if (leftDown && player.friction > - 10) {
        player.friction += -1.1;
    }
    else if (rightDown && player.friction < 10) {
        player.friction += 1.1;
    }
    else{
        player.friction *= 0.8;
    }
    if(player.friction < 1 && player.friction > -1){
        player.friction = 0;
    }

    if(leftDown && player.friction > 1) {
        player.friction -=2;
    }else if (rightDown && player.friction < 1) {
        player.friction += 2;
    }
    player.X += player.friction;

    //skok a gravitace
    if (!player.onground) {
        player.gravity += 1.2;
        player.Y += player.gravity;
    }
    if (mezernikDown && (player.onground || player.coyoteTime)) {
        if (player.coyoteTime) {
            player.coyoteTime = false;
        }
        player.gravity = -17;
        player.onground = false;
    }

    //aby nevyskočil z mapy

    if (player.Y<0) {
        player.Y=0;
    }if (player.Y > (vyska * tile) + 50) {
        player.Y = 100;
        player.X = 100;
    }if (player.X < 0) {
        player.X = 0;
    }if (player.X > sirka * tile) {
        
    }

}
var EA = new enemies(); //EA znamená enemy array btw :D
//EA.newEnemy(250, 250, 75, 50, 3);
EA.newEnemy(550, 300, 75, 50, 3, 3); EA.E[0].move("right");

function enemy() {
    for (let i = 0; i < EA.getEnemyNum(); i++) {
        EA.E[i].oldX = EA.E[i].X;
        EA.E[i].X += EA.E[i].friction;

        EA.E[i].move();

        if (!EA.E[i].onground) {
            EA.E[i].gravity += 1.2;
        }
        EA.E[i].Y += EA.E[i].gravity;

        EA.E[i] = collisionT(EA.E[i], offset);

        if (EA.E[i].sideCollided == "right") {
            EA.E[i].move("no");
            EA.E[i].move("right");
        }
        if(EA.E[i].sideCollided == "left"){
            EA.E[i].move("no");
            EA.E[i].move("left");
        }
    }
}
var attackX = 0;
var attackY = 0;
var attackHitboxOn = false;
var attackTiming = 0;
var attackXsize = 100;
var attackYsize = 75;

var hitDamage = 1;
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
    if (EA.getEnemyNum() > 0) {
        for (let i = 0; i < EA.getEnemyNum(); i++) {

            if (EA.E[i].hitTime) {
                EA.E[i].hitTimeTick++;
            }if (EA.E[i].hitTimeTick >=20) {
                EA.E[i].hitTimeTick = 0;
                EA.E[i].hitTime = false;
                EA.E[i].invulnerable = false;
            }
            if(attackHitboxOn){//levý horní
                if (attackX < EA.E[i].X && attackY < EA.E[i].Y &&attackX+attackXsize > EA.E[i].X && attackY + attackYsize > EA.E[i].Y) {
                  EA.E[i].hit(hitDamage, i); 
                }//pravý horní
                else if (attackX < EA.E[i].X + EA.E[i].width && attackY < EA.E[i].Y &&attackX+attackXsize > EA.E[i].X + EA.E[i].width && attackY + attackYsize > EA.E[i].Y) {
                    EA.E[i].hit(hitDamage, i);
                }//levý dolní
                else if (attackX < EA.E[i].X && attackY < EA.E[i].Y + EA.E[i].height &&attackX+attackXsize > EA.E[i].X && attackY + attackYsize > EA.E[i].Y + EA.E[i].height) {
                    EA.E[i].hit(hitDamage, i);
                }//pravý dolní
                else if (attackX < EA.E[i].X + EA.E[i].width && attackY < EA.E[i].Y + EA.E[i].height &&attackX+attackXsize > EA.E[i].X + EA.E[i].width && attackY + attackYsize > EA.E[i].Y + EA.E[i].height) {
                    EA.E[i].hit(hitDamage, i);
                }//absoltní střed
                else if(attackX < EA.E[i].X + (EA.E[i].width / 2) && attackY < EA.E[i].Y + (EA.E[i].height / 2)&&attackX+attackXsize > EA.E[i].X + (EA.E[i].width / 2) && attackY + attackYsize > EA.E[i].Y + (EA.E[i].height / 2)){
                    EA.E[i].hit(hitDamage, i);
                }

                attackTiming++;
                if (attackTiming == 10) {
                    attackHitboxOn=false;
                    attackTiming=0;
                }
            }
        }
    }else{
        if (attackHitboxOn) {
            attackTiming++;
                if (attackTiming == 10) {
                    attackHitboxOn=false;
                    attackTiming=0;
                }
        }
    }
    attackDown = false;
}
//jenom na texturu
function attacking(x, y) {
    c.fillStyle = "red";
        c.fillRect(x, y, attackXsize, attackYsize);
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
    c.fillRect(player.X, player.Y, player.width, player.height);

    tilemap(offset, 2);

    if(attackHitboxOn){
        attacking(attackX, attackY);
    }

    for (let i = 0; i < EA.getEnemyNum(); i++) {
        if (EA.E[i].hitTime) {
            c.fillStyle = "purple";
        }else{
            c.fillStyle = "black";
        }
        c.fillRect(EA.E[i].X, EA.E[i].Y, EA.E[i].width, EA.E[i].height);
    }
    window.requestAnimationFrame(draw);
}
function mainLoop() { // loop co běží na 60 FPS (o něco víc actually ale chápeš)
    playe();
    player = collisionT(player, offset);
    Camera();
    Attack();
    
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