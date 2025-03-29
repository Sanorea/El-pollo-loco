class Chicken extends MovableObject {

    height = 70;
    width = 60;
    speed = 0.15;
    moveI;
    walkI;
    deadI;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    offsetChicken = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 200 + Math.random() * 2000; // zufällige Anordnung der Anfangsposition der Hünchen
        this.y = 355;
        this.speed = 0.15 + Math.random() * 1.5;
        this.animate();

    }

    animate() {
        this.moveI = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        

        this.walkI = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    };

    playDeadAnimation() {

        
        clearInterval(this.moveI);
        clearInterval(this.walkI);
        this.currentImage = 0;
        this.deadI = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 20);
    };


}