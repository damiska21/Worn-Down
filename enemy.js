function enemyFunc() {
    for (let i = 0; i < EA.getEnemyNum(); i++) {
        EA.E[i].enemyLoop(); 
    }
    for (let i = 0; i < triggers.getEnemyNum(); i++) {
        triggers.E[i].enemyLoop();
    }
}

var shootHandler = new attackHandler(false, -20, 10, 20, 20, 3, 8, 5);
class enemy {
    constructor(entity, type, attackHandler){
        this.entity = entity,
        this.type = type,
        this.attackHandler = attackHandler
    }
    setFacing(facing){
        this.entity.facing = facing;
        switch (this.type) {
            case "shooter":
                switch (this.entity.facing) {
                    case "down":
                        this.attackHandler.Xoffset = -40;
                        this.attackHandler.Yoffset = 100;console.log("b");
                        break;
                
                    default:
                        break;
                }
                break;
        
            default:
                break;
        }
    }
    initiate(){ //při spuštění se mění pár interních vlastností
        switch (this.type) {
            case "shooter":
                this.attackHandler.attackTimeLimit = 170; //tohle ujede pět bloků
                this.attackHandler.opacity = 1; //opacita kulky (na fadeout)
                this.attackHandler.deleteOnHit = true;
                
                
                break;
            case "trigger":
                this.entity.hp = 20;
                this.entity.knockback = false;
                this.triggered = false;
                this.triggerFunction= function triggerFunction() {
                    
                }
                this.triggerFunctionOneTime = function triggerFunctionOneTime() {
                    console.log("páček :D");
                }
                break;
            case "golem"://tohle je jenom na animace
                this.animFrame = 0;
                this.animTiming = 0;
                this.drawEnemy = function drawEnemy() {
                    //enemyGolem (Y/170, X/60, YOffset/10,  XOffset/10)
                    if (this.entity.facing == "left") {
                        c.save();
                        c.translate((this.entity.X + this.entity.width/2)-offset, (this.entity.Y + this.entity.height/2)-Yoffset);
                        c.scale(-1,1);
                        c.translate(-((this.entity.X + this.entity.width/2)-offset), -((this.entity.Y + this.entity.height/2)-Yoffset));
                    }
                    c.drawImage(golemSprite, this.animFrame*80, 0, 80, 190, this.entity.X-10-offset, this.entity.Y-10-Yoffset, 80, 190);
                    c.restore();
                    this.animTiming++;
                    if (this.animTiming >= 10) {
                        this.animFrame++;
                        this.animTiming = 0;                     
                    }
                    if (this.animFrame >= 10) {
                        this.animFrame = 0;
                    }
                }
                break;
            default:
                break;
        }
    }
    enemyLoop(){
        if (this.entity.X-offset > window.innerWidth) {return;}//když je enemy mimo obrazovku, nic nedělá
        this.entity.oldX = this.entity.X;
        this.entity.oldY = this.entity.Y;
        this.entity.X += this.entity.friction;

        if (this.entity.stunTime > 0) {
            this.entity.stunTime--;
        }else{
            this.entity.move();
        }

        if (!this.entity.onground && this.type != "trigger" && this.type != "shooter") {//trigger nemá gravitaci, taky nedává damage při dotyku na ř79
            this.entity.gravity += 1.2;
        }
        this.entity.Y += this.entity.gravity;

        this.entity = collision(this.entity, offset, Yoffset);

        if (this.entity.sideCollided == "right") {
            this.entity.move("no");
            this.entity.move("right");
        }
        if(this.entity.sideCollided == "left"){
            this.entity.move("no");
            this.entity.move("left");
        }
        this.attackHandler.tick();
        if (this.attackHandler.attackTimeLimit-10 < this.attackHandler.attackTiming) {
            this.attackHandler.opacity -= 0.1; //fadeout na posledních 10 framech kolize kulky
        }
        if(this.attackHandler.hitboxOn || this.type == "trigger"){
            this.attackLoop(); 
            this.attackHandler.hitCheck(-1, player, this.entity);
        }else{
            this.normalAttack();
        }
        
        //kolize s hráčem
        if ((player.X < this.entity.X+this.entity.width && player.X+player.width > this.entity.X )&& (player.Y < this.entity.Y+this.entity.height && player.Y + player.height > this.entity.Y) && this.type != "trigger") {
            if (player.X >= this.entity.X + (this.entity.width/2)) {
                player.hit(1, -1, "right");
            }else{
                player.hit(1, -1, "left");
            }
            this.entity.stunTime = 25;
        }
        //#endregion
    }
    attackLoop(){
        switch (this.type) {
            case "shooter":
                this.shooterAttackLoop();
                break;
            case "trigger":
                this.triggerLoop();
                break;
        }
    }
    triggerLoop(){
        if (this.triggered) {
            this.triggerFunction();return;
        }
        //console.log(this.triggered + " " + this.entity.hp)
        if (!this.triggered && this.entity.hp <= 19) {
            this.triggerFunctionOneTime();
            this.triggered = true;
            console.log("quieres?");
        }
    }
    shooterAttackLoop(){
        if (this.entity.facing == "right") {
            this.attackHandler.X += 5;
        }else if (this.entity.facing == "left") {
            this.attackHandler.X -= 5;
        }else if (this.entity.facing == "down") {
            this.attackHandler.Y +=5;
        }else if (this.entity.facing == "up") {
            this.attackHandler.Y -=5;
        }
    }
    normalAttack(){
        switch (this.type) {
            case "shooter":
                this.attackHandler.start(this.entity.facing, this.entity, true);this.attackHandler.opacity = 1; 
                break;
        }
    }
}

class enemies {
    constructor(){
        this.E = [];
    }
    newEnemy(X, Y, height, width, hp, moveSpeed, type){
        let e = new entity(X, Y, height, width, hp, moveSpeed);
        let i = new enemy(e, type, new attackHandler(false, 0,0,0,0,0,0,0));
        i.initiate();
        this.E.push(i);
        return this.E.length-1;
    }
    getEnemyNum(){
        return this.E.length;
    }
    getEnemy(index){
        return this.E[index];
    }
}
var EA = new enemies(); //EA znamená enemy array btw :D
var triggers = new enemies(); //páčky atp jsou taky nepřátelé
//EA.newEnemy(250, 250, 75, 50, 3);