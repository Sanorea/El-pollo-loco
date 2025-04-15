/**
 * Class representing a small chicken enemy in the game.
 * Extends the MovableObject class and includes animations and movement for small chickens.
 *
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {

    /**
     * The height of the small chicken.
     * @type {number}
     */
    height = 50;

    /**
     * The width of the small chicken.
     * @type {number}
     */
    width = 50;

    /**
     * The movement speed of the small chicken.
     * @type {number}
     */
    speed = 0.2;

    /**
     * Interval ID for movement animation.
     * @type {number}
     */
    moveI;

    /**
     * Interval ID for walking animation.
     * @type {number}
     */
    walkI;

    /**
     * Interval ID for death animation.
     * @type {number}
     */
    deadI;

    /**
     * Array of image paths used for walking animation.
     * @type {Array<string>}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Array of image paths used for the dead animation.
     * @type {Array<string>}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates an instance of SmallChicken.
     * Initializes the image, loads animations, sets random start position and speed, and starts animation.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 2000; // Random starting position
        this.y = 375;
        this.speed = 0.15 + Math.random() * 1.5;
        this.animate();
    }

    /**
     * Starts movement and walking animation for the small chicken.
     * The chicken moves to the left and cycles through the walking images.
     */
    animate() {
        this.moveI = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.walkI = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    /**
     * Plays the dead animation by stopping other animations and displaying the dead image.
     * This method is called when the small chicken is defeated.
     */
    playDeadAnimation() {
        clearInterval(this.moveI);
        clearInterval(this.walkI);
        this.currentImage = 0;
        this.deadI = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 20);
    }
}
