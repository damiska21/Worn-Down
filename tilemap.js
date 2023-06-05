var tilemapV = [
    [1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1],
    [1, 1, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
];
var sirka = 8;
var vyska = 8;

function tilemap(){
    for (let i = 0; i < sirka; i++) {
        for (let j = 0; j < vyska; j++) {
            if (tilemapV[j][i] === 1) {
                c.fillStyle = "green";
                c.fillRect(i*50, j*50, 50, 50);
            }
        }
    }
}
