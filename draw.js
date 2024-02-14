class textArr{
    constructor(){
        this.array = [];
    }
    drawAllText(){
        for (let i = 0; i < this.array.length; i++) {
            this.array[i].drawText();
        }
    }
    newText(texti, x, y, size){
        let g = new text(texti, x, y, size);
        this.array.push(g);
    }
}
var textArray = new textArr();
class text{
    constructor(text, x, y, size){
        this.text = text,
        this.X = x,
        this.Y = y,
        this.font = "Silkscreen",
        this.size = size
    }
    drawText(){
        c.fillStyle = "black";
        c.font = this.size.toString()+"px " + this.font.toString();
        c.fillText(this.text, this.X-offset, this.Y-Yoffset);
    }
}

var harambe = new Image();
harambe.src = "img/enemy/harambe.png";

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


//COUNTER kolikrát Lukáš nebyl schopný správně spočítat pixely
//11

function draw() { //loop co běží na kolik hertzů je monitor (60/144 převážně)

    //všechno co se vykresluje potřebuje -offset !!!
    
    c.fillStyle = "gray";
    c.fillRect(0, 0, canvas.width, canvas.height);

    //c.fillStyle = "blue";
    //c.fillRect(player.X-offset, player.Y-Yoffset, player.width, player.height); //starej kód na čtverec

    
    for (let i = 0; i < EA.getEnemyNum(); i++) {
        //c.fillRect(EA.E[i].X, EA.E[i].Y, EA.E[i].width, EA.E[i].height);
        c.drawImage(harambe, EA.E[i].entity.X-offset, EA.E[i].entity.Y-Yoffset);
    }

    for (let j = 0; j < triggers.getEnemyNum(); j++) {
        c.fillStyle = "red";
        c.fillRect(triggers.E[j].entity.X-offset, triggers.E[j].entity.Y-Yoffset, triggers.E[j].entity.width, triggers.E[j].entity.height);
        //c.drawImage(harambe, EA.E[i].entity.X-offset, EA.E[i].entity.Y-Yoffset);
    }

    tilemapDraw(offset);

drawPlayer();

    c.fillStyle = "red";
    c.fillRect(kniha.X-offset, kniha.Y-Yoffset, kniha.width, kniha.height);
    
    if(playerAttack.hitboxOn){
        c.fillStyle = "red";
        c.fillRect(playerAttack.X-offset, playerAttack.Y-Yoffset, playerAttack.Xsize, playerAttack.Ysize);
    }if (playerSkill.hitboxOn) {
        c.fillStyle = "black";
        c.fillRect(playerSkill.X-offset, playerSkill.Y-Yoffset, playerSkill.Xsize, playerSkill.Ysize);
    }

    for (let i = 0; i < EA.getEnemyNum(); i++) {
        //EA.E[i].attackHandler.drawAttack();
        if (!EA.E[i].attackHandler.hitboxOn) {continue;}

        c.fillStyle = "red";//přepsat na img, offset je
        c.fillRect(EA.E[i].attackHandler.X-offset-20, EA.E[i].attackHandler.Y-Yoffset-20, EA.E[i].attackHandler.Xsize+20, EA.E[i].attackHandler.Ysize+20);
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
    levelDraw(c);
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
        if (player.facing == "left") {
            c.drawImage(fallingSpriteLeft, playerAnimFrame*160, 0, 160,200,player.X-40-offset,player.Y-20-Yoffset, 160,200);
        }else{
            c.drawImage(fallingSpriteRight, playerAnimFrame*160, 0, 160,200,player.X-40-offset,player.Y-20-Yoffset, 160,200);
        }
        if (playerAnimFrame == 2) {
            playerAnimFrame =0;
        }
    }/*pád*/else if(player.gravity > 2.1){
        if (playerAnimFrame>2) {
            playerAnimFrame = 0;
        }
        ee = true;
        if (player.facing == "left") {
            c.drawImage(jumpingSpriteLeft, playerAnimFrame*160, 0, 160,200,player.X-40-offset,player.Y-20-Yoffset, 160,200);
        }else{
            c.drawImage(jumpingSpriteRight, playerAnimFrame*160, 0, 160,200,player.X-40-offset,player.Y-20-Yoffset, 160,200);
        }
        if (playerAnimFrame == 2) {
            playerAnimFrame =0;
        }
    }else if(ee && !player.onground){
        if (player.facing == "left") {
            c.drawImage(jumpingSpriteLeft, 0, 0, 160,200,player.X-40-offset,player.Y-20-Yoffset, 160,200);
        }else{
            c.drawImage(jumpingSpriteRight, 0, 0, 160,200,player.X-40-offset,player.Y-20-Yoffset, 160,200);
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
    playerAnimTiming++;
    if (playerAnimTiming >= 10) {
        playerAnimFrame++;
        playerAnimTiming = 0;
    }
    if (playerAnimFrame == 8) {
        playerAnimFrame =0;
    }
}