var emptyTilemap = [
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
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
    [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000]
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
        if (Ypos==0) {
            this.A = this.A.concat(a);
            return;
        }
        this.B = this.B.concat(a);
    }

    drawTilemap(tilemapIndex, offset, Y) {
        //console.log("vykreslování tilemapy " + tilemapIndex + " na souřadnicích X: " + TM.A[tilemapIndex].Xpos + " Y: " + TM.A[tilemapIndex].Ypos);
                        c.fillStyle = "green";
        if (Y == 0) {
            for (let i = 0; i < sirka; i++) {
                for (let j = 0; j < vyska; j++) {
                    if ((TM.getTile(i+(tilemapIndex*20), j)%10000 > 0) || TM.getTile(i+(tilemapIndex*20), j) == -1) {
                        if (tilemapIndex > 0) {
                            c.fillRect((i*tile -offset) + (TM.A[tilemapIndex].Xpos *(TM.A[tilemapIndex].width*tile)), j*tile-Yoffset, tile, tile);
                        }else {
                            c.fillRect(i*tile-offset, j*tile-Yoffset, tile, tile);
                        }
                    }
                }
            }
        }else if (Y == 1) {
            for (let i = 0; i < sirka; i++) {
                for (let j = 0; j < vyska; j++) {
                    if ((TM.getTile(i, j)%10000 > 0) || TM.getTile(i, j) == -1) {
                        if (TM.B[tilemapIndex].Xpos > 0) {
                            c.fillRect((i*tile-offset) + TM.A[tilemapIndex].Xpos *TM.A[tilemapIndex].width*tile, j*tile+(10*tile)-Yoffset, tile, tile);
                        }else {
                            c.fillRect(i*tile-offset, j*tile+(20*tile)-Yoffset, tile, tile);
                        }
                    }
                }
           }
        }
    }
    getTile(X, Y) {
        //console.log(this.A[Math.floor(X/TM.A[0].width)].tilemapArray[Y][Math.floor(X/this.A[0].width)] + " X: " + X + " Y: " + Y);
        if (Y>19) {
            return this.B[Math.floor(X/TM.B[0].width)].tilemapArray[Y-20][X%this.B[0].width];
        }
        return this.A[Math.floor(X/TM.A[0].width)].tilemapArray[Y][X%20];
    }
    setTile(X, Y, value){
        if (Y>19) {
            this.B[X/20].tilemapArray[Y][X] = value; return;
        }
        this.A[X/20].tilemapArray[Y][X] = value;
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
        let a = new tilemap(20, 20, emptyTilemap, this.A.length, 0);
        let b = new tilemap(20, 20, emptyTilemap, this.B.length, 1);
        this.A = this.A.concat(a);
        this.B = this.B.concat(b);
    }
}
var TM = new tilemapConstructor(); //tm je TileMap

var sirka = 20;
var vyska = 20;


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
    for (let i = 0; i < TM.A.length; i++) {
        if ((i*sirka)*tile > offset -1600 && (i*sirka) < offset + 3000) { //aby se nevykreslovalo mimo screen
            
        }
    }
    TM.drawTilemap(0, offset, 0);
    TM.drawTilemap(1, offset, 0);
    /*for (let i = 0; i < TM.B.length; i++) {
        if ((i*sirka)*tile > offset -1600 && (i*sirka) < offset + 3000) {
          TM.drawTilemap(i, offset, 1);
        }
    }*/
}