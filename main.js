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
        this.stunTime = 0,

        this.moveSpeed = moveSpeed,
    
        this.coyoteTime = false,
        this.coyoteTimeTick = 0
    }

    jump(){
        this.gravity = -17;
        this.onground = false;
    }
    move(direction){
        if (this.stunTime > 0) {
            return;
        }
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
    hit(hitpoints, index, direction){
        if (!this.invulnerable) {
            this.hp -= hitpoints;
             console.log("enemy " + index + " hp "+ this.hp);
            if(index != -1){
                this.invulnerable = true;
                this.friction = 0;
                this.stunTime = 25;

                if (direction == "left") {
                    this.friction = -6;
                    this.gravity -= -10;
                }else if(direction == "right"){
                    this.friction = 6;
                    this.gravity = -10;
                }
        
                this.hitTime = true;
                if (this.hp <= 0) {
                    console.log("smazán index" + index);
                    EA.E.splice(index, 1);
                }
                return;
            }

            this.invulnerable = true;
            if (direction == "left") {
                this.friction = -15;
                this.gravity = -15;
            }else if(direction == "right"){
                this.friction = 15;
                this.gravity = -15;
            }
            if (this.hp <= 0) {
                console.log("GAME OVER");
                gameOver = true;
            }
        }
    }

}

class enemies {
    constructor(){
        this.E = [];
    }
    newEnemy(X, Y, height, width, hp, moveSpeed){
        let e = new entity(X, Y, height, width, hp, moveSpeed);
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

var mezernikDown = false;
var leftDown = false;
var rightDown = false;
var attackDown = false;
var facing = "right";

var respawnX = 0;
var respawnY = 0;

var gameOver = false;

var player = new entity(100, 100, 75, 50, 5, 10);
function playerFunc() {
    player.oldX = player.X;
    player.oldY = player.Y;
    if (player.invulnerable) {
        player.hitTimeTick--;
    }if (player.hitTimeTick == 0) {
        player.hitTimeTick = 10;
        player.invulnerable = false;
        console.log("invul stop");
    }
    //pohyb vpravo/vlevo a friction
    if (leftDown && player.friction > - 10) {
        player.friction += -1.1;
    }
    else if (rightDown && player.friction < 10) {
        player.friction += 1.1;
    }
    else if (player.invulnerable) {
        //player.friction *= 0.85;
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
    player.Y += player.gravity;
    if (!player.onground) {
        player.gravity += 1.2;
    }
    if (mezernikDown && (player.onground || player.coyoteTime)) {
        if (player.coyoteTime) {
            player.coyoteTime = false;
        }
        player.gravity = -17;
        player.onground = false;
        if (player.moving != "no") {
            player.friction *=1.5;
        }
    }

    //aby nevyskočil z mapy

    if (player.Y<0) {
        player.Y=0;
    }if (player.Y > window.innerHeight + 500) {
        player.Y = respawnY;
        player.X = respawnX;
    }if (player.X < 0) {
        player.X = 0;
    }if (player.X > sirka * tile) {
        
    }
}
var EA = new enemies(); //EA znamená enemy array btw :D
//EA.newEnemy(250, 250, 75, 50, 3);

function enemy() {
    for (let i = 0; i < EA.getEnemyNum(); i++) {
        if (EA.E[i].X-offset > window.innerWidth) {
            continue;
        }
        EA.E[i].oldX = EA.E[i].X;
        EA.E[i].X += EA.E[i].friction;

        if (EA.E[i].stunTime > 0) {
            EA.E[i].stunTime--;
        }else{
            EA.E[i].move();
        }

        if (!EA.E[i].onground) {
            EA.E[i].gravity += 1.2;
        }
        EA.E[i].Y += EA.E[i].gravity;

        EA.E[i] = collisionT(EA.E[i], offset, Yoffset);

        if (EA.E[i].sideCollided == "right") {
            EA.E[i].move("no");
            EA.E[i].move("right");
        }
        if(EA.E[i].sideCollided == "left"){
            EA.E[i].move("no");
            EA.E[i].move("left");
        }

        //PLAYER KOLIZE - top right
        if ((player.X + player.width > EA.E[i].X && player.X + player.width < EA.E[i].X + EA.E[i].width)/*X*/ && (player.Y >= EA.E[i].Y && player.Y < EA.E[i].Y + EA.E[i].height)) {
            console.log("top right p hit");
            player.hit(1, -1, "left");
            EA.E[i].stunTime = 25;
        }
        //top left
        else if((player.X > EA.E[i].X && player.X < EA.E[i].X + EA.E[i].width)/*X*/ && (player.Y >= EA.E[i].Y && player.Y < EA.E[i].Y + EA.E[i].height)){
            console.log("top left p hit");
            player.hit(1, -1, "right");
            EA.E[i].stunTime = 25;
        }
        //bot right
        else if ((player.X + player.width > EA.E[i].X && player.X + player.width < EA.E[i].X + EA.E[i].width)/*X*/ && (player.Y + player.height >= EA.E[i].Y && player.Y+ player.height < EA.E[i].Y + EA.E[i].height)) {
            console.log("bot right p hit");
            player.hit(1, -1, "left");
            EA.E[i].stunTime = 25;
        }
        //bot left
        else if ((player.X > EA.E[i].X && player.X < EA.E[i].X + EA.E[i].width)/*X*/ && (player.Y + player.height >= EA.E[i].Y && player.Y+ player.height < EA.E[i].Y + EA.E[i].height)) {
            console.log("bot left p hit");
            player.hit(1, -1, "right");
            EA.E[i].stunTime = 25;
        }
    }
}
var attackX = 0;
var attackY = 0;
var attackHitboxOn = false;
var attackTiming = 0;
var attackXsize = 100;
var attackYsize = 75;
var invulnerableTiming = 15;//čas jak dlouho je enemy invulnerable na attacky (aby netankoval dva hity při jednom útoku hráče)

var hitDamage = 1; //kolik dává damage (hp je přímo v enemy)
function Attack() {
    if (attackDown && attackTiming == 0) {
        switch (facing) {
            case "left":
                attackX = player.X-attackXsize; attackY = player.Y;
                attackHitboxOn = true;attackTiming =0;
                break;
            case "right":
                attackX = player.X+player.width; attackY = player.Y;
                attackHitboxOn = true;attackTiming =0;
                break;
        }
    }
    if (EA.getEnemyNum() > 0) {
        for (let i = 0; i < EA.getEnemyNum(); i++) {

            if (EA.E[i].hitTime) {
                EA.E[i].hitTimeTick++;
            }if (EA.E[i].hitTimeTick >=invulnerableTiming) {
                EA.E[i].hitTimeTick = 0;
                EA.E[i].hitTime = false;
                EA.E[i].invulnerable = false;
            }
            if(attackHitboxOn){//levý horní
                if (attackX < EA.E[i].X && attackY < EA.E[i].Y &&attackX+attackXsize > EA.E[i].X && attackY + attackYsize > EA.E[i].Y) {
                  EA.E[i].hit(hitDamage, i, facing); 
                }//pravý horní
                else if (attackX < EA.E[i].X + EA.E[i].width && attackY < EA.E[i].Y &&attackX+attackXsize > EA.E[i].X + EA.E[i].width && attackY + attackYsize > EA.E[i].Y) {
                    EA.E[i].hit(hitDamage, i, facing);
                }//levý dolní
                else if (attackX < EA.E[i].X && attackY < EA.E[i].Y + EA.E[i].height &&attackX+attackXsize > EA.E[i].X && attackY + attackYsize > EA.E[i].Y + EA.E[i].height) {
                    EA.E[i].hit(hitDamage, i, facing);
                }//pravý dolní
                else if (attackX < EA.E[i].X + EA.E[i].width && attackY < EA.E[i].Y + EA.E[i].height &&attackX+attackXsize > EA.E[i].X + EA.E[i].width && attackY + attackYsize > EA.E[i].Y + EA.E[i].height) {
                    EA.E[i].hit(hitDamage, i, facing);
                }//absoltní střed
                else if(attackX < EA.E[i].X + (EA.E[i].width / 2) && attackY < EA.E[i].Y + (EA.E[i].height / 2)&&attackX+attackXsize > EA.E[i].X + (EA.E[i].width / 2) && attackY + attackYsize > EA.E[i].Y + (EA.E[i].height / 2)){
                    EA.E[i].hit(hitDamage, i, facing);
                }
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
        case 27: //Esc
            pause = !pause;
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

var offset = 0;
var Yoffset = 0;
var cameraLock = false;
function Camera() {
    if (cameraLock) {return;}
    
    //X kamera
    if(player.X - offset > window.innerWidth/2) {
        offset += 6;
        //console.log(player.X-offset + " > " + (window.innerWidth/2));
    }else if(player.X - offset < 200) {
        offset -=6;
        //console.log(player.X-offset + " < " + 200);
    }if(player.X - offset > (window.innerWidth-100)) {
        offset +=6;
        //console.log(player.X-offset + " > " + (window.innerWidth-100));
    }if (player.X - offset < 100) {
        offset -=6;
        //console.log(player.X-offset + " < " + 100);
    }
    if (player.X - offset < -100) {
        offset-=20;
        //console.log(player.X-offset + " < " + -100);
    }
    if(offset<0) {
        offset= 0;
        //console.log("offset 0");
    }
    //Y kamera
    if (player.Y - Yoffset> window.innerHeight-200) {
        Yoffset+=5;
    }else if(player.Y - Yoffset < 300) {
        Yoffset -=5;
    }
    if (Yoffset <0) {
        Yoffset = 0;
    }/*if(player.X - offset > window.innerWidth*0.2) {
        Yoffset += 5;
    }else if(player.X - offset < window.innerWidth*0.2) {
        Yoffset -=5;
    }*/
}
var harambe = new Image();
harambe.src = "img/harambe.png";

var smurfcat = new Image();
smurfcat.src = "img/player.png";

function draw() { //loop co běží na kolik hertzů je monitor (60/144 převážně)

    c.fillStyle = "#D4FFE6";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "blue";
    //c.fillRect(player.X, player.Y, player.width, player.height); //starej kód na čtverec
    c.drawImage(smurfcat, player.X-offset, player.Y-Yoffset)


    if(attackHitboxOn){
        c.fillStyle = "red";
        c.fillRect(attackX-offset, attackY-Yoffset, attackXsize, attackYsize);
    }

    tilemapDraw(offset);

    for (let i = 0; i < EA.getEnemyNum(); i++) {
        if (EA.E[i].hitTime) {
            c.fillStyle = "purple";
        }else{
            c.fillStyle = "black";
        }
        //c.fillRect(EA.E[i].X, EA.E[i].Y, EA.E[i].width, EA.E[i].height);
        c.drawImage(harambe, EA.E[i].X-offset, EA.E[i].Y-Yoffset);
    }
    if (pause) {
        c.font = "30px Arial";
        c.fillText("Pozastaveno", 10, 50);
    }if (gameOver) {
        c.font = "30px Arial";
        c.fillText("Prohral jsi!", 10, 50);
    }
    window.requestAnimationFrame(draw);
}
var pause = false;
function mainLoop() { // loop co běží na 60 FPS (o něco víc actually ale chápeš)
    if (pause || gameOver) {return;}
    playerFunc();
    player = collisionT(player, offset, Yoffset);
    Camera();
    Attack();
    
    enemy();
    levelLoop();
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