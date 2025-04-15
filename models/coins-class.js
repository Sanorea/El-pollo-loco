/**
 * Class representing a coin object in the game.
 * Inherits from {@link MovableObject}.
 *
 * This class handles the behavior and animation of a coin object,
 * including randomizing its position and allowing the collection of coins for energy.
 *
 * @class
 * @extends MovableObject
 */
class Coins extends MovableObject {

    /**
     * The height of the coin.
     * @type {number}
     * @default 100
     */
    height = 100;

    /**
     * The width of the coin.
     * @type {number}
     * @default 100
     */
    width = 100;

    /**
     * Array of image paths for the coin animations.
     * @type {string[]}
     */
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * The energy value for collecting a coin.
     * @type {number}
     * @default 0
     */
    energyCoins = 0;

    /**
     * The energy value for collecting a bottle (not used in this class).
     * @type {number}
     * @default 0
     */
    energyBottles = 0;

    /**
     * The offset values for the coin (used for collision detection).
     * @type {Object}
     * @property {number} top - The top offset of the coin.
     * @property {number} bottom - The bottom offset of the coin.
     * @property {number} left - The left offset of the coin.
     * @property {number} right - The right offset of the coin.
     */
    offsetCoins = {
        top: 30,
        bottom: 60,
        left: 30,
        right: 60
    };

    /**
     * Creates an instance of the coin.
     * Initializes the coin's image and random horizontal and vertical positions.
     * Loads coin images for animation.
     *
     * @constructor
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 300 + Math.random() * 500 * 3; // Randomizes the starting horizontal position of the coin
        this.y = 50 + Math.random() * 100 * 2;  // Randomizes the starting vertical position of the coin
        this.loadImages(this.IMAGES_COIN);
    }

    /**
     * Increases the player's energy when the coin is collected.
     * Each coin collected adds 21 energy to the player's total.
     *
     * @method
     */
    hitCoins() {
        this.energyCoins += 21;  // Adds 21 energy when the coin is collected
    }
}
