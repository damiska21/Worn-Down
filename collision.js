function collisionT(entity) {
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
    
    

    var leftCollumn = Math.floor((entity.X) / tile);
    topLeft: if (topLeftTile % 10000 > 0) {
        if (leftCollision(topLeftX)) { break topLeft;}
        if (rightCollision()) { break topLeft;}
        botCollision();
    }
    botLeft: if (botLeftTile % 10000 > 0) {
        if (topCollision(botLeftY)) {break botLeft;}
        if (leftCollision(botLeftX)) { break botLeft;}
        if (rightCollision()) { break botLeft;}
        botCollision();
    }

    topRight: if (topRightTile % 10000 > 0) {
        if (leftCollision(topRightX)) { break topRight;}
        if (rightCollision()) { break topRight;}
        botCollision();
    }
    botRight: if (botRightTile % 10000 > 0) {
        if (topCollision(botRightY)) {break botRight;}
        if (leftCollision(botRightX)) { break botRight;}
        if (rightCollision()) { break botRight;}
        botCollision();
    }
/*
    if(!topCollision("botLeft", botLeftTile)){
        if(!rightCollision()) { botCollision("topRight", topRightTile);}
    }
    if(!topCollision("botRight", botRightTile)){
        if(!leftCollision()) {   botCollision("topLeft", topLeftTile);}
    }

    rightCollision();
    if (botRightTile2%1000 >=100 || topRightTile%1000 >=100 || botRightTile%1000 >=100) {
        leftCollision(leftCollumn);
        console.log("negr");
    }
    rightCollision();
    */
    if (botLeftTile%10000 == 0 && botRightTile%10000 == 0) { 
        if(entity.onground) {entity.coyoteTime = true; } entity.onground = false;
    } //padání (detekce bloků pod hráčem)

    if (entity.coyoteTime) { //coyote time je 160 ms
        if (entity.coyoteTimeTick < 10) {
            entity.coyoteTimeTick++;
        }else if (entity.coyoteTimeTick == 10) {
            entity.coyoteTime = false;
            entity.coyoteTimeTick = 0;
        }
    }
    
    function botCollision(playerTile, index) {
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
    }

    function topCollision(row) {
        if (entity.Y - entity.oldY > 0) {
          var top = row * tile;
          if (entity.Y + entity.height > top && entity.oldX+entity.height <= top) {
            entity.gravity = 0;
            entity.Y = top - entity.height - 0.01;
            return true;
          }
        }
        return false;
      }

    function topCollision1(playerTile, index) { //pokud byla kolize provedena vrací true
        if (entity.gravity > 0) {//jinak false
            if ((index % 10)>=1) {
                if(playerTile === "botLeft") {
                    if((botLeftY)*tile > entity.oldY + entity.height) {
                        entity.Y -= (entity.Y+entity.height) % tile;
                        entity.gravity = 0;
                        entity.onground = true;
                        entity.coyoteTime = true;
                        botCollidedX = botLeftX;
                        botCollidedY = botLeftY;
                        return true;
                    }
                }
                if(playerTile === "botRight"){
                    if ((botRightY)*tile > entity.oldY + entity.height) {
                        entity.Y -= (entity.Y+entity.height) % tile;
                        entity.gravity = 0;
                        entity.onground = true;
                        entity.coyoteTime = true;
                        botCollidedX = botRightX;
                        botCollidedY = botRightY;
                        return true;
                    }  
                }
            }
        }else if(entity.onground) {
            entity.botCollidedX = entity.oldBotCollidedX;
            entity.botCollidedY = entity.oldBotCollidedY;
            return true;
        }
        return false;
    }
    
    function rightCollision() {
        if (entity.friction < 0) { 
            if ((botLeftX != botLeftX2 || botLeftY != botLeftY2) || !entity.onground) {
                if (entity.oldX+0.001 > ((botLeftX2*tile))) {
                    if (topLeftTile%10000 >= 1000) {
                        if (topLeftX != topCollidedX && topLeftY != entity.topCollidedY) {
                            entity.X = topLeftX*tile + tile + 0.01;
                            entity.sideCollided = "right";
                            return true;
                        }
                    }else if(botLeftTile2%10000 >= 1000){
                        if (botLeftX2 != botCollidedX && botLeftY2 != botCollidedY) {
                            entity.X = botLeftX2*tile + tile + 0.01;
                            entity.sideCollided = "right";
                            return true;
                        }
                    }
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
                if ((entity.X + entity.width) > left && (entity.oldX + entity.width) <= left) {
                    entity.friction = 0;
                    entity.X = left-entity.width-0.001;
                    entity.sideCollided = "left";
                    return true;
                }
            }
            
        }
        return false;
    }

    entity.oldBotCollidedX = botCollidedX;
    entity.oldBotCollidedY = botCollidedY;
    entity.oldTopCollidedX = topCollidedX;
    entity.oldTopCollidedY = topCollidedY;

    return entity;
}