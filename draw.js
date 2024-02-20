class textArr{
    constructor(){
        this.array = [];
    }
    drawAllText(){
        for (let i = 0; i < this.array.length; i++) {
            this.array[i].drawText();
            if (this.array[i].textUpdate() == 1) {
                this.array.splice(i, 1);
            }
        }
    }
    newText(texti, x, y, size, timeSpan){
        let g = new text(texti, x, y, size, timeSpan);
        this.array.push(g);
    }
}
var textArray = new textArr();
class text{
    constructor(text, x, y, size, timeSpan){
        this.text = text,
        this.X = x,
        this.Y = y,
        this.font = "Silkscreen",
        this.size = size,
        this.abovePlayer = false,
        this.timeActive = 0,
        this.timeSpan = timeSpan
    }
    drawText(){
        if (this.abovePlayer) {
            this.X = player.X-100;
            this.Y = player.Y-100;
        }
        c.fillStyle = "black";
        c.font = this.size.toString()+"px " + this.font.toString();
        c.fillText(this.text, this.X-offset, this.Y-Yoffset);
    }
    textUpdate(){
        this.timeActive++;
        if (this.timeSpan <= this.timeActive && this.timeSpan != -1) {
            return 1;
        }
    }
}

var harambe = new Image();
harambe.src = "img/enemy/harambe.png";

//offsety X 10 Y 0 velikost 68 X 100 Y
var turretImg = new Image();
turretImg.src = "img/GAME_animations/enemy/turret.png";
var bulletImg = new Image();
bulletImg.src = "img/enemy/attack(turret).png"

var playerImg = new Image();
playerImg.src = "img/player/player_1.png";
//40 zhora zdola - 50 zboku

var tilemapFinalImg = new Image();
tilemapFinalImg.src = "img/tilemap/tilemapVykresleni.png";

//X 40 offset 80 body
//Y 20 offset 160 body
var walkingSpriteLeft = new Image();
walkingSpriteLeft.src = "img/player/walking_animation(left)).png";
var walkingSpriteRight = new Image();
walkingSpriteRight.src = "img/player/walking_animation(right).png";
var standingSpriteLeft = new Image();
standingSpriteLeft.src = "img/player/standing_animation(left).png";
var standingSpriteRight = new Image();
standingSpriteRight.src = "img/player/standing_animation(right).png";

var jumpingSpriteRight = new Image();
jumpingSpriteRight.src = "img/player/jJumpR(up).png";
var jumpingSpriteLeft = new Image();
jumpingSpriteLeft.src = "img/player/jJumpL(up).png";

var fallingSpriteRight = new Image();
fallingSpriteRight.src = "img/player/jJumpR(down).png";
var fallingSpriteLeft = new Image();
fallingSpriteLeft.src = "img/player/jJumpL(down).png";

var playerJumpSprite = new Image();
playerJumpSprite.src = "img/player/jump.png";

var knihaSprite = new Image();
knihaSprite.src = "img/GAME_animations/Book/book(animation)t.png";
var knihaAttackSprite = new Image();
knihaAttackSprite.src = "img/GAME_animations/Book/bookAttack.png";
var knihaAttackLSprite = new Image();
knihaAttackLSprite.src = "img/GAME_animations/Book/bookAttackL.png";

//enemyGolem (Y/170, X/60, YOffset/10,  XOffset/10)
var golemSprite = new Image();
golemSprite.src = "img/GAME_animations/enemy/enemyGolem.png";

var buttonSprite = new Image();
buttonSprite.src = "img/GAME_animations/Button/buttonSOff.png";
var buttonDownSprite = new Image();
buttonDownSprite.src = "img/GAME_animations/Button/buttonSOn.png";
var buttonAnimFrame = 0; var buttonAnimTiming = 0;

var silverfishSprite = new Image();
silverfishSprite.src = "img/GAME_animations/enemy/enemy2.png";
var silverfishAnimFrame = 0; var silverfishAnimTiming = 0;

//COUNTER kolikrát Lukáš nebyl schopný správně spočítat pixely
//12
var turretAnimTiming = 0;
var turretAnimFrame = 0;
function draw() { //loop co běží na kolik hertzů je monitor (60/144 převážně)

    //všechno co se vykresluje potřebuje -offset !!!
    
    c.fillStyle = "gray";
    c.fillRect(0, 0, canvas.width, canvas.height);

    levelDraw(c);

    for (let i = 0; i < EA.getEnemyNum(); i++) {
        //c.fillRect(EA.E[i].X, EA.E[i].Y, EA.E[i].width, EA.E[i].height);
        switch (EA.E[i].type) {
            case "shooter":
                //offset 10 na X 68 100
                switch (EA.E[i].entity.facing) {
                    case "down":
                        c.save();
                        c.translate((EA.E[i].entity.X + EA.E[i].entity.width/2)-offset, (EA.E[i].entity.Y + EA.E[i].entity.height/2)-Yoffset);
                        //c.rotate(180* Math.PI / 180);
                        c.scale(1,-1);
                        c.translate(-((EA.E[i].entity.X + EA.E[i].entity.width/2)-offset), -((EA.E[i].entity.Y + EA.E[i].entity.height/2)-Yoffset));
                        //c.scale(1,-1);
                        break;
                    case "right":
                        c.save();
                        c.translate((EA.E[i].entity.X + EA.E[i].entity.width/2)-offset, (EA.E[i].entity.Y + EA.E[i].entity.height/2)-Yoffset);
                        //c.rotate(180* Math.PI / 180);
                        c.scale(-1,1);
                        c.translate(-((EA.E[i].entity.X + EA.E[i].entity.width/2)-offset), -((EA.E[i].entity.Y + EA.E[i].entity.height/2)-Yoffset));
                    default:
                        break;
                }
                //console.log(turretAnimFrame*88);
                c.drawImage(turretImg, turretAnimFrame*88, 0, 88, 100, EA.E[i].entity.X-offset-10, EA.E[i].entity.Y-Yoffset, 88,100);
                c.restore();
                turretAnimTiming++;
                if (turretAnimTiming >= 15) {
                    turretAnimFrame++;
                    turretAnimTiming = 0;
                }if (turretAnimFrame >= 8) {
                    turretAnimFrame = 0;
                }
                break;
            case "golem":
                EA.E[i].drawEnemy();
                break;
            default:
                //X 130  Y 97
                if (EA.E[i].entity.facing == "left") {
                    c.save();
                    c.translate((EA.E[i].entity.X + EA.E[i].entity.width/2)-offset, (EA.E[i].entity.Y + EA.E[i].entity.height/2)-Yoffset);
                    //c.rotate(180* Math.PI / 180);
                    c.scale(1,-1);
                    c.translate(-((EA.E[i].entity.X + EA.E[i].entity.width/2)-offset), -((EA.E[i].entity.Y + EA.E[i].entity.height/2)-Yoffset));
                }
                c.drawImage(silverfishSprite, silverfishAnimFrame*130, 0, 130, 97, EA.E[i].entity.X-offset, EA.E[i].entity.Y-Yoffset, 130,97);
                c.restore();
                silverfishAnimTiming++;
                if (silverfishAnimTiming >= 10) {
                    silverfishAnimFrame++;
                    silverfishAnimTiming = 0;
                }if (silverfishAnimFrame >= 12) {
                    silverfishAnimFrame = 0;
                }
                break;
        }
    }

    for (let j = 0; j < triggers.getEnemyNum(); j++) {
        //button (Y/90, X/90, YOffset/10, XOffset/10)
        if (triggers.E[j].triggered) {
            //button (Y/90, X/90, YOffset/10, XOffset/10)
            c.drawImage(buttonDownSprite, buttonAnimFrame*110, 0, 110,110,triggers.E[j].entity.X-offset-10, triggers.E[j].entity.Y-Yoffset-10, 110 ,110);
        }else {
            c.drawImage(buttonSprite, buttonAnimFrame*110, 0, 110,110,triggers.E[j].entity.X-offset-10, triggers.E[j].entity.Y-Yoffset-10, 110, 110);
        }
    }

    tilemapDraw(offset);

drawPlayer();
bookAnimation(c);

    //útok nepřítele
    for (let i = 0; i < EA.getEnemyNum(); i++) {
        //EA.E[i].attackHandler.drawAttack();
        if (!EA.E[i].attackHandler.hitboxOn) {continue;}

        //c.fillStyle = "red";//přepsat na img, offset je
        //c.fillRect(EA.E[i].attackHandler.X-offset-20, EA.E[i].attackHandler.Y-Yoffset-20, EA.E[i].attackHandler.Xsize+20, EA.E[i].attackHandler.Ysize+20);
        if (EA.E[i].attackHandler.opacity != 0) {
            c.save();
            c.globalAlpha = EA.E[i].attackHandler.opacity; //pokud není opacita jedna, vykreslí se obrázek se sníženou opacitou
            c.drawImage(bulletImg, EA.E[i].attackHandler.X-offset-20, EA.E[i].attackHandler.Y-Yoffset-20);
            c.restore();
        }else{
            c.drawImage(bulletImg, EA.E[i].attackHandler.X-offset-20, EA.E[i].attackHandler.Y-Yoffset-20);}
    }

    /*if (playerWalkParticles.enabled) {
        particles("white", playerWalkParticles);
    }*/
    if (pause) {
        c.font = "30px Arial";
        c.fillText("Pozastaveno", 10, 50);
    }if (gameOver) {
        c.font = "30px Arial";
        c.fillText("Prohral jsi!", 10, 50);
    }
    textArray.drawAllText();

    window.requestAnimationFrame(draw);
}

var playerAnimFrame = 0;
var playerAnimTiming = 0;
var ee = false;
function drawPlayer() {
    //tyhle hodnoty určují rychlost od které se přehrává walk animace
    //skok
    if (player.gravity < -2.1) {
        
        if (playerAnimFrame>2) {
            playerAnimFrame = 0;
        }
        if (player.facing == "left") { //0 4-6
            c.drawImage(playerJumpSprite, playerAnimFrame*160, 200, 160,200,player.X-40-offset,player.Y-20-Yoffset, 160,200);
        }else{
            c.drawImage(playerJumpSprite, playerAnimFrame*160, 0, 160,200,player.X-40-offset,player.Y-20-Yoffset, 160,200);
        }
        if (playerAnimFrame == 2) {
            playerAnimFrame =0;
        }
        ee = true;
    }/*pád*/else if(player.gravity > 2.1){
        if (playerAnimFrame>6 || playerAnimFrame < 3) {
            playerAnimFrame = 3;
        }
        if (player.facing == "left") {
            c.drawImage(playerJumpSprite, playerAnimFrame*160, 200, 160,200,player.X-40-offset,player.Y-20-Yoffset, 160,200);
        }else{
            c.drawImage(playerJumpSprite, playerAnimFrame*160, 0, 160,200,player.X-40-offset,player.Y-20-Yoffset, 160,200);
        }
        if (playerAnimFrame == 2) {
            playerAnimFrame =0;
        }
    }else if(ee && !player.onground){
        if (player.facing == "left") {
            c.drawImage(playerJumpSprite, 6*160, 200, 160,200,player.X-40-offset,player.Y-20-Yoffset, 160,200);
        }else{
            c.drawImage(playerJumpSprite, 6*160, 0, 160,200,player.X-40-offset,player.Y-20-Yoffset, 160,200);
        }
        ee = false;
    }else if (player.friction > 5) {
        c.drawImage(walkingSpriteRight, playerAnimFrame*160, 0, 160,200,player.X-40-offset,player.Y-20-Yoffset, 160,200);
    }else if(player.friction < -5){
        c.drawImage(walkingSpriteLeft, playerAnimFrame*160, 0, 160,200,player.X-40-offset,player.Y-20-Yoffset, 160,200);
    }else{
        if (player.facing == "left") {
            c.drawImage(standingSpriteLeft, playerAnimFrame*160, 0, 160,200,player.X-40-offset,player.Y-20-Yoffset, 160,200);
        }else{
            c.drawImage(standingSpriteRight, playerAnimFrame*160, 0, 160,200,player.X-40-offset,player.Y-20-Yoffset, 160,200);
        }
    }
    //console.log(playerAnimFrame);
}
function playerAnimTimingF() {
    playerAnimTiming++;
    if (playerAnimTiming >= 8) {
        playerAnimFrame++;
        playerAnimTiming = 0;
    }
    if (playerAnimFrame == 8) {
        playerAnimFrame =0;
    }

    bookAnimTiming++;
    if (playerAttack.hitboxOn) {
        bookAnimTiming+=2;
    }
    if (bookAnimTiming >= 16) {
        bookAnimFrame++;
        bookAnimTiming = 0;
    }
    if ((bookAnimFrame >= 4 && !playerAttack.hitboxOn) || (playerAttack.hitboxOn && bookAnimFrame >= 8)) {
        bookAnimFrame =0;
    }

    buttonAnimTiming++;
    if (buttonAnimTiming>= 10) {
        buttonAnimFrame++;-10
        buttonAnimTiming=0;
    }
    if (buttonAnimFrame >= 8) {
        buttonAnimFrame=0;
    }
}
var bookAnimFrame = 0;
var bookAnimTiming = 0;
//X 160 Y 60
function bookAnimation(c) {
if (playerAttack.hitboxOn) {
    // X 
    if (player.facing == "right") {
        c.drawImage(knihaAttackSprite, bookAnimFrame*160,0,158,60,kniha.X-offset, kniha.Y-Yoffset-10, 160,60);
    }
   else{
    c.drawImage(knihaAttackLSprite, bookAnimFrame*160+2,0,160,60,kniha.X-offset-160, kniha.Y-Yoffset-10, 160,60);
   }
}else{
    //X50 Y48
    c.drawImage(knihaSprite, bookAnimFrame*100,0,100,96,kniha.X-offset-25, kniha.Y-Yoffset-25, 100,96);
}
}