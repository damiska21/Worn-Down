class tilemap {
    constructor(width, height, tilemapArray, Xpos, Ypos) {
        this.width = width,
        this.height = height, 
        this.tilemapArray = tilemapArray,
        this.Xpos = Xpos,
        this.Ypos = Ypos
    }
}
class tilemapConstructor {
    constructor() {
        this.A = []
    }
    newTilemap(width, height, tilemapArray, Xpos, Ypos) {
        let a = new tilemap(width, height, tilemapArray, Xpos, Ypos);
        this.A = this.A.concat(a);
    }

    drawTilemap(tilemapIndex, offset) {
        //console.log("vykreslování tilemapy " + tilemapIndex + " na souřadnicích X: " + TM.A[tilemapIndex].Xpos + " Y: " + TM.A[tilemapIndex].Ypos);
        for (let i = 0; i < sirka; i++) {
            for (let j = 0; j < vyska; j++) {
                if ((TM.A[tilemapIndex].tilemapArray[j][i]%10000 > 0) || TM.A[tilemapIndex].tilemapArray[j][i] == -1) {
                    c.fillStyle = "green";
                    if (TM.A[tilemapIndex].Xpos > 0) {
                        c.fillRect((i*tile-offset) + TM.A[tilemapIndex].Xpos *TM.A[tilemapIndex].width*tile, j*tile, tile, tile);
                    }else {
                        c.fillRect(i*tile-offset, j*tile, tile, tile);
                    }
                }
            }
        }
    }
    getTile(X, Y) {
        //console.log(this.A[Math.floor(X/TM.A[0].width)].tilemapArray[Y][Math.floor(X/this.A[0].width)] + " X: " + X + " Y: " + Y);
        return this.A[Math.floor(X/TM.A[0].width)].tilemapArray[Y][Math.floor(X%this.A[0].width)];
    }
    getTilemapNum(){
        return this.A.length;
    }
}
var TM = new tilemapConstructor(); //tm je TileMap


var tilemapV = [//je nutný aby tady těch prázdnejch arrayů bylo stejně jako vyska
    [],//jinak se to zesere
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

var sirka = 10;
var vyska = 10;


/*
  1111    0001   0010   0100   1000
  -----  -----          
  |   |                 |         |
  |   |                 |         |
  -----          -----  
           top   bot    left   right

blok 0 0 nesmí mít žádnou kolizy, nebude pravděpodobně fungovat
bloky v prvním sloupci mohou mít jenom horní kolizy, boční nefunguje
nedělej jednoblokový díry
VŮBEC
*/
function tilemapDraw(offset){
    for (let i = 0; i < TM.getTilemapNum(); i++) {
       TM.drawTilemap(i, offset);
    }
}