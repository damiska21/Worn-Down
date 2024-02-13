var emptyTilemap = [[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000]];

class tilemap {
    constructor(width, height, tilemapArray, textureArray, Xpos, Ypos) {
        this.width = width,
        this.height = height, 
        this.tilemapArray = tilemapArray,
        this.textureArray = textureArray,
        this.Xpos = Xpos,
        this.Ypos = Ypos
    }
}
class tilemapConstructor {
    constructor() {
        this.A = [],
        this.B = [],

        this.low = 0,//nejnižší úroveň levelu (nepoužívané)

        this.respawnX = 0,
        this.respawnY = 0,
        this.tile = 90
    }
    newTilemap(width, height, tilemapArray, Xpos, Ypos) {
        let a = new tilemap(width, height, tilemapArray, Xpos, Ypos);
        if (Ypos==0) {
            this.A = this.A.concat(a);
            return;
        }
        this.B = this.B.concat(a);
    }

    drawTilemap(tilemapIndex, offset) {
        for (let i = 0; i < TM.A[tilemapIndex].width; i++) {
            for (let j = 0; j < TM.A[tilemapIndex].height; j++) {
                var tileDrawn = this.getTileTexture(i+(tilemapIndex*20), j);
                if (tileDrawn==-1) { continue; }
                var tm = TM.A[tilemapIndex];
                c.drawImage(tilemapFinalImg, (tileDrawn%5)*150, (Math.floor(tileDrawn/5))*170,    150, 170,       ((i*this.tile -offset) + (tm.Xpos *(tm.width*this.tile))-30), (j*this.tile-Yoffset)-40, 150, 170);
            }
        }
    }
    getTile(X, Y) {
        //console.log((this.A[Math.floor(X/TM.A[0].width)].tilemapArray[Y][X%20]) + " X: " + X + " Y: " + Y);
        //console.log(X + " " + Y);
        return this.A[Math.floor(X/TM.A[0].width)].tilemapArray[Y][(X%(this.A[0].width))];
    }
    getTileTexture(X, Y) {
        //console.log((this.A[Math.floor(X/TM.A[0].width)].tilemapArray[Y][X%20]) + " X: " + X + " Y: " + Y);
        //console.log(X + " " + Y);
        return this.A[Math.floor(X/TM.A[0].width)].textureArray[Y][(X%this.A[0].width)];
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

class tileset {
    constructor(image, tileHeight, tileWidth, numOfTilesX, numOfTilesY, numOfTiles){
        this.image = image, 
        this.tileHeight = tileHeight,
        this.tileWidth = tileWidth,
        this.numOfTiles = numOfTiles,
        this.numOfTilesX = numOfTilesX,
        this.numOfTilesY = numOfTilesY,
        this.animationCount = 0
    }
    getTile(tileIndex){
        return ;
    }
}

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
    /*for (let i = 0; i < TM.A.length; i++) {
        if ((i*sirka)*this.tile > offset -1600 && (i*sirka) < offset + 3000) { //aby se nevykreslovalo mimo screen
            
        }
    }*/
    TM.drawTilemap(0, offset, 0);
    /*for (let i = 0; i < TM.B.length; i++) {
        if ((i*sirka)*this.tile > offset -1600 && (i*sirka) < offset + 3000) {
          TM.drawTilemap(i, offset, 1);
        }
    }*/
}