class Chicken extends MovableObject {
 
height = 70;
width = 60;
speed = 0.15;
IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
];
offsetChicken = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
}

constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

    this.x = 200 + Math.random() * 500; // zufällige Anordnung der Anfangsposition der Hünchen
    this.y = 355;

    this.loadImages(this.IMAGES_WALKING);

    this.speed = 0.15 + Math.random() * 1.5;
    this.animate();
}


animate() {

    setInterval(() => {
        this.moveLeft();
    }, 1000/60); 

    setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
    }, 200);

    this.moveLeft(); 

};
   
}