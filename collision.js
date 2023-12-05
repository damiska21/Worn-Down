function collision(entity) {
    //              poziceX  
    //reference: https://github.com/pothonprogramming/pothonprogramming.github.io/tree/master/content/top-down-tiles



    var topLeftX = ((entity.X)-((entity.X) % tile)) / tile;
    var topLeftY = ((entity.Y)-((entity.Y) % tile)) / tile;
    var topLeftTile = TM.getTile(topLeftX, topLeftY);

    var botLeftX = ((entity.X)-((entity.X) % tile)) / tile;
    var botLeftY = (((entity.Y) + entity.height +0.001)-(((entity.Y) + entity.height +0.001) % tile)) / tile;
    var botLeftTile = TM.getTile(botLeftX, botLeftY);

    var botLeftX2 = (((entity.X)-((entity.X) % tile))) / tile;
    var botLeftY2 = (((entity.Y) + entity.height - 5.001)-(((entity.Y) + entity.height - 5.001) % tile)) / tile;
    var botLeftTile2 = TM.getTile(botLeftX2, botLeftY2);

    var botRightX = (((entity.X) + entity.width)-(((entity.X) + entity.width) % tile)) / tile;
    var botRightY = (((entity.Y) + entity.height +0.001)-(((entity.Y) + entity.height +0.001) % tile)) / tile;
    var botRightTile = TM.getTile(botRightX, botRightY);

    var botRightX2 = (((entity.X) + entity.width)-(((entity.X) + entity.width) % tile)) / tile;
    var botRightY2 = (((entity.Y) + entity.height - 5.001)-(((entity.Y) + entity.height - 5.001) % tile)) / tile;
    var botRightTile2 = TM.getTile(botRightX2,botRightY2);

    var topRightX = (((entity.X) + entity.width)-(((entity.X) + entity.width) % tile)) / tile;
    var topRightY = ((entity.Y)-((entity.Y) % tile)) / tile;
    var topRightTile = TM.getTile(topRightX, topRightY);
    
    var topCollidedX = 0;
    var topCollidedY = 0;
    var botCollidedX = 0;
    var botCollidedY = 0;

    entity.sideCollided = "no";
    entity.onground = false;

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

    botLeft: if (botLeftTile2 % 10000 > 0) {
        rightCollision(botLeftX2);
    }
    botRight: if (botRightTile2% 10000 > 0) {
        leftCollision(botRightX2);
    }
    if (entity.coyoteTime) { //coyote time je 160 ms
        if (entity.coyoteTimeTick < 10) {
            entity.coyoteTimeTick++;
        }else if (entity.coyoteTimeTick == 10) {
            entity.coyoteTime = false;
            entity.coyoteTimeTick = 0;
        }
    }
    
    /*function botCollision(playerTile, index) {
        if (entity.gravity < 0 && !entity.botCollided) {
            if (index%100 >= 10) {
                if (playerTile === "topRight") {
                    //if ((topRightY*(tile+2)) > oldPlayerY) {
                        entity.Y += tile - (entity.Y % tile);
                        topCollidedX = topRightX;
                        topCollidedY = topRightY;
                        entity.botCollided = true;
                        return true;
                    //}
                }else if (playerTile === "topLeft") {
                    entity.Y += tile - (entity.Y % tile);
                    topCollidedX = topLeftX;
                    topCollidedY = topLeftY;
                    entity.botCollided = true;
                    return true;
                }
            }
        }
        return false;
    }*/
    function botCollision(row) {
        if (entity.Y - entity.oldY < 0) {
          var bottom = (row + 1) * tile;
          if (entity.Y < bottom && entity.oldY >= bottom) {
            entity.Y = bottom;
          }
        }
      }
    function topCollision(row, index) {
        if (entity.Y - entity.oldY > 0) {
          if ((index % 10)>=1) {
            
          var top = row * tile;//object.oldBottom <= top
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
          if(botLeftTile%10000 >= 1000 || botLeftTile2%10000 >= 1000 || topLeftTile%10000 >= 1000) {
            var right = (column + 1) * tile;
            console.log(entity.oldX + " >= " + right + "  X " + entity.X + " < " + right);
            if (entity.X < right && entity.oldX+2 >= right) {
                entity.friction = 0;
                entity.X = right;
                console.log("bb");
                return true;
              }
          }
        }
        return false;
      }
    function leftCollision(x) {
        if((entity.X - entity.oldX) > 0) {
            var left = x * tile;
            if(botRightTile2%1000 >=100 || topRightTile%1000 >=100 || botRightTile%1000 >=100)
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
    return entity;
}