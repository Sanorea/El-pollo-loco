/**
 * Class representing a background object in the game.
 * Inherits from {@link MovableObject}.
 *
 * Typically used for elements like scrolling backgrounds, platforms, or static environmental objects.
 *
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {

    /**
     * The width of the background object.
     * @type {number}
     * @default 720
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     * @default 480
     */
    height = 480;

    /**
     * Creates an instance of a background object.
     * Loads the image for the background object and sets its position.
     *
     * @param {string} imagePath - The path to the image used for the background object.
     * @param {number} x - The x-coordinate position of the background object on the canvas.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);

        /**
         * The x-coordinate position of the background object.
         * @type {number}
         */
        this.x = x;

        /**
         * The y-coordinate position of the background object, based on the height.
         * @type {number}
         */
        this.y = 480 - this.height;
    }
}
