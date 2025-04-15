/**
 * Represents the status bar that displays the number of collected bottles.
 * Inherits from the AllBars class, and updates its image based on the percentage of collected bottles.
 */
class BottlesBar extends AllBars {

    /**
     * Array of image paths representing different fill levels of the bottle bar.
     * @type {string[]}
     */
    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    /**
     * Current percentage of bottles collected (0–100).
     * @type {number}
     */
    percentage = 0;

    /**
     * Creates an instance of BottlesBar, initializes images and sets default position and percentage.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.setPercentage(0);
        this.y = 90;
    }

    /**
     * Sets the current percentage of collected bottles and updates the corresponding image.
     * @param {number} percentage - A value between 0 and 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on the current percentage.
     * @returns {number} The index of the image to display from IMAGES_BOTTLES.
     */
    resolveImageIndex() {
        if (this.percentage > 100) {
            return 5;
        } else if (this.percentage > 80){
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
