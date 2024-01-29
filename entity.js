//#region ENTITY

class entity {
    constructor(X, Y, height, width, hp, moveSpeed) {
        this.X = X,
        this.Y = Y,
        this.oldX = 0,
        this.oldY = 0,
        this.onground = false,
        this.gravity = 0,
        this.friction= 0,
        this.sideCollided = "left",
        this.moving = "no",
        this.height = height,
        this.width = width,

        this.hp = hp,
        this.invulnerable = false,
        this.stunTime = 0,

        this.moveSpeed = moveSpeed,
    
        this.coyoteTime = false,
        this.coyoteTimeTick = 0,

        this.facing = "no",
        this.knockback = true
    }

    jump(){
        this.gravity = -17;
        this.onground = false;
    }
    move(direction){
        if (this.stunTime > 0) {
            return;
        }
        if (direction === undefined) {
            switch (this.moving) {
                case "left":
                    if (this.friction > -this.moveSpeed) {
                        this.friction -= 1.1;
                    }
                    break;
                case "right":
                    if (this.friction < this.moveSpeed) {
                        this.friction += 1.1;
                    }
                    break;
                case "no":
                    if (this.friction != 0) {
                        this.friction *= 0.8;
                    }
                    if (this.friction > -0.05 && this.friction < 0.05) {
                        this.friction = 0;
                    }
                    break;
                default:
                    break;
            }
            return;
        }
        switch (direction) {
            case "left":
                if (this.friction > -this.moveSpeed) {
                    this.friction += -1.1;
                    this.moving = "left";
                }
                break;
            case "right":
                if (this.friction < this.moveSpeed) {
                    this.friction += 1.1;
                    this.moving = "right";
                }
                break;
            case "no":
                if (this.friction != 0) {
                    this.friction *= 0.8;
                    this.moving = "no";
                }
                if (this.friction > -0.05 && this.friction < 0.05) {
                    this.friction = 0;
                    this.moving = "no";
                }
                break;
            default:
                break;
        }
    }
    hit(hitpoints, index, direction, KBfriction, KBgravity){
        if (this.invulnerable) {return;}
        this.hp -= hitpoints;
        console.log("enemy " + index + " hp "+ this.hp);

        if(index != -1){
            this.invulnerable = true;
            this.friction = 0;
            this.stunTime = 25;
            if (!this.knockback) { if (this.hp <= 0) { console.log("smazán index" + index); EA.E.splice(index, 1);}return;}
            this.gravity = -KBgravity;
            switch (direction) {
                case "left":
                    this.friction = -KBfriction;
                    break;
                case "right":
                    this.friction = KBfriction;
                    break;
            }
        
            if (this.hp <= 0) {
                console.log("smazán index" + index);
                EA.E.splice(index, 1);
            }
            return;
        }
        if(this.knockback){
            if (direction == "left") {
                this.friction = -15;
                this.gravity = -15;
            }else if(direction == "right"){
                this.friction = 15;
                this.gravity = -15;
            }}
            if (this.hp <= 0) {
                console.log("GAME OVER");
                gameOver = true;
        }
    }

}


//#endregion
//funkce attack

class attackHandler {
    constructor(mainAttack, Xoffset, Yoffset, Xsize, Ysize, KBfriction, KBgravity, cooldown){
        this.X = 0,
        this.Y = 0,
        this.hitboxOn = false, //jestli je spuštěn attack
        this.attackTiming = 0,
        this.Xsize = Xsize,
        this.Ysize = Ysize,
        this.KBfriction = KBfriction,//knockback horizontální
        this.KBgravity = KBgravity,//vertikální

        this.attackXsize = 150,
        this.attackYsize = 25,
        this.attackXsize2 = 25,
        this.attackYsize2 = 150,
        this.activeFacing = "left", //aby hráč nemohl měnit směr útoku uprostřed normálního útoku což nefunguje směr ze strany nahoru a zpátky
        this.mainAttack = mainAttack,

        this.invulnerableTiming = 20,//čas jak dlouho je enemy invulnerable na this.Y (aby netankoval dva hity při jednom útoku hráče)
        this.Xoffset = Xoffset,
        this.Yoffset = Yoffset,

        this.cooldown = cooldown*60,
        this.cooldownTime = 0
    }
    //entity spouští útok, tam kde začíná, keyBool kontroluje držení klávesy, facing ukazuje směr při hlavním útoku
    start(facing, entity, keyBool){
        if (!keyBool || this.attackTiming != 0 || this.cooldownTime>0) {return;}//pokud se nespouští attack okamžitě vrátí funkci
        this.hitboxOn = true;this.attackTiming = 0;//spouští časování délky útoku
        this.cooldownTime = this.cooldown; //spouští cooldown schopnosti
        //#region Main Attack
        if (this.mainAttack){
            switch (facing) {
                case "left":
                    this.X = entity.X-this.Xsize; this.Y = entity.Y+30;
                    this.Xsize = this.attackXsize; this.Ysize = this.attackYsize; this.activeFacing = "left";
                    break;
                case "right":
                    this.X = entity.X+entity.width; this.Y = entity.Y+30;
                    this.Xsize = this.attackXsize; this.Ysize = this.attackYsize; this.activeFacing = "right";
                    break;
                case "up":
                    this.X = entity.X + 10; this.Y = entity.Y - this.attackYsize2;
                    this.Xsize = this.attackXsize2; this.Ysize = this.attackYsize2; this.activeFacing = "up";
                    break;
                case "down":
                    this.X = entity.X + 10; this.Y = entity.Y + entity.height;
                    this.Xsize = this.attackXsize2; this.Ysize = this.attackYsize2; this.activeFacing = "down";
                    break;}return;}//skvělej řádek
            //#endregion
        this.X = entity.X+this.Xoffset;this.Y = entity.Y+this.Yoffset;
    }
    moveCheck(entity){
        if(playerAttack.attackTiming == 0) {return;}
        switch (this.activeFacing) {
            case "left":
                this.X = entity.X-this.Xsize; this.Y = entity.Y+30;
                break;
            case "right":
                this.X = entity.X+entity.width; this.Y = entity.Y+30;
                break;
            case "up":
                this.X = entity.X + 10; this.Y = entity.Y - this.attackYsize2;
                break;
            case "down":
                this.X = entity.X + 10; this.Y = entity.Y + entity.height;
                break;
        }
    }
    hitCheck(i, entity, attackingEntity){
        if ((this.X < entity.X+entity.width && this.X+this.Xsize > entity.X )&& (this.Y < entity.Y+entity.height && this.Y + this.Ysize > entity.Y)) {
            if (!this.mainAttack) {
                if (this.X + this.Xsize/2 < entity.X) {
                    entity.hit(hitDamage, i, "right", this.KBfriction, this.KBgravity);
                }
                else if (this.X + this.Xsize/2 > entity.X) {
                    entity.hit(hitDamage, i, "left", this.KBfriction, this.KBgravity);
                }else{
                    entity.hit(hitDamage, i, "up", this.KBfriction, this.KBgravity);
                }
                return;
            }
            entity.hit(hitDamage, i, attackingEntity.facing, this.KBfriction, this.KBgravity);
        }
    }
    tick(){
        if (this.cooldownTime > 0) {
            this.cooldownTime--;
        }else if(this.cooldownTime <= 0){
            this.cooldownTime = 0;
        }
        if (!this.hitboxOn) {return;}
        this.attackTiming++;
        if (this.attackTiming == 10) {
            this.hitboxOn=false;
            this.attackTiming=0;
            for (let i = 0; i < EA.E.length; i++) {
                EA.E[i].entity.invulnerable = false;
            }
        }
    }
    drawAttack(){
        if (!this.hitboxOn) {return;}
        c.fillStyle = "red";
        c.fillRect(this.X, this.Y, this.Xsize, this.Ysize);
        
        console.log(this.X+" "+ this.Y+" "+this.Xsize + " " +this.Ysize);
    }
}
var playerAttack = new attackHandler(true, 0, 0, 0, 0, 3, 8, 0.5);
var playerSkill = new attackHandler(false, -150, -100, 350, 200, 6, 13, 5);

var hitDamage = 1; //kolik dává damage (hp je přímo v enemy)
function Attack() {
    playerAttack.start(player.facing, player, attackDown); //checkuje jestli se začíná attack
    attackDown = false;
    playerAttack.moveCheck(player); //checkuje jestli je potřeba pohnout s existujícím attackem
    
    playerAttack.tick();
    if (EA.getEnemyNum() < 1) {return;}
    for (let i = 0; i < EA.getEnemyNum(); i++) {
        if(playerAttack.hitboxOn){
            playerAttack.hitCheck(i, EA.E[i].entity, player);
        }
    }
}
function Skill() {
    playerSkill.start("null", player, skillDown);
    skillDown = false;
    playerSkill.tick();
    if (EA.getEnemyNum() < 1) {return;}
    for (let i = 0; i < EA.getEnemyNum(); i++) {
        if(playerSkill.hitboxOn){
            playerSkill.hitCheck(i, EA.E[i]);
        }
    }
}
//#endregion

//#region PLAYER
var player = new entity(100, 100, 75, 50, 5, 10);

function playerFunc() {
    player.oldX = player.X;
    player.oldY = player.Y;
    //pohyb vpravo/vlevo a friction
    if (leftDown && player.friction > - 10) {
        player.friction += -1.1;
    }
    else if (rightDown && player.friction < 10) {
        player.friction += 1.1;
    }
    else{
        player.friction *= 0.8;
    }
    if(player.friction < 1 && player.friction > -1){
        player.friction = 0;
    }

    if(leftDown && player.friction > 1) {
        player.friction -=2;
    }else if (rightDown && player.friction < 1) {
        player.friction += 2;
    }
    player.X += player.friction;

    //skok a gravitace
    player.Y += player.gravity;
    if (!player.onground) {
        player.gravity += 1.2;
    }
    if (mezernikDown && (player.onground || player.coyoteTime)) {
        if (player.coyoteTime) {
            player.coyoteTime = false;
        }
        player.gravity = -17;
        player.onground = false;
        if (player.moving != "no") {
            player.friction *=1.5;
        }
    }

    //aby nevyskočil z mapy

    if (player.Y<0) {
        player.Y=0;
    }if (player.Y > window.innerHeight + 500) {
        player.Y = TM.respawnY;
        player.X = TM.respawnX;
    }if (player.X < 0) {
        player.X = 0;
    }if (player.X > sirka * TM.tile) {
        
    }
}
//#endregion
