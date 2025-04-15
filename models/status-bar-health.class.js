/**
 * Represents the health status bar for the main character.
 * Inherits from AllBars and displays the character's current health level.
 */
class StatusBar extends AllBars {

    /**
     * Array of image paths representing different health levels.
     * @type {string[]}
     */
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * Current health percentage (0 to 100).
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates an instance of the StatusBar.
     * Loads health images, sets initial percentage, and positions the bar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.setPercentage(100);
        this.y = 10;
    }

    /**
     * Updates the current health percentage and refreshes the displayed image accordingly.
     * 
     * @param {number} percentage - A value between 0 and 100 representing health level.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the appropriate image index based on the current health percentage.
     * 
     * @returns {number} Index of the corresponding health image.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
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
