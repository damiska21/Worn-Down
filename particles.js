class particle {
    constructor(x, y, gravity, direction, size){
        this.x = x,
        this.y = y,
        this.gravity = gravity, //směr pohybu bloku na y
        this.direction = direction, //směr pohybu bloku na x
        this.size = size, //velikost bloku
        this.time = 40
    }
    move(){
        this.gravity += 0.05;
        this.y += this.gravity;
        this.x += this.direction;
        this.time--;
    }
}
class particleGenerator{
    constructor(startX, startY){
        this.particles = [],
        this.startX = startX,
        this.startY = startY,
        this.enabled = false
    }
    addParticle(gravity, direction, size){
        let p = new particle(this.startX, this.startY, gravity, direction, size);
        this.particles.push(p);
    }
}
var playerWalkParticles = new particleGenerator((player.X + player.width/2), player.Y+player.height);

function particles(color, particleGenerator) {
    var pg = particleGenerator;
    pg.startX = (player.X + player.width/2);//změna bodu odkud se respawnují particly
    pg.startY = (player.Y+player.height);

    //move
    for (let i = 0; i < particleGenerator.particles.length; i++) {
        let p = particleGenerator.particles[i];
        p.move();
        if (p.time <= 0) {
            p.time = 40;
            p.x = pg.startX;
            p.y = pg.startY;
            p.gravity = -1;
            pg.enabled = false;
        }
    }

    //draw
    for (let i = 0; i < particleGenerator.particles.length; i++) {
        let p = particleGenerator.particles[i];
        c.fillStyle = "white";
        c.fillRect(p.x-offset, p.y-Yoffset, p.size, p.size);
    }
}

function particlesInitiate(color, ammount, particleGenerator, startX, startY){
    /*for (let i = 0; i < ammount; i++) {
        particleGenerator.addParticle(startX, startY, -5, 5, 2);
    }*/
    
    playerWalkParticles.addParticle(-0.15, 0.1, 5);
    playerWalkParticles.addParticle(-0.15, -0.2, 5);
    playerWalkParticles.addParticle(-0.15, 0.2, 3);
    playerWalkParticles.addParticle(-0.25, -0.3, 6);
    playerWalkParticles.addParticle(-0.15, 0.1, 4);
    playerWalkParticles.addParticle(-0.05, -0.2, 7);
    playerWalkParticles.addParticle(-0.3, 0.3, 4);
    playerWalkParticles.addParticle(-0.05, 0.25, 7);
}