class Cloud extends MovableObject {

    y = 20;
    width = 500;
    height = 250;

    IMAGES_CLOUDS = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.loadImages(this.IMAGES_CLOUDS);
    
        this.x = Math.random() * 500; // zufällige Anordnung der Anfangsposition der Wolken
        this.animate();
        console.log('y :>> ', this.y);
    }

    animate() {
        this.moveLeft(); 
    }



}