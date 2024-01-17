class particle {
    constructor(x, y, gravity, direction, size){
        this.x = x,
        this.y = y,
        this.gravity = gravity, //směr pohybu bloku na y
        this.direction = direction, //směr pohybu bloku na x
        this.size = size //velikost bloku
    }
    move(){
        this.y += this.gravity;
        this.x += this.direction;
    }
}
class particleGenerator{
    constructor(startX, startY){
        this.particles = [],
        this.startX = startX,
        this.startY = startY
    }
    addParticle(gravity, direction, size){
        let p = new particle(this.startX, this.startY, gravity, direction, size);
        this.particles.push(p);
    }
}
var playerWalkParticles = new particleGenerator((player.X + player.width/2), player.Y+player.height);

function particles(color, particleGenerator) {
    //move
    for (let i = 0; i < particleGenerator.particles.length; i++) {
        let p = particleGenerator.particles[i];
        p.move();
    }

    //draw
    for (let i = 0; i < particleGenerator.particles.length; i++) {
        let p = particleGenerator.particles[i];
        c.fillStyle = "blue";
        c.fillRect(p.x, p.y, p.size, p.size);
    }
}

function particlesInitiate(color, ammount, particleGenerator, startX, startY){
    /*for (let i = 0; i < ammount; i++) {
        particleGenerator.addParticle(startX, startY, -5, 5, 2);
    }*/
    
    playerWalkParticles.addParticle(-0.1, 0.1, 5);
    playerWalkParticles.addParticle(-0.1, -0.2, 5);
}