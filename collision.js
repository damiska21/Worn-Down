function collision(offset, X, Y, H, W, oldX, oldY, onGround, Igravity, oldTopCollidedX, oldTopCollidedY, oldBotCollidedX, oldBotCollidedY, botCollided, controller) {
    //              poziceX  
    var topLeftX = ((X+offset)-((X+offset) % tile)) / tile;
    var topLeftY = (Y-(Y % tile)) / tile;
    var topLeftTile = tilemapV[topLeftY][topLeftX];

    var botLeftX = ((X+offset)-((X+offset) % tile)) / tile;
    var botLeftY = ((Y + H +0.001)-((Y + H +0.001) % tile)) / tile;
    var botLeftTile = tilemapV[botLeftY][botLeftX];

    var botLeftX2 = (((X+offset)-((X+offset) % tile))) / tile;
    var botLeftY2 = ((Y + H - 5.001)-((Y + H - 5.001) % tile)) / tile;
    var botLeftTile2 = tilemapV[botLeftY2][botLeftX2];

    var botRightX = (((X+offset) + W)-(((X+offset) + W) % tile)) / tile;
    var botRightY = ((Y + H +0.001)-((Y + H +0.001) % tile)) / tile;
    var botRightTile = tilemapV[botRightY][botRightX];

    var botRightX2 = (((X+offset) + W)-(((X+offset) + W) % tile)) / tile;
    var botRightY2 = ((Y + H - 5.001)-((Y + H - 5.001) % tile)) / tile;
    var botRightTile2 = tilemapV[botRightY2][botRightX2];

    var topRightX = (((X+offset) + W)-(((X+offset) + W) % tile)) / tile;
    var topRightY = (Y-(Y % tile)) / tile;
    var topRightTile = tilemapV[topRightY][topRightX];
    var topCollidedX = 0;
    var topCollidedY = 0;
    var botCollidedX = 0;
    var botCollidedY = 0;
    botCollided = false;
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
        if(onGround) {coyoteTime = true; } onGround = false;
    } //padání (detekce bloků pod hráčem)

    if (coyoteTime) { //coyote time je 160 ms
        if (coyoteTimeTick < 10) {
            coyoteTimeTick++;
        }else if (coyoteTimeTick == 10) {
            coyoteTime = false;
            coyoteTimeTick = 0;
        }
    }
    
    function botCollision(playerTile, index) {
        if (Igravity < 0 && !botCollided) {
            if (index%100 >= 10) {
                if (playerTile === "topRight") {
                    //if ((topRightY*(tile+2)) > oldPlayerY) {
                        Y += tile - (Y % tile);
                        topCollidedX = topRightX;
                        topCollidedY = topRightY;
                        botCollided = true;
                        return true;
                    //}
                }else if (playerTile === "topLeft") {
                    Y += tile - (Y % tile);
                    topCollidedX = topLeftX;
                    topCollidedY = topLeftY;
                    botCollided = true;
                    return true;
                }
            }
        }
        return false;
    }
    function topCollision(playerTile, index) { //pokud byla kolize provedena vrací true
        if (Igravity > 0) {//jinak false
            if ((index % 10)>=1) {
                if(playerTile === "botLeft") {
                    if((botLeftY)*tile > oldY + H) {
                        Y -= (Y+H) % tile;
                        Igravity = 0;
                        onGround = true;
                        botCollidedX = botLeftX;
                        botCollidedY = botLeftY;
                        return true;
                    }
                }
                if(playerTile === "botRight"){
                    if ((botRightY)*tile > oldY + H) {
                        Y -= (Y+H) % tile;
                        Igravity = 0;
                        onGround = true;
                        botCollidedX = botRightX;
                        botCollidedY = botRightY;
                        return true;
                    }  
                }
            }
        }else if(onGround) {
            botCollidedX = oldBotCollidedX;
            botCollidedY = oldBotCollidedY;
            return true;
        }
        return false;
    }
    
    function rightCollision() {
        if (friction < 0) {
            if ((botLeftX != botLeftX2 || botLeftY != botLeftY2) || !onGround) {
                if (oldX+0.001 > ((botLeftX2*tile))) {
                    if (topLeftTile%10000 >= 1000) {
                        if (topLeftX != topCollidedX && topLeftY != topCollidedY) {
                            X = topLeftX*tile + tile + 0.01-offset;
                            return true;
                        }
                    }else if(botLeftTile2%10000 >= 1000){
                        if (botLeftX2 != botCollidedX && botLeftY2 != botCollidedY) {
                            X = botLeftX2*tile + tile + 0.01-offset;
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    function leftCollision() {
        if (friction > 0) {
           if (((botRightX != botRightX2) || (botRightY != botRightY2)) || !onGround) {
               if (oldX+W <= (topRightX+2)*tile - tile) {
                   if ((topRightTile%1000 >=100)) {
                        if (topRightX != topCollidedX && topRightX != topCollidedY) {
                            X = topRightX*tile - 0.01 - tile-offset;
                            
                            return true;
                        }
                   }else if(botRightTile2%1000 >=100){
                        if(botRightX2 != botCollidedX && botRightY2 != botCollidedY){
                        X = botRightX2*tile - 0.01 - tile-offset;
                        return true;
                        }
                   }
               }
           }
        }
        return false;
    }
    oldBotCollidedX = botCollidedX;
    oldBotCollidedY = botCollidedY;
    oldTopCollidedX = topCollidedX;
    oldTopCollidedY = topCollidedY;


    return [offset, X, Y, H, W, onGround, Igravity, oldBotCollidedX, oldBotCollidedY, botCollided];
}