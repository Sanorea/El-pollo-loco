class Chicken extends MovableObject {

    height = 70;
    width = 60;
    speed = 0.15;
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
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        this.x = 200 + Math.random() * 2000; // zufällige Anordnung der Anfangsposition der Hünchen
        this.y = 355;
        this.speed = 0.15 + Math.random() * 1.5;
        this.animate();
        //this.checkCollisionsJumpOnEnemies();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    };

    checkCollisionsJumpOnEnemies() {
        if (world.character.y + world.character.height <= this.y + 45) {
            console.log('true');
            world.level.enemies.forEach((enemy) => {
                let intervalIdDead = setInterval(() => {
                    if (world.character.isColliding(enemy && world.character.y + world.character.height <= this.y + 45)) {
                        console.log('tod');
                        this.playAnimation(this.IMAGES_DEAD);
                        clearInterval(intervalIdDead);
                    } else {
                        this.playAnimation(this.IMAGES_WALKING);
                        console.log('lebt');
                    }
                }, 200);
            });
        }
        console.log('false');

    }

}