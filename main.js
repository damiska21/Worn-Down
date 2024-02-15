var canvas = document.createElement("canvas");canvas.width = window.innerWidth-20;canvas.height = window.innerHeight - 20;document.body.appendChild(canvas);var c = canvas.getContext("2d");

var mezernikDown = false;
var leftDown = false;
var rightDown = false;
var attackDown = false;
var skillDown = false;

var gameOver = false;

var offset = 0;
var Yoffset = 0;
var cameraShakeCounter = 0;
var cameraShakeX = 0;
var cameraShakeY = 0;
var cameraLock = false;
var movementLock = false;

var pause = false;

function KeyDown(event) {
    switch(event.keyCode) {
        case 32://mezernik
            mezernikDown = true; break;
        case 87://W
            mezernikDown = true;  break;
        case 65://A
            leftDown = true;player.facing = "left"; break;
        case 68://D
            rightDown = true;player.facing = "right"; break;
        case 83: //S
            /*player.facing = "down";*/break;//tady stačí vědět že míří dolů pro útok
        case 74: //J
            attackDown = true; break;
        case 75:/*K*/ 
            skillDown = true; break;
    }
}
function KeyUp(event) {
    switch(event.keyCode) {
        case 32:/*mezernik*/ mezernikDown = false; break;
        case 87: mezernikDown = false;   break;
        case 65:/*A*/ leftDown = false;  break;
        case 68:/*D*/ rightDown = false; break;
        case 74:/*J*/ attackDown = false;break;
        case 27:/*Esc*/ pause = !pause;  break;
        case 75:/*K*/ skillDown = false; break;
    }
}
function Click(event) {
    switch (event.button) {
        case 0: attackDown = true; break;
    }
}

function Camera() {
    if (cameraShakeCounter>0) {
        offset -=cameraShakeX;
        Yoffset -=cameraShakeY;
        cameraShakeX = (Math.round(Math.random()*cameraShakeCounter*4) - Math.round(Math.random()*cameraShakeCounter*2));
        cameraShakeY = (Math.round(Math.random()*cameraShakeCounter*4)-Math.round(Math.random()*cameraShakeCounter*2));
        offset +=cameraShakeX;
        Yoffset +=cameraShakeY;
        console.log(cameraShakeX + " " + cameraShakeY);
        cameraShakeCounter--;
    }
    if (cameraLock) {return;}
    
    //X kamera
    if(player.X - offset > window.innerWidth/2) {
        offset += 6;
    }else if(player.X - offset < 200) {
        offset -=6;
    }
    //vyšší zrychlení pokud je hráč na okraji obrazovky
    if(player.X - offset > (window.innerWidth-100)) {
        offset +=6;
    }
    if (player.X - offset < 100) {
        offset -=6;
    }

    //rychlý návrat na spawn (převážně)
    if (player.X - offset < -100) {
        offset-=20;
    }
    //aby kamera nešla do mínusu
    if(offset<0) {
        offset= 0;
    }

    //Y kamera
    if (player.Y - Yoffset > window.innerHeight-350) {
        Yoffset+=5;
        if (player.Y - Yoffset > window.innerHeight-150) {
            Yoffset+=8;
        }
    }else if(player.Y - Yoffset < 250) {
        Yoffset -=5;
        if (player.Y - Yoffset < 100) {
            Yoffset -=5;
        }
    }

    if (Yoffset <0) {
        Yoffset = 0;
    }
}

function Kniha() {
    kniha.moveCheck();
}
class book{
    constructor(){
        this.X = 0,
        this.Y = 0,
        this.height = 20,
        this.width = 20,
        this.moveX = this.X,//místo, kam knížka míří
        this.moveY = this.Y,
        this.moveTrue = false,
        this.Xfriction = 0,
        this.Yfriction = 0,
        this.entityBind = player //entita na kterou se knížka lepí
    }
    moveCheck(){
        if (!this.moveTrue) {
            if (this.entityBind.facing == "left") {
                this.moveX = this.entityBind.X - 50;
                this.moveY = this.entityBind.Y + 30;
            }else if(this.entityBind.facing == "right") {
                this.moveX = this.entityBind.X + this.entityBind.width + 30;
                this.moveY = this.entityBind.Y + 30;
                //console.log((this.entityBind.Y + (this.entityBind.height/2)) + " " + this.entityBind.Y);
            }
        }

        //pohyb knížky na určitý místo
        this.Xfriction*=0.9;
        this.Yfriction*=0.9;
        if (this.moveX-30 > this.X) {
            this.Xfriction+=1;
        }else if (this.moveX+30 < this.X) {
            this.Xfriction-=1;
        }

        if (this.moveY > this.Y) {
            this.Yfriction+=1;
        }else if(this.moveY+30 < this.Y) {
            this.Yfriction -=1;
        }
        this.X += this.Xfriction;
        this.Y += this.Yfriction;
    }
}
var kniha = new book();

function mainLoop() { // loop co běží na 60 FPS (o něco víc actually ale chápeš)
    if (pause || gameOver) {return;}
    playerFunc();
    collision(player);
    Camera();
    Kniha();
    Attack();
    Skill();
    enemyFunc();
    levelLoop();
    playerAnimTimingF();
}
//na celý čísla od nuly do to
function randomNum(to) {
    var num = Math.floor(Math.random()*to);
    return num;
}
function slowLoop() { //loop co se spouští jednou za vteřinu
canvas.width = window.innerWidth-20;canvas.height = window.innerHeight - 20;
}

function initiate(){
    //particlesInitiate();
    setInterval(mainLoop, 16);
    window.requestAnimationFrame(draw);
    player.facing = "right";
}

window.addEventListener("keydown", KeyDown);
window.addEventListener("keyup", KeyUp);
window.addEventListener("mousedown", Click);
window.addEventListener("load", initiate);
window.addEventListener("resize", slowLoop);