var harambe = new Image();
harambe.src = "img/harambe.png";

var smurfcat = new Image();
smurfcat.src = "img/player.png";

var tilemapImg = new Image();
tilemapImg.src = "img/tilemap3.png"
var tilemapGuide = [10001, 10010, 11000, 10100, -1, 11010, 11001, 10101, 10110 ,11111];

function draw() { //loop co běží na kolik hertzů je monitor (60/144 převážně)

    c.fillStyle = "#D4FFE6";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "blue";
    //c.fillRect(player.X, player.Y, player.width, player.height); //starej kód na čtverec
    c.drawImage(smurfcat, player.X-offset, player.Y-Yoffset)


    if(playerAttack.hitboxOn){
        c.fillStyle = "red";
        c.fillRect(playerAttack.X-offset, playerAttack.Y-Yoffset, playerAttack.Xsize, playerAttack.Ysize);
    }if (playerSkill.hitboxOn) {
        c.fillStyle = "black";
        c.fillRect(playerSkill.X-offset, playerSkill.Y-Yoffset, playerSkill.Xsize, playerSkill.Ysize);
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
    if (playerWalkParticles.enabled) {
        particles("white", playerWalkParticles);
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