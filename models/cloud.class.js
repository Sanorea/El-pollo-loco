/**
 * Class representing a cloud object in the game.
 * Inherits from {@link MovableObject}.
 *
 * This class controls the movement and animation of a cloud object in the game, 
 * which moves horizontally to the left.
 *
 * @class
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    
    /**
     * The vertical position of the cloud.
     * @type {number}
     * @default 20
     */
    y = 20;

    /**
     * The width of the cloud.
     * @type {number}
     * @default 500
     */
    width = 500;

    /**
     * The height of the cloud.
     * @type {number}
     * @default 250
     */
    height = 250;

    /**
     * Array of image paths for the cloud animations.
     * @type {string[]}
     */
    IMAGES_CLOUDS = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];

    /**
     * Creates an instance of the cloud.
     * Initializes the cloud's image and random horizontal position.
     * Starts the animation of the cloud.
     *
     * @constructor
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.loadImages(this.IMAGES_CLOUDS);
        this.x = Math.random() * 500; // Randomizes the starting horizontal position of the cloud
        this.animate();
    }

    /**
     * Animates the cloud by moving it to the left.
     * The cloud moves continuously to the left across the screen.
     *
     * @method
     */
    animate() {
        this.moveLeft(); // Moves the cloud to the left
    }
}
