var harambe = new Image();
harambe.src = "img/harambe.png";

var playerImg = new Image();
playerImg.src = "img/player.png";

var tilemapImg = new Image();
tilemapImg.src = "img/tilemap5.png"
var tilemapGuide = [10001, 10010, 11000, 10100, -1, 11010, 11001, 10101, 10110 ,11111];


function draw() { //loop co běží na kolik hertzů je monitor (60/144 převážně)
    
    c.fillStyle = "gray";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "blue";
    //c.fillRect(player.X, player.Y, player.width, player.height); //starej kód na čtverec
    c.drawImage(playerImg, player.X-offset-20, player.Y-Yoffset-20)


    if(playerAttack.hitboxOn){
        c.fillStyle = "red";
        c.fillRect(playerAttack.X-offset, playerAttack.Y-Yoffset, playerAttack.Xsize, playerAttack.Ysize);
    }if (playerSkill.hitboxOn) {
        c.fillStyle = "black";
        c.fillRect(playerSkill.X-offset, playerSkill.Y-Yoffset, playerSkill.Xsize, playerSkill.Ysize);
    }
    for (let i = 0; i < EA.getEnemyNum(); i++) {
        //c.fillRect(EA.E[i].X, EA.E[i].Y, EA.E[i].width, EA.E[i].height);
        c.drawImage(harambe, EA.E[i].entity.X-offset, EA.E[i].entity.Y-Yoffset);
    }

    

    tilemapDraw(offset);

    for (let i = 0; i < EA.getEnemyNum(); i++) {
        //EA.E[i].attackHandler.drawAttack();
        if (!EA.E[i].attackHandler.hitboxOn) {continue;}

        c.fillStyle = "red";
        c.fillRect(EA.E[i].attackHandler.X-offset, EA.E[i].attackHandler.Y-Yoffset, EA.E[i].attackHandler.Xsize, EA.E[i].attackHandler.Ysize);
        console.log(EA.E[i].attackHandler.X + " " + EA.E[i].attackHandler.Y + " " + i);
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