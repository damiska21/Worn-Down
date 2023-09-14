var tilemap1 = [
[10000, 10000, 10000, 10000, 10000, 10000, 10000, 11110, 11110, 10000],
[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
[10000, 10000, 10111, 11011, 10000, 10000, 10000, 10000, 10111, 11011],
[10000, 10000, 10000, 11100, 10000, 10000, 10000, 10111, 10110, 10000],
[10000, 10000, 10000, 11110, 10000, 10000, 10000, 10000, 10000, 10000],
[11001, 10000, 10000, 10000, 10000, 11101, 10000, 10000, 10000, 10101],
[10001, 11001, 10000, 10000, 10000, 11101, 10000, 10000, 10000, 10000],
[10000, 10000, 10001, 10001, 10001, 11101, 10001, 10001, 10000, 10001]
];
var tilemap2 = [
[10000, 10000, 10000, 10000, 10000, 10000, 10000, 11110, 11110, 10000],
[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
[10000, 10000, 10111, 11011, 10000, 10000, 10000, 10000, 10111, 11011],
[10000, 10000, 10000, 11100, 10000, 10000, 10000, 10111, 10110, 10000],
[10000, 10000, 10000, 11110, 10000, 10000, 10000, 10000, 10000, 10000],
[11001, 10000, 10000, 10000, 10000, 11101, 10000, 10000, 10000, 10101],
[10001, 11001, 10000, 10000, 10000, 11101, 10000, 10000, 10000, 10000],
[10000, 10000, 10001, 10001, 10001, 11101, 10001, 10001, 10000, 10001]
];
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
for (let i = 0; i < vyska; i++) {
    console.log();
        tilemapV[i] = tilemapV[i].concat(tilemap1[i]);
        tilemapV[i] = tilemapV[i].concat(tilemap2[i]);
}

function tilemap(offset, tilemaps){
    
    for (let i = 0; i < sirka; i++) {
        for (let j = 0; j < vyska; j++) {
            if ((tilemap1[j][i]%10000 > 0) || tilemap1[j][i] == -1) {
                c.fillStyle = "green";
                c.fillRect(i*tile-offset, j*tile, tile, tile);
            }
        }
    }
    if (tilemaps>1) {
        for (let i = 0; i < sirka; i++) {
            for (let j = 0; j < vyska; j++) {
                if ((tilemap2[j][i]%10000 > 0) || tilemap2[j][i] == -1) {
                    c.fillStyle = "green";
                    c.fillRect((i*tile-offset)+sirka*tile, (j*tile), tile, tile);
                }
            }
        }
    }
}