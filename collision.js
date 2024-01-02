function collision(entity) {
//reference: https://github.com/pothonprogramming/pothonprogramming.github.io/tree/master/content/top-down-tiles

//#region POČTY
//tahle matika by asi šla zlepšit ale na to jsem moc línej
    var topLeftX = ((entity.X)-((entity.X) % TM.tile)) / TM.tile;
    var topLeftY = ((entity.Y)-((entity.Y) % TM.tile)) / TM.tile;
    var topLeftTile = TM.getTile(topLeftX, topLeftY);

    var botLeftX = ((entity.X)-((entity.X) % TM.tile)) / TM.tile;
    var botLeftY = (((entity.Y) + entity.height +0.001)-(((entity.Y) + entity.height +0.001) % TM.tile)) / TM.tile;
    var botLeftTile = TM.getTile(botLeftX, botLeftY);

    var midLeftX = (((entity.X)-((entity.X) % TM.tile))) / TM.tile;
    var midLeftY = (((entity.Y) + entity.height/2)-(((entity.Y) + entity.height/2) % TM.tile)) / TM.tile;
    var midLeftTile = TM.getTile(midLeftX, midLeftY);

    var botRightX = (((entity.X) + entity.width)-(((entity.X) + entity.width) % TM.tile)) / TM.tile;
    var botRightY = (((entity.Y) + entity.height +0.001)-(((entity.Y) + entity.height +0.001) % TM.tile)) / TM.tile;
    var botRightTile = TM.getTile(botRightX, botRightY);

    var midRightX = (((entity.X) + entity.width)-(((entity.X) + entity.width) % TM.tile)) / TM.tile;
    var midRightY = (((entity.Y) + entity.height/2)-(((entity.Y) + entity.height/2) % TM.tile)) / TM.tile;
    var midRightTile = TM.getTile(midRightX, midRightY);

    var topRightX = (((entity.X) + entity.width)-(((entity.X) + entity.width) % TM.tile)) / TM.tile;
    var topRightY = ((entity.Y)-((entity.Y) % TM.tile)) / TM.tile;
    var topRightTile = TM.getTile(topRightX, topRightY);
    
    entity.sideCollided = "no";
    entity.onground = false;
//#endregion

//#region spouštění funkcí
    topLeft: if (topLeftTile % 10000 > 0) {
        if (rightCollision(topLeftX)) { break topLeft;}
        botCollision(topLeftY);
    }
    botLeft: if (botLeftTile % 10000 > 0) {
        if (topCollision(botLeftY, botLeftTile)) {break botLeft;}
        rightCollision(botLeftX)
    }
    topRight: if (topRightTile % 10000 > 0) {
        if (leftCollision(topRightX)) { break topRight;}
        botCollision(topRightY);
    }
    botRight: if (botRightTile % 10000 > 0) {
        if (topCollision(botRightY, botRightTile)) {break botRight;}
        leftCollision(botRightX);
    }

    if (midLeftTile % 10000 > 0) {
        rightCollision(midLeftX);
    }
    if (midRightTile% 10000 > 0) {
        leftCollision(midRightX);
    }

    if (entity.coyoteTime) { //coyote time je 160 ms
        if (entity.coyoteTimeTick < 10) {
            entity.coyoteTimeTick++;
        }else if (entity.coyoteTimeTick == 10) {
            entity.coyoteTime = false;
            entity.coyoteTimeTick = 0;
        }
    }
    //#endregion

 //#region FUNKCE
    function botCollision(row) {
        if (entity.Y - entity.oldY < 0) {
          var bottom = (row + 1) * TM.tile;
          if (entity.Y < bottom && entity.oldY >= bottom) {
            entity.Y = bottom;
          }
        }
      }
    function topCollision(row, index) {
        if (entity.Y - entity.oldY > 0) {
          if ((index % 10)>=1) {
            
          var top = row * TM.tile;//object.oldBottom <= top
          if ((entity.Y + entity.height) > top && entity.oldY+entity.height <=top) {
            entity.gravity = 0;
            entity.Y = top - entity.height - 0.01;
            entity.onground = true;
            entity.coyoteTime = true;
            return true;
          }
         }
        }
        return false;
      }
    function rightCollision(column) {
        if (entity.X - entity.oldX < 0) {
          if(botLeftTile%10000 >= 1000 || midLeftTile%10000 >= 1000 || topLeftTile%10000 >= 1000) {
            var right = (column + 1) * TM.tile;
            //console.log(entity.oldX + " >= " + right + "  X " + entity.X + " < " + right);
            if (entity.X < right && entity.oldX+2 >= right) {
                entity.friction = 0;
                entity.X = right;
                entity.sideCollided = "right"; //tohle je pro nepřítele aby věděli kdy se otočit
                return true;
              }
          }
        }
        return false;
      }
    function leftCollision(x) {
        if((entity.X - entity.oldX) > 0) {
            var left = x * TM.tile;
            if(midRightTile%1000 >=100 || topRightTile%1000 >=100 || botRightTile%1000 >=100)
            {
                if ((entity.X + entity.width) > left && (entity.oldX + entity.width-2) <= left) {
                    entity.friction = 0;
                    entity.X = left-entity.width-0.001;
                    entity.sideCollided = "left";
                    return true;
                }
            }
            
        }
        return false;
    }
    //#endregion
    return entity;
}