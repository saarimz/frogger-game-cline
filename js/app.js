let player;
let allEnemies = [];

function generateEnemies(n) {
    for (var i = 0; i < n; i++) {
            allEnemies.push(new Enemy());
          }
          //send subclass
          allEnemies.push(new Superbug(), new Superbug(), new Superbug());
    }
}

class Enemy {
    constructor() {
   
        this.sprite = 'images/enemy-bug.png';
        //so that the enemy stars just outside the board
        this.x = (Math.floor(Math.random() * 2000) + 1) * -1;
        //so that the enemies only appear in the path
        this.y = Math.floor(Math.random() * 200) + 51;
        //so that we can adjust the speed from 101 - 200
        this.speed = Math.floor(Math.random() * 100) + 101
    }

    update(dt) {

        //movement along x axis
        this.x += this.speed * dt;

        //collision with player
        this.collisionCheck();
    }

    render() {
        // Draw the enemy on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    drawRectangle() {
        //create a rectangle for collision detection
        return [this.x - 55, this.x + 55, this.y - 30, this.y + 30];
    }

    collisionCheck() {
        //actual collision detection
        let enemyRectangle = this.drawRectangle();
        let playerPos = player.getPos();

        if (
            ((playerPos[0] >= enemyRectangle[0]) && (playerPos[0] <= enemyRectangle[1])) &&
            ((playerPos[1] >= enemyRectangle[2]) && (playerPos[1] <= enemyRectangle[3]))
            ) {
            player.reset();
        }
    }
}

class Superbug extends Enemy {

    constructor() {
        super();
        this.sprite = 'images/enemy-superbug.png';
        this.speed = 400;
    }

}

class Player {
    constructor(sprite = 'images/char-boy.png') {
        this.sprite = sprite;
        this.x = 200;
        this.y = 400;
        this.gameOver = false;
    }

    update(dt) {

        if (!this.gameOver) {
            //get the various keys
            switch (this.key) {
                case 'up':
                    if (this.y > 50) {
                        this.y -= 83;
                    }
                    break;
                case 'down':
                    if (this.y < 400) {
                        this.y += 83;
                    }
                    break;
                case 'left':
                    if (this.x >= 100) {
                        this.x -= 100;
                    }
                    break;
                case 'right':
                    if (this.x < 400) {
                        this.x += 100;
                    }
            }
            //so that after the player moves they dont continue moving
            this.key = null;

            //if the player reaches the water end game
            if (this.y <= 0) {

                this.gameOver = true;
                this.reset();
            }
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        this.key = key;
    }

    reset() {
        this.x = 200;
        this.y = 400;
        this.gameOver = false;
        sendEnemies(10);
    }

    setSprite(sprite) {
        this.sprite = sprite;
    }

    getPos() {
        return [this.x, this.y];
    }

}


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

$(document).ready(function(){

    $( "#dialog-message" ).dialog({
      modal: true,
      buttons: {
        OK: function() {
        //send enemies only after OK is pressed
          $(this).dialog( "close" );
          //default - send 10 enemies
          sendEnemies(10);
        }
      },
      resizable: false,
      width: 600,
      height: 350,
      open: function() {
        let selected = false;
        $(".character img").click(function(){
            let char = $(this).attr("src");
            let charName = $(this).attr("alt");
            player.setSprite(char);
            $("#select-message").text(`You have selected ${charName}!`);
        });
      }
    });

    player = new Player();
});
