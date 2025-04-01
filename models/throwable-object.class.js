class ThrowableObject extends MovableObject {
    constructor(x, y, throwDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.throwDirection = throwDirection;
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.energyBottle;
        this.throw();
        this.intervalIdSpeed;
    };

    //passt den Standort der Flasche gemäss Intervall an
    throw() {
        world.throwSound.play();
        if (this.throwDirection) {
            this.speedY = 30;
            this.applyGravity();
            this.intervalIdSpeed = setInterval(() => {
                this.x -= 10;
            }, 25);
        } else {
            this.speedY = 30; 
            this.applyGravity();
            this.intervalIdSpeed = setInterval(() => {
                this.x += 10;
            }, 25);
        }
    };
}