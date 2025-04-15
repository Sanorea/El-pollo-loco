/**
 * Class representing a chicken enemy in the game.
 * Inherits from {@link MovableObject}.
 *
 * This class controls the movement, animation, and behavior of a chicken in the game, 
 * including its walking and dead animations.
 *
 * @class
 * @extends MovableObject
 */
class Chicken extends MovableObject {

    /**
     * The height of the chicken.
     * @type {number}
     * @default 70
     */
    height = 70;

    /**
     * The width of the chicken.
     * @type {number}
     * @default 60
     */
    width = 60;

    /**
     * The speed of the chicken's movement.
     * @type {number}
     * @default 0.15
     */
    speed = 0.15;

    /**
     * Interval for the chicken's movement.
     * @type {number}
     */
    moveI;

    /**
     * Interval for the chicken's walking animation.
     * @type {number}
     */
    walkI;

    /**
     * Interval for the chicken's dead animation.
     * @type {number}
     */
    deadI;

    /**
     * Array of image paths for the chicken's walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Array of image paths for the chicken's dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * The offset values for the chicken's collision box.
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} bottom - The bottom offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     */
    offsetChicken = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    /**
     * Creates an instance of the chicken.
     * Initializes the chicken's image and movement properties.
     * The chicken's initial position is randomized.
     *
     * @constructor
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 2000; // Randomize the starting position of the chicken
        this.y = 355;
        this.speed = 0.15 + Math.random() * 1.5; // Randomize the chicken's speed
        this.animate();
    }

    /**
     * Starts the chicken's movement and walking animation.
     * The chicken will continuously move left and play the walking animation.
     *
     * @method
     */
    animate() {
        // Set interval for movement to the left
        this.moveI = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        // Set interval for playing the walking animation
        this.walkI = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    /**
     * Plays the dead animation for the chicken.
     * Stops the walking and movement animations and starts the dead animation.
     *
     * @method
     */
    playDeadAnimation() {
        // Clear the movement and walking intervals
        clearInterval(this.moveI);
        clearInterval(this.walkI);
        this.currentImage = 0;
        
        // Set interval to play the dead animation
        this.deadI = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 20);
    }
}
