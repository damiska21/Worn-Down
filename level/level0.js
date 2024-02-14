/*tady jsou veškerý tilemapy
načítají se postupně tilemap1 .... chapeš
taky by tady mohli bejt gimmics levelu (můžou být v levelLoop (tam se spouští každý frame))
jako třeba tile = 40 --> zmenšení velikosti dílků levelu (bacha dole uprostřed není kolize, přes jednoblok propadne)
*/

var tilemap1 = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,10001,10001,-1,10101,11001,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,10101,11001,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,10101,10001],
    [-1,-1,-1,-1,-1,-1,-1,-1,10100,-1],
    [10001,10001,10001,10001,10001,10001,10001,10001,10000,10000]
];
var tilemap1Textury = [
[-1,1,-1,-1,-1,-1,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[-1,1,1,-1,40,35,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1,40,35,-1,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1,-1,-1,40,1],
[-1,-1,-1,-1,-1,-1,-1,-1,15,20],
[0,0,0,0,0,0,0,0,20,20]
]

    
//            W   H   tilemap    textury      Xpos Ypos
TM.newTilemap(10, 10, tilemap1,tilemap1Textury, 0, 0);
TM.endWrite();
//TM.newTilemap(10, 10, tilemap1, 0, 1);

//Zápis nepřítele - by Jáchym Kristal (jako ten prášek na vaření aka cukr)
//EA.newEnemy(pozice X, pozice Y, Vyska, Sirka, HP, Rychlost)
EA.newEnemy(550, 300, 90, 90, 10, 3); //EA.E[0].entity.move("right");
//sniper - EA.newEnemy(1850, 650, 90, 90, 3, 0, "shooter"); EA.E[0].entity.knockback = false; EA.E[0].initiate();
//páčka - triggers.newEnemy(1000, 650, 100, 100, 1, 0, "trigger");triggers.E[0].initiate();
//EA.newEnemy(1000, 300, 75, 50, 3, 3); EA.E[1].move("right");

function levelLoop() {
    
}
function levelDraw() {
    
}