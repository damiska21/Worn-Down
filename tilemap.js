var tilemapV = [
    [9, 9, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [9, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8, 8, 8, 8],
    [3, 0, 0, 0, 6, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 2, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0],
    [9, 6, 0, 0, 2, 1, 1, 9, 0, 0, 0, 0, 0, 0, 6],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 1, 1, 1],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 1, 1, 1, 1],
    [9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

/*
1 - spodek
2 - levý bok
3 - pravý bok

4 - pravý levý
5 - pravý levý horní
6 - pravý horní
7 - levý horní
8 - spodní
9 - výplň
*/

var sirka = 15;
var vyska = 10;

function tilemap(){
    for (let i = 0; i < sirka; i++) {
        for (let j = 0; j < vyska; j++) {
            if (tilemapV[j][i] > 0) {
                c.fillStyle = "green";
                c.fillRect(i*tile, j*tile, tile, tile);
            }
        }
    }
}
