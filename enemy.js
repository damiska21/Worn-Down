function enemyFunc() {
    for (let i = 0; i < EA.getEnemyNum(); i++) {
        EA.E[i].enemyLoop(); 
    }
}

var shootHandler = new attackHandler(false, -20, 10, 20, 20, 3, 8, 5);
class enemy {
    constructor(entity, type, attackHandler){
        this.entity = entity,
        this.type = type,
        this.attackHandler = attackHandler
    }
    initiate(){ //při spuštění se mění pár interních vlastností
        switch (this.type) {
            case "shooter":
                this.attackHandler.attackTimeLimit = 170; //tohle ujede pět bloků
                this.attackHandler.deleteOnHit = true;
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

        if (!this.entity.onground) {
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
        if(this.attackHandler.hitboxOn){
            this.attackLoop(); 
            this.attackHandler.hitCheck(-1, player, this.entity);
        }else{
            this.normalAttack();
        }
        
        //kolize s hráčem
        if ((player.X < this.entity.X+this.entity.width && player.X+player.width > this.entity.X )&& (player.Y < this.entity.Y+this.entity.height && player.Y + player.height > this.entity.Y)) {
            console.log("bot left p hit");
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
        }
    }
    shooterAttackLoop(){
        if (this.entity.facing == "right") {
            this.attackHandler.X += 5;
        }else {
            this.attackHandler.X -= 5;
        }
    }
    normalAttack(){
        switch (this.type) {
            case "shooter":
                this.attackHandler.start(this.entity.facing, this.entity, true);
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
        let i = new enemy(e, type, shootHandler);
        this.E.push(i);
    }
    getEnemyNum(){
        return this.E.length;
    }
    getEnemy(index){
        return this.E[index];
    }
}
var EA = new enemies(); //EA znamená enemy array btw :D
//EA.newEnemy(250, 250, 75, 50, 3);