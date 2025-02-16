class Bottles extends CollectableObject {

x = 300;
y = 340;
height = 90;
width = 70;
IMAGES_BOTTLE = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
];
energyBottles = 0;
offsetBottles = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
}



constructor() {
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.x = 300 + Math.random() * 500*3; // zufällige Anordnung der Anfangsposition der Münzen
    this.loadImages(this.IMAGES_BOTTLE);
}


throwCollectedBottles() {
    this.energyBottles -= 21;
}


hitBottles() {
    this.energyBottles += 21;
}


}