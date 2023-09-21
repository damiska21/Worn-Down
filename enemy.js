var EA = new enemies(); //EA znamená enemy array btw :D
EA.newEnemy(250, 250, 75, 50, 3);
EA.newEnemy(350, 100, 75, 50, 3);

function enemy() {
    for (let i = 0; i < EA.getEnemyNum(); i++) {
        EA.E[i].oldX = EA.E[i].X;
        EA.E[i].X += EA.E[i].friction;

        if (!EA.E[i].onground) {
            EA.E[i].gravity += 1.2;
        }
        EA.E[i].Y += EA.E[i].gravity;

        EA.E[i] = collisionT(EA.E[i], offset);

        if (EA.E[i].sideCollided == "right" || EA.E[i].sideCollided == "left") {
            //EA.E[i].move("no");
            EA.E[i].jump();
        }
    }
}