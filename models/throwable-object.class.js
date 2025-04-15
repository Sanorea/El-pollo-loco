/**
 * Represents a throwable object (e.g., salsa bottle) that can be thrown by the character.
 * Inherits from MovableObject and handles throw animation, movement, and collision.
 */
class ThrowableObject extends MovableObject {

    /**
     * Array of image paths used to animate the bottle while it's being thrown.
     * @type {string[]}
     */
    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Array of image paths used to animate the bottle splash on impact.
     * @type {string[]}
     */
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Indicates whether the bottle has collided with an enemy or object.
     * @type {boolean}
     */
    colliding = false;

    /**
     * Creates a throwable object at the given coordinates and direction.
     * Loads the necessary images and initiates the throw animation.
     * 
     * @param {number} x - Initial x-position of the object.
     * @param {number} y - Initial y-position of the object.
     * @param {boolean} throwDirection - Direction of the throw (true = left, false = right).
     */
    constructor(x, y, throwDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.throwDirection = throwDirection;
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.energyBottle;
        this.intervalIdSpeed;
        this.animate();
    };

    /**
     * Executes the throw action.
     * Applies gravity and horizontal movement depending on the throw direction.
     * Plays the throw sound.
     */
    throw() {
        soundManager.throwSound.play();
        this.speedY = 30;
        this.applyGravity();
        this.intervalIdSpeed = setInterval(() => {
            this.x += this.throwDirection ? -10 : 10;
        }, 25);
    };

    /**
     * Starts the throw animation by repeatedly cycling through the rotation images.
     * Also triggers the throwing motion.
     */
    animate() {
        this.throw();
        setInterval(() => {
            this.playAnimation(this.IMAGES_THROW);
        }, 100);
    };
}
