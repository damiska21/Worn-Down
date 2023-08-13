var tilemapV = [
[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
[10000, 10000, 10111, 11001, 10000, 10000, 10000, 10000, 10110, 10010, 10000, 10000, 10000, 10000, 10000],
[10000, 10000, 10000, 11010, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10101, 10000, 10000, 10000],
[10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 11001, 10000, 10000, 10000, 10000],
[10000, 10000, 10000, 10000, 10000, 11101, 10000, 10000, 10101, 10001, 10000, 10000, 10000, 10000, 10000],
[10001, 11001, 10000, 10000, 10000, 11100, 10000, 10000, 10100, 10000, 10000, 10000, 10000, 10000, 10000],
[10000, 10001, 10001, 10001, 10001, 11101, 10001, 10001, 10000, 10000, 10000, 10000, 10000, 10000, 10000]
];
/*
  1111    0001   0010   0100   1000
  -----  -----          
  |   |                 |         |
  |   |                 |         |
  -----          -----  
           top   bot    left   right

blok 0 0 nesmí mít žádnou kolizy, nebude pravděpodobně fungovat
bloky v prvním sloupci mohou mít jenom horní kolizy, boční nefunguje
*/

var sirka = 15;
var vyska = 10;

function tilemap(){
    for (let i = 0; i < sirka; i++) {
        for (let j = 0; j < vyska; j++) {
            if ((tilemapV[j][i]%10000 > 0) || tilemapV[j][i] == -1) {
                c.fillStyle = "green";
                c.fillRect(i*tile, j*tile, tile, tile);
            }
        }
    }
}
