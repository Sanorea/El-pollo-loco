class MovableObject extends DrawableObject {

    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    world;
    intervalIds = [];
    intervalIdGravity;

    applyGravity() {

        
        this.intervalIdGravity = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // wenn es eine Instanz von ThrowableObject ist
            return true;
        } else {
            return this.y < 151;
        }

    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6; 0, Rest 0 oder i = 1 % 5, Rest 1.... also 0, 1, 2, 3, 4, 5, 0, 1...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationBossChicken(images) {
        for (let i = 0; i < images.length; i++) {
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    isCollidingCoin(mo) {
        return this.x + this.width - this.offsetCharacter.right > mo.x + mo.offsetCoins.left && // Charakter rechts, Münze links
            this.y + this.height - this.offsetCharacter.bottom > mo.y + mo.offsetCoins.top && // Charakter Füsse, Münze oben
            this.x + this.offsetCharacter.left < mo.x + mo.width - mo.offsetCoins.right && // Charakter links, Münze rechts
            this.y + this.offsetCharacter.top < mo.y + mo.height - mo.offsetCoins.bottom; // Charakter Kopf, Münze unten
    }

    isCollidingBottles(mo) {
        return this.x + this.width > mo.x && // Charakter rechts, Münze links
            this.y + this.height > mo.y && // Charakter Füsse, Münze oben
            this.x < mo.x + mo.width && // Charakter links, Münze rechts
            this.y < mo.y + mo.height; // Charakter Kopf, Münze unten
    }

    hit(remove) {
        this.energy -= remove;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); //vergangene Zeit seid 1.1.1970
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt(time) {
        let timepassed = new Date().getTime() - this.lastHit; // Difference Anzeige zu Hit-Zeitpunkt in ms
        timepassed = timepassed / 1000; // in Sekunden
        return timepassed < time; // wenn timepassed < 1 gibt Funktion true aus

    }
}