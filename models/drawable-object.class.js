/**
 * Class representing a drawable object.
 * This class handles the loading and drawing of images, as well as drawing frames for collision detection.
 * Other objects in the game can extend this class to inherit its image loading and drawing capabilities.
 *
 * @class
 */
class DrawableObject {

    /**
     * The image associated with the object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * A cache of images for quicker access.
     * @type {Object<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * The index of the current image being displayed.
     * @type {number}
     * @default 0
     */
    currentImage = 0;

    /**
     * Loads an image and sets it as the object's image.
     * 
     * @param {string} path - The file path of the image to load.
     * @method
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images and stores them in an image cache.
     * 
     * @param {string[]} arr - An array of image file paths to load.
     * @method
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;            
        });
    }

    /**
     * Draws the current image of the object on a given canvas context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw the image on.
     * @method
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a frame around the object to visualize its boundaries.
     * Only draws the frame for certain object types such as `Character`, `Chicken`, `Coins`, etc.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw the frame on.
     * @method
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coins || this instanceof Bottles || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();            
        }
    }

    /**
     * Draws a frame around the character object, adjusted with its specific offsets.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw the frame on.
     * @method
     */
    drawFrameOffsetCharacter(ctx) {
        if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offsetCharacter.left, this.y + this.offsetCharacter.top, this.width - this.offsetCharacter.right, this.height - this.offsetCharacter.bottom);
            ctx.stroke();            
        }
    } 

    /**
     * Draws a frame around the chicken object, adjusted with its specific offsets.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw the frame on.
     * @method
     */
    drawFrameOffsetChicken(ctx) {
        if (this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offsetChicken.left, this.y + this.offsetChicken.top, this.width - this.offsetChicken.right, this.height - this.offsetChicken.bottom);
            ctx.stroke();            
        }
    } 

    /**
     * Draws a frame around the coins object, adjusted with its specific offsets.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw the frame on.
     * @method
     */
    drawFrameOffsetCoins(ctx) {
        if (this instanceof Coins) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offsetCoins.left, this.y + this.offsetCoins.top, this.width - this.offsetCoins.right, this.height - this.offsetCoins.bottom);
            ctx.stroke();            
        }
    } 

     /**
     * Draws a frame around the bottles object, adjusted with its specific offsets.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw the frame on.
     * @method
     */
    drawFrameOffsetBottles(ctx) {
        if (this instanceof Bottles) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offsetBottles.left, this.y + this.offsetBottles.top, this.width - this.offsetBottles.right, this.height - this.offsetBottles.bottom);
            ctx.stroke();            
        }
    } 
}
