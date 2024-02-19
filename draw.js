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

var turretImg = new Image();
turretImg.src = "img/enemy/enemy(turret).png";
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
knihaSprite.src = "img/GAME_animations/Book/book(animation).png";

//enemyGolem (Y/170, X/60, YOffset/10,  XOffset/10)
var golemSprite = new Image();
golemSprite.src = "img/GAME_animations/enemy/enemyGolem.png";

var buttonSprite = new Image();
buttonSprite.src = "img/GAME_animations/Button/buttonSOff.png";
var buttonDownSprite = new Image();
buttonDownSprite.src = "img/GAME_animations/Button/buttonSOn.png";
var buttonAnimFrame = 0;
var buttonAnimTiming = 0;


//COUNTER kolikrát Lukáš nebyl schopný správně spočítat pixely
//12

function draw() { //loop co běží na kolik hertzů je monitor (60/144 převážně)

    //všechno co se vykresluje potřebuje -offset !!!
    
    c.fillStyle = "gray";
    c.fillRect(0, 0, canvas.width, canvas.height);

    
    levelDraw(c);

    //c.fillStyle = "blue";
    //c.fillRect(player.X-offset, player.Y-Yoffset, player.width, player.height); //starej kód na čtverec

    
    for (let i = 0; i < EA.getEnemyNum(); i++) {
        //c.fillRect(EA.E[i].X, EA.E[i].Y, EA.E[i].width, EA.E[i].height);
        switch (EA.E[i].type) {
            case "shooter":
                c.drawImage(turretImg, EA.E[i].entity.X-offset-20, EA.E[i].entity.Y-Yoffset-20);
                break;
            case "golem":
                EA.E[i].drawEnemy();
                break;
            default:
                c.drawImage(harambe, EA.E[i].entity.X-offset, EA.E[i].entity.Y-Yoffset);
                break;
        }
    }

    for (let j = 0; j < triggers.getEnemyNum(); j++) {
        /*c.fillStyle = "red";
        c.fillRect(triggers.E[j].entity.X-offset, triggers.E[j].entity.Y-Yoffset, triggers.E[j].entity.width, triggers.E[j].entity.height);*/
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
    if(playerAttack.hitboxOn){
        c.fillStyle = "red";
        c.fillRect(playerAttack.X-offset, playerAttack.Y-Yoffset, playerAttack.Xsize, playerAttack.Ysize);
    }if (playerSkill.hitboxOn) {
        c.fillStyle = "black";
        c.fillRect(playerSkill.X-offset, playerSkill.Y-Yoffset, playerSkill.Xsize, playerSkill.Ysize);
    }

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
    if (bookAnimTiming >= 16) {
        bookAnimFrame++;
        bookAnimTiming = 0;
    }
    if (bookAnimFrame == 4) {
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
function bookAnimation(c) {
    c.drawImage(knihaSprite, bookAnimFrame*80,0,80,80,kniha.X-offset-20, kniha.Y-Yoffset-20, 80,80);
}