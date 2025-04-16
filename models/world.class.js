/**
 * Represents the game world, including the player character, enemies, coins, throwable objects, status bars, and level elements.
 * Handles rendering, collision detection, and game logic updates.
 */
class World {
    /**
     * The main player character.
     * @type {Character}
     */
    character = new Character();

    /**
     * Currently thrown object (if any).
     * @type {ThrowableObject}
     */
    throwableObject;

    /**
     * Coin tracking object for collection status.
     * @type {Coins}
     */
    coin = new Coins();

    /**
     * Bottle tracking object for collection status.
     * @type {Bottles}
     */
    bottle = new Bottles();

    /**
     * Test string (for debugging or temporary use).
     * @type {string}
     */
    test = 'test';

    /**
     * The current level setup.
     * @type {Level}
     */
    level = createLevel();

    /**
     * The canvas element where the game is rendered.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * The rendering context for the canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * Keyboard input handler.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * Camera x-axis offset to simulate movement.
     * @type {number}
     */
    camera_x = 0;

    /**
     * The main health/status bar.
     * @type {StatusBar}
     */
    statusBar = new StatusBar();

    /**
     * The status bar for collected coins.
     * @type {CoinsBar}
     */
    coinsBar = new CoinsBar();

    /**
     * The status bar for collected bottles.
     * @type {BottlesBar}
     */
    bottlesBar = new BottlesBar();

    /**
     * Array of active throwable objects (e.g., bottles).
     * @type {ThrowableObject[]}
     */
    throwableObjects = [];

    /**
     * Direction the character is facing when throwing an object.
     * @type {boolean}
     */
    throwDirection = false;

    /** @type {number} */
    checkCollisionsThrowBottlesInterval;

    /** @type {number} */
    checkCollisionsEnemiesInterval;

    /** @type {number} */
    checkCollisionsBossChickenInterval;

    /** @type {number} */
    checkCollisionsCoinsInterval;

    /** @type {number} */
    checkCollisionsBottlesInterval;

    /**
     * Manages game sound effects.
     * @type {SoundManager}
     */
    soundManager;

    /**
     * Initializes the World with canvas and keyboard input, starts the game loop and collision checks.
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element to render the game.
     * @param {Keyboard} keyboard - The keyboard input manager.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkCollisionsCoins();
        this.checkCollisionsBottles();
        this.checkCollisionsBossChicken();
    }

    /** Binds the character to this world instance. */
    setWorld() {
        this.character.world = this;
    }

    /** Starts the core collision detection and game logic intervals. */
    run() {
        setInterval(() => {
            checkCollisions(world);
        }, 500);

        this.checkCollisionsThrowBottlesInterval = setInterval(() => {
            if (this.bottle.energyBottles > 0) {
                this.checkThrowObjects();
                this.bottlesBarRefresh();
            }
        }, 200);

        this.checkCollisionsEnemiesInterval = setInterval(() => {
            checkCollisionsEnemies(world);
        }, 20);
    }

    /** Checks if a throwable object should be created based on player input. */
    checkThrowObjects() {
        if (this.keyboard.D) {
            this.defineDirectionThrowableObject();
            let bottle = new ThrowableObject(this.character.x + 20, this.character.y + 100, this.throwDirection, this);
            this.throwableObjects.push(bottle);
        }
    }

    /**
     * Handles enemy behavior after being defeated.
     *
     * @param {Enemy} enemy - The enemy instance.
     * @param {Enemy[]} enemiePath - The enemy array from which the enemy will be removed.
     */
    deadChicken(enemy, enemiePath) {
        enemy.playDeadAnimation();
        soundManager.jumpOnChickenSound.play();
        this.enemyDespawned(enemy, enemiePath);
        this.character.speedY = 20;
    }

    /**
     * Removes the defeated enemy from the game after a short delay.
     *
     * @param {Enemy} enemy - The enemy to remove.
     * @param {Enemy[]} enemiePath - The array containing the enemy.
     */
    enemyDespawned(enemy, enemiePath) {
        this.enemieArray = enemiePath;
        setTimeout(() => {
            let i = this.enemieArray.indexOf(enemy);
            if (i > -1) this.enemieArray.splice(i, 1);
        }, 250);
    }

    /** Checks for collisions between throwable objects and the boss enemy. */
    checkCollisionsBossChicken() {
        this.checkCollisionsBossChickenInterval = setInterval(() => {
            this.throwableObjects.forEach((bottle) => {
                if (this.level.endboss.isColliding(bottle)) {
                    this.throwableObjects = [];
                    this.level.endboss.hit(1);
                    bottle.colliding = true;
                }
            });
        }, 400);
    }

    /** Checks for coin collisions and updates the coin bar. */
    checkCollisionsCoins() {
        this.checkCollisionsCoinsInterval = setInterval(() => {
            this.level.coins.forEach((coin) => {
                if (this.character.isCollidingCoin(coin)) {
                    this.coin.hitCoins();
                    this.coinsBar.setPercentage(this.coin.energyCoins);
                    let index = this.level.coins.findIndex(c => c === coin);
                    this.level.coins.splice(index, 1);
                    soundManager.coinSound.play();
                }
            });
        }, 20);
    }

    /** Updates the bottles bar UI after throwing. */
    bottlesBarRefresh() {
        if (this.keyboard.D) {
            this.bottle.throwCollectedBottles();
            this.bottlesBar.setPercentage(this.bottle.energyBottles);
        }
    }

    /** Checks for collisions with collectible bottles and updates the bottles bar. */
    checkCollisionsBottles() {
        this.checkCollisionsBottlesInterval = setInterval(() => {
            this.level.bottles.forEach((bottle) => {
                if (this.character.isCollidingBottles(bottle)) {
                    this.bottle.hitBottles();
                    this.bottlesBar.setPercentage(this.bottle.energyBottles);
                    let index = this.level.bottles.findIndex(b => b === bottle);
                    this.level.bottles.splice(index, 1);
                }
            });
        }, 20);
    }

    /** Main draw loop to render the game world continuously. */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.drawEnemiesAndObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusBars();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addToMap(this.level.endboss);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /** Draws enemies and collectible objects. */
    drawEnemiesAndObjects() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.smallEnemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
    }

    /** Draws all status bars (health, coins, bottles). */
    drawStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bottlesBar);
    }

    /**
     * Adds a list of objects to the canvas rendering.
     * 
     * @param {Object[]} objects - Array of drawable game objects.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the canvas with direction handling.
     * 
     * @param {Object} mo - The object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        /*        mo.drawFrame(this.ctx);
                 mo.drawFrameOffsetCharacter(this.ctx);
                mo.drawFrameOffsetChicken(this.ctx);
                mo.drawFrameOffsetCoins(this.ctx);
                mo.drawFrameOffsetBottles(this.ctx); */
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally for mirrored rendering.
     * 
     * @param {Object} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores image orientation after flipping.
     * 
     * @param {Object} mo - The object to unflip.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /** Determines the direction the character is facing for bottle throwing. */
    defineDirectionThrowableObject() {
        this.throwDirection = this.character.otherDirection;
    }
}
