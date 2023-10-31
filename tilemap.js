var emptyTilemap = [
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000]
];

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
        this.A = [],
        this.B = [],

        this.low = 0//nejnižší úroveň levelu
    }
    newTilemap(width, height, tilemapArray, Xpos, Ypos) {
        let a = new tilemap(width, height, tilemapArray, Xpos, Ypos);
        if (Ypos==1) {
            this.B = this.B.concat(a);
            return;
        }
        this.A = this.A.concat(a);
    }

    drawTilemap(tilemapIndex, offset, Y) {
        //console.log("vykreslování tilemapy " + tilemapIndex + " na souřadnicích X: " + TM.A[tilemapIndex].Xpos + " Y: " + TM.A[tilemapIndex].Ypos);
        if (Y == 0) {
            for (let i = 0; i < sirka; i++) {
                for (let j = 0; j < vyska; j++) {
                    if ((TM.A[tilemapIndex].tilemapArray[j][i]%10000 > 0) || TM.A[tilemapIndex].tilemapArray[j][i] == -1) {
                        c.fillStyle = "green";
                        if (TM.A[tilemapIndex].Xpos > 0) {
                            c.fillRect((i*tile-offset) + TM.A[tilemapIndex].Xpos *TM.A[tilemapIndex].width*tile, j*tile-Yoffset, tile, tile);
                        }else {
                            c.fillRect(i*tile-offset, j*tile-Yoffset, tile, tile);
                        }
                    }
                }
            }
        }else if (Y == 1) {
            for (let i = 0; i < sirka; i++) {
                for (let j = 0; j < vyska; j++) {
                    if ((TM.B[tilemapIndex].tilemapArray[j][i]%10000 > 0) || TM.B[tilemapIndex].tilemapArray[j][i] == -1) {
                        c.fillStyle = "green";
                        if (TM.B[tilemapIndex].Xpos > 0) {
                            c.fillRect((i*tile-offset) + TM.A[tilemapIndex].Xpos *TM.A[tilemapIndex].width*tile, j*tile+(10*tile)-Yoffset, tile, tile);
                        }else {
                            c.fillRect(i*tile-offset, j*tile+(10*tile)-Yoffset, tile, tile);
                        }
                    }
                }
           }
        }
    }
    getTile(X, Y) {
        //console.log(this.A[Math.floor(X/TM.A[0].width)].tilemapArray[Y][Math.floor(X/this.A[0].width)] + " X: " + X + " Y: " + Y);
        if (Y>9) {
            return this.B[Math.floor(X/TM.A[0].width)].tilemapArray[Y-10][Math.floor(X%this.A[0].width)];
        }
        return this.A[Math.floor(X/TM.A[0].width)].tilemapArray[Y][Math.floor(X%this.A[0].width)];
    }
    setTile(X, Y, value){
        if (Y>9) {
            this.B[X/10].tilemapArray[Y][X] = value; return;
        }
        this.A[X/10].tilemapArray[Y][X] = value;
        return;
    }
    getTilemapNum(Y){
        if (Y == 0) {
            return this.A.length;
        }
        if (Y == 1) {
            return this.B.length;
        }
    }
    getTilemapHeight(){
        if (this.B.length > 0) {
            return this.B[0].height + this.A[0].height;
        }
        return this.A[0].height;
    }
    endWrite(){
        let a = new tilemap(10, 10, emptyTilemap, this.A.length, 0);
        let b = new tilemap(10, 10, emptyTilemap, this.B.length, 1);
        this.A = this.A.concat(a);
        this.B = this.B.concat(b);
    }
}
var TM = new tilemapConstructor(); //tm je TileMap

var sirka = 10;
var vyska = 10;


/*
  1111    0001   0010   0100   1000
  -----  -----          
  |   |                 |         |
  |   |                 |         |
  -----          -----  
           top   bot    left   right

blok 0 0 nesmí mít žádnou kolizy (kromě horní), nebude pravděpodobně fungovat
bloky v prvním sloupci mohou mít jenom horní kolizy, boční nefunguje
nedělej jednoblokový díry
VŮBEC
*/
function tilemapDraw(offset){
    for (let i = 0; i < TM.getTilemapNum(0); i++) {
        if ((i*sirka)*tile > offset -1600 && (i*sirka) < offset + 3000) {
            TM.drawTilemap(i, offset, 0);
        }
    }
    for (let i = 0; i < TM.getTilemapNum(1); i++) {
        if ((i*sirka)*tile > offset -1600 && (i*sirka) < offset + 3000) {
          TM.drawTilemap(i, offset, 1);
        }
    }
}