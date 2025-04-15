/**
 * Class representing a game level.
 * The level contains various game objects such as enemies, small enemies, clouds, coins, bottles, and background objects.
 * It also contains information about the endboss and the level's end position.
 *
 * @class
 */
class level {
    /**
 * The list of enemies in the level.
 * @type {Array}
 */
    /**
         * The list of small enemies in the level.
         * @type {Array}
         */
    smallEnemies;

    /**
     * The list of clouds in the level.
     * @type {Array}
     */
    clouds;

    /**
     * The list of coins in the level.
     * @type {Array}
     */
    coins;

    /**
     * The list of bottles in the level.
     * @type {Array}
     */
    bottles;

    /**
     * The list of background objects in the level.
     * @type {Array}
     */
    backgroundObjects;

    /**
     * The end position of the level along the x-axis.
     * @type {number}
     * @default 3200
     */
    level_end_x = 3200;

    /**
     * The endboss of the level.
     * @type {Object}
     */
    endboss;

    /**
     * Creates an instance of a level with all game objects initialized.
     *
     * @constructor
     * @param {Array} enemies - The list of enemies in the level.
     * @param {Array} smallEnemies - The list of small enemies in the level.
     * @param {Array} clouds - The list of clouds in the level.
     * @param {Array} coins - The list of coins in the level.
     * @param {Array} backgroundObjects - The list of background objects in the level.
     * @param {Array} bottles - The list of bottles in the level.
     * @param {Object} endboss - The endboss object of the level.
     */
    constructor(enemies, smallEnemies, clouds, coins, backgroundObjects, bottles, endboss) {
        this.enemies = enemies;
        this.smallEnemies = smallEnemies;
        this.clouds = clouds;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.endboss = endboss;
    }
}