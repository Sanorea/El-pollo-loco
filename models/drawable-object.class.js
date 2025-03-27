class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;            
        });
    }


    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

/*         draw(ctx){
            if (this.img && this.img.complete) {  // Prüft, ob das Bild existiert und geladen ist
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            } else {
                console.warn('Bild noch nicht geladen:', this.img);
            }
        } */
        


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken ||/*  this instanceof SmallChicken || */ this instanceof Coins || this instanceof Bottles || this instanceof Endboss) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();            
        }
    }


    drawFrameOffsetCharacter(ctx) {
        if (this instanceof Character) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + this.offsetCharacter.left, this.y + this.offsetCharacter.top, this.width- this.offsetCharacter.right, this.height- this.offsetCharacter.bottom);
        ctx.stroke();            
        }
    } 


    drawFrameOffsetChicken(ctx) {
        if (this instanceof Chicken) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + this.offsetChicken.left, this.y + this.offsetChicken.top, this.width- this.offsetChicken.right, this.height- this.offsetChicken.bottom);
        ctx.stroke();            
        }
    } 


    drawFrameOffsetCoins(ctx) {
        if (this instanceof Coins) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + this.offsetCoins.left, this.y + this.offsetCoins.top, this.width- this.offsetCoins.right, this.height- this.offsetCoins.bottom);
        ctx.stroke();            
        }
    } 
}