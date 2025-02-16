class ThrowableObject extends MovableObject {


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.energyBottle;
        this.throw();
        this.intervalIdSpeed;
        //this.stopBottleCollisionBossChicken();
        //this.animateBossChicken();

    };


/*     stopBottleCollisionBossChicken() {
        console.log('klappt');
        
        this.throwableObjects.forEach((bottle) => { 
            if (this.endboss.isColliding(bottle)) { 
                clearInterval(intervalIdSpeed);
            }                
        });            
    } */

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.intervalIdSpeed = setInterval(() => {
            this.x += 10; 
            //console.log('intervalIdSpeed :>> ', this.x);
        }, 25);
        
        //stopBottleCollisionBossChicken();
        


    };

}