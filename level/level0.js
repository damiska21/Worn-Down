/*tady jsou veškerý tilemapy
načítají se postupně tilemap1 .... chapeš
taky by tady mohli bejt gimmics levelu (můžou být v levelLoop (tam se spouští každý frame))
jako třeba tile = 40 --> zmenšení velikosti dílků levelu (bacha dole uprostřed není kolize, přes jednoblok propadne)
*/

var tilemap1 = [
    [10000, 10000, 10000, 10000, 10000, 10001, 10000, 10110, 11110, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10001, 10000, 10000, 10000],
    [10000, 10000, 10111, 11011, 10000, 10000, 10000, 10000, 10111, 11011, 11001, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 11100, 10000, 10000, 10000, 10111, 11110, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 11110, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 11101, 10000, 10000, 10000, 11101, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10001, 11001, 10000, 10000, 10000, 11100, 10000, 10000, 10101, 11101, 10000, 10000, 10000, 10000, 10000, 10000, 11101, 10000, 10000, 10000],
    [10000, 10000, 10001, 10001, 10001, 11101, 10001, 10001, 10000, 10000, 10001, 10001, 10001, 10001, 10001, 10001, 10001, 10001, 10001, 10001],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 11110, 11110, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10001, 10000, 10000, 10000],
    [10000, 10000, 10111, 11011, 10000, 10000, 10000, 10000, 10111, 11011, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 11100, 10000, 10000, 10000, 10111, 11110, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 11110, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 11101, 10000, 10000, 10000, 11101, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10001, 11001, 10000, 10000, 10000, 11100, 10000, 10000, 10000, 11100, 10000, 10000, 10000, 10000, 10000, 10000, 11101, 10000, 10000, 10000],
    [10000, 10000, 10001, 10001, 10001, 11101, 10001, 10001, 10000, 10000, 10001, 10001, 10001, 10001, 10001, 10001, 10001, 10001, 10001, 10001]
    ];

var tilemap2 = [ 
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000], 
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 11111, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10001],
 [10001, 10001, 10001, 10001, 10001, 10000, 10001, 10001, 10001, 10000, 10001, 10001, 10001, 10001, 10001, 10001, 10001, 10001, 10001, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
 [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000] 
];

    
//            W   H   tilemap Xpos Ypos
TM.newTilemap(20, 20, tilemap1, 0, 0);
TM.newTilemap(20, 20, tilemap2, 1, 0);
TM.endWrite();
//TM.newTilemap(10, 10, tilemap1, 0, 1);

//Zápis nepřítele - by Jáchym Kristal (jako ten prášek na vaření aka cukr)
//EA.newEnemy(pozice X, pozice Y, Vyska, Sirka, HP, Rychlost)
EA.newEnemy(550, 300, 75, 50, 10, 3); EA.E[0].move("right");
//EA.newEnemy(1000, 300, 75, 50, 3, 3); EA.E[1].move("right");

function levelLoop() {
    
}