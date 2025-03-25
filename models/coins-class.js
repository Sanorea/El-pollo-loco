class Coins extends MovableObject {
height = 100;
width = 100;
IMAGES_COIN = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
];

energyCoins = 0;
energyBottles = 0;

offsetCoins = {
    top: 30,
    bottom: 60,
    left: 30,
    right: 60
}

constructor() {
    super().loadImage('img/8_coin/coin_1.png');
    this.x = 300 + Math.random() * 500*3; // zufällige Anordnung der Anfangsposition der Münzen
    this.y = 50 + Math.random() * 100*2;
    this.loadImages(this.IMAGES_COIN);

}

hitCoins() {
    this.energyCoins += 21;  
}
}