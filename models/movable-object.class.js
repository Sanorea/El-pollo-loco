/**
 * Class representing a movable object in the game.
 * The class extends from `DrawableObject` and includes properties and methods to handle movement, gravity, collisions, and animations for objects that can move in the game world.
 *
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {

    /**
     * Indicates if the object is moving in the opposite direction.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * The vertical speed of the object.
     * @type {number}
     */
    speedY = 0;

    /**
     * The acceleration applied to the object when gravity is applied.
     * @type {number}
     */
    acceleration = 2.5;

    /**
     * The energy (health) of the object.
     * @type {number}
     * @default 100
     */
    energy = 100;

    /**
     * The timestamp of the last hit taken by the object.
     * @type {number}
     */
    lastHit = 0;

    /**
     * The world the object belongs to.
     * @type {Object}
     */
    world;

    /**
     * The interval ID for gravity updates.
     * @type {number}
     */
    intervalIdGravity;

    /**
     * Applies gravity to the object by changing its vertical position and speed.
     * This method is called at regular intervals to simulate falling.
     *
     * @memberof MovableObject
     */
    applyGravity() {
        this.intervalIdGravity = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Determines if the object is above the ground.
     * This method checks if the object is on the ground or if it's an instance of `ThrowableObject`.
     *
     * @returns {boolean} `true` if the object is above ground, `false` otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 151;
        }
    }

    /**
     * Plays an animation by changing the image of the object.
     * The images cycle through in a loop.
     *
     * @param {Array<string>} images - The array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays an animation for the Boss Chicken with specific handling for the last frame.
     *
     * @param {Array<string>} images - The array of image paths for the Boss Chicken animation.
     */
    playAnimationBossChicken(images) {
        let i = this.currentImage % images.length;
        if (i == images.length - 1) {
            let path = images[i];
            this.img = this.imageCache[path];
        } else {
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by applying a vertical speed.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Checks if the object is colliding with another object.
     * The collision is checked based on their positions and sizes.
     *
     * @param {MovableObject} mo - The other object to check for a collision.
     * @returns {boolean} `true` if the objects are colliding, `false` otherwise.
     */
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    /**
     * Checks if the object is colliding with a coin.
     * The collision is checked based on the position and size of both the object and the coin.
     *
     * @param {MovableObject} mo - The coin to check for a collision.
     * @returns {boolean} `true` if the objects are colliding, `false` otherwise.
     */
    isCollidingCoin(mo) {
        return this.x + this.width - this.offsetCharacter.right > mo.x + mo.offsetCoins.left &&
            this.y + this.height - this.offsetCharacter.bottom > mo.y + mo.offsetCoins.top &&
            this.x + this.offsetCharacter.left < mo.x + mo.width - mo.offsetCoins.right &&
            this.y + this.offsetCharacter.top < mo.y + mo.height - mo.offsetCoins.bottom;
    }

    /**
     * Checks if the object is colliding with a bottle.
     * The collision is checked based on the position and size of both the object and the bottle.
     *
     * @param {MovableObject} mo - The bottle to check for a collision.
     * @returns {boolean} `true` if the objects are colliding, `false` otherwise.
     */
    isCollidingBottles(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    /**
     * Reduces the object's energy by a specified amount when it is hit.
     * If the energy becomes less than 0, it is set to 0.
     *
     * @param {number} remove - The amount of energy to remove.
     */
    hit(remove) {
        this.energy -= remove;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is dead by checking if its energy is 0.
     *
     * @returns {boolean} `true` if the object's energy is 0, `false` otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the object has been hurt within a given time frame.
     * This method compares the current time with the time of the last hit.
     *
     * @param {number} time - The time frame in seconds to check for recent damage.
     * @returns {boolean} `true` if the object has been hurt within the time frame, `false` otherwise.
     */
    isHurt(time) {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < time;
    }
}
