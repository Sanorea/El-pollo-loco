/**
 * Class representing a group of status bars or UI elements in the game.
 * Inherits from {@link DrawableObject}.
 *
 * Typically used to display health, energy, or other game stats.
 *
 * @class
 * @extends DrawableObject
 */
class AllBars extends DrawableObject {

    /**
     * Creates an instance of AllBars.
     * Initializes the position and size of the bar container.
     */
    constructor() {
        super();

        /**
         * The horizontal position of the bar on the canvas.
         * @type {number}
         */
        this.x = 40;

        /**
         * The width of the bar.
         * @type {number}
         */
        this.width = 200;

        /**
         * The height of the bar.
         * @type {number}
         */
        this.height = 50;
    }
}
