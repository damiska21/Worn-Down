var harambe = new Image();
harambe.src = "img/harambe.png";

var playerImg = new Image();
playerImg.src = "img/player_1.png";
//40 zhora zdola - 50 zboku

var tilemapImg = new Image();
tilemapImg.src = "img/this_shit_ruin_My_life.png"
var tilemapGuide = [10001, 10010, 11000, 10100, -1, 11010, 10110, 11001, 10101 ,11111];
var tilemapUpImg = new Image();
tilemapUpImg.src = "img/block_02_variants.png";

//COUNTER kolikrát Lukáš nebyl schopný správně spočítat pixely
//10

function draw() { //loop co běží na kolik hertzů je monitor (60/144 převážně)
    
    c.fillStyle = "gray";
    c.fillRect(0, 0, canvas.width, canvas.height);

    //c.fillStyle = "blue";
    //c.fillRect(player.X-offset, player.Y-Yoffset, player.width, player.height); //starej kód na čtverec
    


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

    for (let j = 0; j < triggers.getEnemyNum(); j++) {
        c.fillStyle = "red";
        c.fillRect(triggers.E[j].entity.X-offset, triggers.E[j].entity.Y-Yoffset, triggers.E[j].entity.width, triggers.E[j].entity.height);
        //c.drawImage(harambe, EA.E[i].entity.X-offset, EA.E[i].entity.Y-Yoffset);
    }

    tilemapDraw(offset);

    c.drawImage(playerImg, player.X-offset-60, player.Y-Yoffset-40);

    for (let i = 0; i < EA.getEnemyNum(); i++) {
        //EA.E[i].attackHandler.drawAttack();
        if (!EA.E[i].attackHandler.hitboxOn) {continue;}

        c.fillStyle = "red";
        c.fillRect(EA.E[i].attackHandler.X-offset, EA.E[i].attackHandler.Y-Yoffset, EA.E[i].attackHandler.Xsize, EA.E[i].attackHandler.Ysize);
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
    window.requestAnimationFrame(draw);
}