/**
 * Class representing a bottle in the game.
 * Inherits from {@link MovableObject}.
 *
 * This class handles the functionality related to collectible bottles in the game, including their movement and interaction with the character.
 * The bottles can be hit to collect energy or thrown when collected.
 *
 * @class
 * @extends MovableObject
 */
class Bottles extends MovableObject {

    /**
     * The x-coordinate position of the bottle.
     * @type {number}
     * @default 300
     */
    x = 300;

    /**
     * The y-coordinate position of the bottle.
     * @type {number}
     * @default 340
     */
    y = 340;

    /**
     * The height of the bottle.
     * @type {number}
     * @default 90
     */
    height = 90;

    /**
     * The width of the bottle.
     * @type {number}
     * @default 70
     */
    width = 70;

    /**
     * The energy value of the bottle.
     * @type {number}
     * @default 0
     */
    energyBottles = 0;

    /**
     * The offset values for the bottle’s collision box.
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} bottom - The bottom offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     */
    offsetBottles = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * Array of image paths for the bottle in different states.
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Creates an instance of a bottle.
     * The bottle is placed at a random x-coordinate and initialized with an image.
     *
     * @constructor
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 300 + Math.random() * 500 * 3; // Random placement of bottles along the x-axis
        this.loadImages(this.IMAGES_BOTTLE);
    }

    /**
     * Reduces the energy value of the bottle when it is thrown.
     * Decreases the energy of the bottle by 21.
     *
     * @method
     */
    throwCollectedBottles() {
        this.energyBottles -= 21;
    }

    /**
     * Increases the energy value of the bottle when it is collected.
     * Plays the sound effect for collecting a bottle.
     *
     * @method
     */
    hitBottles() {
        this.energyBottles += 21;
        soundManager.collectBottleSound.play();
    }
}
