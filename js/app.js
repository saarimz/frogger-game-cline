
class Enemy {
    constructor() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png'
        //so that the enemy stars just outside the board
        this.x = -100; 
        //so that the enemies only appear in the path
        this.y = Math.floor(Math.random() * 200) + 51;
        //so that we can adjust the speed from 101 - 200
        this.speed = Math.floor(Math.random() * 100) + 101
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
         // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.this.x
    
    /*
        this.timeout = setTimeout(() => {
                this.x += 1 * dt;
        },1);

        if (this.x > 505) {
            clearTimeout(this.timeout);
        }*/

        this.x += this.speed * dt;
        
    }

    render() {
        // Draw the enemy on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png'
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
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
allEnemies.push(new Enemy(), new Enemy());

let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
