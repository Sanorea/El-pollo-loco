/**
 * Represents the status bar that displays the number of collected coins.
 * Inherits from the AllBars class and updates its image based on the percentage of coins collected.
 */
class CoinsBar extends AllBars {

    /**
     * Array of image paths representing different fill levels of the coin bar.
     * @type {string[]}
     */
    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * Current percentage of coins collected (0–100).
     * @type {number}
     */
    percentage = 0;

    /**
     * Creates an instance of CoinsBar, initializes images, and sets default position and percentage.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.setPercentage(0);
        this.y = 50;
    }

    /**
     * Sets the current percentage of collected coins and updates the corresponding image.
     * @param {number} percentage - A value between 0 and 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on the current percentage.
     * @returns {number} The index of the image to display from IMAGES_COINS.
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
