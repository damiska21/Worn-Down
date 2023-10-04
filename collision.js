function collisionT(entity, offset) {
    //              poziceX  
    var topLeftX = ((entity.X+offset)-((entity.X+offset) % tile)) / tile;
    var topLeftY = (entity.Y-(entity.Y % tile)) / tile;
    var topLeftTile = TM.getTile(topLeftX, topLeftY);

    var botLeftX = ((entity.X+offset)-((entity.X+offset) % tile)) / tile;
    var botLeftY = (((entity.Y+Yoffset) + entity.height +0.001)-(((entity.Y+Yoffset) + entity.height +0.001) % tile)) / tile;
    var botLeftTile = TM.getTile(botLeftX, botLeftY);

    var botLeftX2 = (((entity.X+offset)-((entity.X+offset) % tile))) / tile;
    var botLeftY2 = (((entity.Y+Yoffset) + entity.height - 5.001)-(((entity.Y+Yoffset) + entity.height - 5.001) % tile)) / tile;
    var botLeftTile2 = TM.getTile(botLeftX2, botLeftY2);

    var botRightX = (((entity.X+offset) + entity.width)-(((entity.X+offset) + entity.width) % tile)) / tile;
    var botRightY = (((entity.Y+Yoffset) + entity.height +0.001)-(((entity.Y+Yoffset) + entity.height +0.001) % tile)) / tile;
    var botRightTile = TM.getTile(botRightX, botRightY);

    var botRightX2 = (((entity.X+offset) + entity.width)-(((entity.X+offset) + entity.width) % tile)) / tile;
    var botRightY2 = (((entity.Y+Yoffset) + entity.height - 5.001)-(((entity.Y+Yoffset) + entity.height - 5.001) % tile)) / tile;
    var botRightTile2 = TM.getTile(botRightX2,botRightY2);

    var topRightX = (((entity.X+offset) + entity.width)-(((entity.X+offset) + entity.width) % tile)) / tile;
    var topRightY = ((entity.Y+Yoffset)-((entity.Y+Yoffset) % tile)) / tile;
    var topRightTile = TM.getTile(topRightX, topRightY);
    
    var topCollidedX = 0;
    var topCollidedY = 0;
    var botCollidedX = 0;
    var botCollidedY = 0;

    entity.sideCollided = "no";
    //neptej se, jsem retard
    if(!topCollision("botLeft", botLeftTile)){
        if(!rightCollision()) { botCollision("topRight", topRightTile);}
    }
    if(!topCollision("botRight", botRightTile)){
        if(!leftCollision()) {   botCollision("topLeft", topLeftTile);}
    }
    rightCollision();
    leftCollision();
    rightCollision();
    leftCollision();
    
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
    function topCollision(playerTile, index) { //pokud byla kolize provedena vrací true
        if (entity.gravity > 0) {//jinak false
            if ((index % 10)>=1) {
                if(playerTile === "botLeft") {
                    if((botLeftY)*tile > entity.oldY + entity.height + Yoffset) {
                        entity.Y -= (entity.Y+entity.height+Yoffset) % tile;
                        entity.gravity = 0;
                        entity.onground = true;
                        botCollidedX = botLeftX;
                        botCollidedY = botLeftY;
                        return true;
                    }
                }
                if(playerTile === "botRight"){
                    if ((botRightY)*tile > entity.oldY + entity.height + Yoffset) {
                        entity.Y -= (entity.Y+entity.height + Yoffset) % tile;
                        entity.gravity = 0;
                        entity.onground = true;
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
                if (entity.oldX+0.001 > ((botLeftX2*tile)-offset)) {
                    if (topLeftTile%10000 >= 1000) {
                        if (topLeftX != topCollidedX && topLeftY != entity.topCollidedY) {
                            entity.X = topLeftX*tile + tile + 0.01-offset;
                            entity.sideCollided = "right";
                            return true;
                        }
                    }else if(botLeftTile2%10000 >= 1000){
                        if (botLeftX2 != botCollidedX && botLeftY2 != botCollidedY) {
                            entity.X = botLeftX2*tile + tile + 0.01-offset;
                            entity.sideCollided = "right";
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    function leftCollision() {
        if (entity.friction > 0) {
           if (((botRightX != botRightX2) || (botRightY != botRightY2)) || !entity.onground) {
               if (entity.oldX+entity.width <= (topRightX+2)*tile - tile) {
                   if (topRightTile%1000 >=100) {
                        if (topRightX != topCollidedX && topRightX != topCollidedY) {
                            entity.X = topRightX*tile - 0.01 - tile-offset;
                            entity.sideCollided = "left";
                            return true;
                        }
                   }else if(botRightTile2%1000 >=100){
                        if(botRightX2 != botCollidedX && botRightY2 != botCollidedY){
                            entity.X = botRightX2*tile - 0.01 - tile-offset;
                            entity.sideCollided = "left";
                        return true;
                        }
                   }
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