/**
 * Represents the health/status bar for the endboss.
 * Inherits from AllBars and displays the endboss's remaining energy.
 */
class EndbossBar extends AllBars {

    /**
     * Current percentage of the endboss's health.
     * Initialized to 100.
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates an instance of EndbossBar.
     * Initializes the bar with a default percentage.
     */
    constructor() {
        super();
        this.setPercentage(3);
    }

    /**
     * Sets the current health percentage of the endboss
     * and updates the corresponding image from the bottle images.
     * 
     * @param {number} percentage - A value from 0 to 100 representing endboss health.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current health percentage.
     * This index is used to pick an image representing the correct bar state.
     * 
     * @returns {number} Index of the image to use from IMAGES_BOTTLES.
     */
    resolveImageIndex() {
        if (this.percentage > 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
