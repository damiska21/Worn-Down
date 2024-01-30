var canvas = document.createElement("canvas");canvas.width = window.innerWidth-20;canvas.height = window.innerHeight - 20;document.body.appendChild(canvas);var c = canvas.getContext("2d");

var mezernikDown = false;
var leftDown = false;
var rightDown = false;
var attackDown = false;
var skillDown = false;

var gameOver = false;

var offset = 0;
var Yoffset = 0;
var cameraLock = false;

var pause = false;

function KeyDown(event) {
    switch(event.keyCode) {
        case 32://mezernik
            mezernikDown = true; break;
        case 87://W
            mezernikDown = true; player.facing="up"; break;
        case 65://A
            leftDown = true;player.facing = "left"; break;
        case 68://D
            rightDown = true;player.facing = "right"; break;
        case 83: //S
            player.facing = "down";break;//tady stačí vědět že míří dolů pro útok
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

function mainLoop() { // loop co běží na 60 FPS (o něco víc actually ale chápeš)
    if (pause || gameOver) {return;}
    playerFunc();
    collision(player);
    Camera();
    Attack();
    Skill();
    enemyFunc();
    levelLoop();
}
function slowLoop() { //loop co se spouští jednou za vteřinu
canvas.width = window.innerWidth-20;canvas.height = window.innerHeight - 20;
}

function initiate(){
    //particlesInitiate();
    setInterval(slowLoop, 1000);
    setInterval(mainLoop, 16);
    window.requestAnimationFrame(draw);
}

window.addEventListener("keydown", KeyDown);
window.addEventListener("keyup", KeyUp);
window.addEventListener("mousedown", Click);
window.addEventListener("load", initiate);