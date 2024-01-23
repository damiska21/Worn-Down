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

function enemyFunc() {
    for (let i = 0; i < EA.getEnemyNum(); i++) {
        if (EA.E[i].X-offset > window.innerWidth) {
            continue;
        }
        EA.E[i].oldX = EA.E[i].X;
        EA.E[i].oldY = EA.E[i].Y;
        EA.E[i].X += EA.E[i].friction;

        if (EA.E[i].stunTime > 0) {
            EA.E[i].stunTime--;
        }else{
            EA.E[i].move();
        }

        if (!EA.E[i].onground) {
            EA.E[i].gravity += 1.2;
        }
        EA.E[i].Y += EA.E[i].gravity;

        EA.E[i] = collision(EA.E[i], offset, Yoffset);

        if (EA.E[i].sideCollided == "right") {
            EA.E[i].move("no");
            EA.E[i].move("right");
        }
        if(EA.E[i].sideCollided == "left"){
            EA.E[i].move("no");
            EA.E[i].move("left");
        }

        //#region PLAYER KOLIZE - top right
        if ((player.X + player.width > EA.E[i].X && player.X + player.width < EA.E[i].X + EA.E[i].width)/*X*/ && (player.Y >= EA.E[i].Y && player.Y < EA.E[i].Y + EA.E[i].height)) {
            console.log("top right p hit");
            player.hit(1, -1, "left");
            EA.E[i].stunTime = 25;
        }
        //top left
        else if((player.X > EA.E[i].X && player.X < EA.E[i].X + EA.E[i].width)/*X*/ && (player.Y >= EA.E[i].Y && player.Y < EA.E[i].Y + EA.E[i].height)){
            console.log("top left p hit");
            player.hit(1, -1, "right");
            EA.E[i].stunTime = 25;
        }
        //bot right
        else if ((player.X + player.width > EA.E[i].X && player.X + player.width < EA.E[i].X + EA.E[i].width)/*X*/ && (player.Y + player.height >= EA.E[i].Y && player.Y+ player.height < EA.E[i].Y + EA.E[i].height)) {
            console.log("bot right p hit");
            player.hit(1, -1, "left");
            EA.E[i].stunTime = 25;
        }
        //bot left
        else if ((player.X > EA.E[i].X && player.X < EA.E[i].X + EA.E[i].width)/*X*/ && (player.Y + player.height >= EA.E[i].Y && player.Y+ player.height < EA.E[i].Y + EA.E[i].height)) {
            console.log("bot left p hit");
            player.hit(1, -1, "right");
            EA.E[i].stunTime = 25;
        }
        //#endregion
    }
}
var shootHandler = new attackHandler(false, 20, 0, 20, 20, 3, 8, 5);
class enemy {
    constructor(entity, type, attackHandler){
        this.entity = entity,
        this.type = type,
        this.attackHandler = attackHandler
    }
    
    enemyLoop(){
        if (this.entity.X-offset > window.innerWidth) {
            return;
        }
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

        //#region PLAYER KOLIZE - top right
        if ((player.X + player.width > this.entity.X && player.X + player.width < this.entity.X + this.entity.width)/*X*/ && (player.Y >= this.entity.Y && player.Y < this.entity.Y + this.entity.height)) {
            console.log("top right p hit");
            player.hit(1, -1, "left");
            this.entity.stunTime = 25;
        }
        //top left
        else if((player.X > this.entity.X && player.X < this.entity.X + this.entity.width)/*X*/ && (player.Y >= this.entity.Y && player.Y < this.entity.Y + this.entity.height)){
            console.log("top left p hit");
            player.hit(1, -1, "right");
            this.entity.stunTime = 25;
        }
        //bot right
        else if ((player.X + player.width > this.entity.X && player.X + player.width < this.entity.X + this.entity.width)/*X*/ && (player.Y + player.height >= this.entity.Y && player.Y+ player.height < this.entity.Y + this.entity.height)) {
            console.log("bot right p hit");
            player.hit(1, -1, "left");
            this.entity.stunTime = 25;
        }
        //bot left
        else if ((player.X > this.entity.X && player.X < this.entity.X + this.entity.width)/*X*/ && (player.Y + player.height >= this.entity.Y && player.Y+ player.height < this.entity.Y + this.entity.height)) {
            console.log("bot left p hit");
            player.hit(1, -1, "right");
            this.entity.stunTime = 25;
        }
    }
}