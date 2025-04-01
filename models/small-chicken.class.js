class SmallChicken extends MovableObject {
 
height = 50;
width = 50;
speed = 0.2;
moveI;
walkI;
deadI;
IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
];

IMAGES_DEAD = [
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
];

constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 400 + Math.random() * 2000; // zufällige Anordnung der Anfangsposition der Hünchen
    this.y = 375;
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