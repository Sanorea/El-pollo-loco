class World {
    character = new Character();
    coin = new Coins();
    bottle = new Bottles();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinsBar = new CoinsBar();
    bottlesBar = new BottlesBar();
    throwableObjects = [];
    endboss = new Endboss();
    test = new ThrowableObject();




    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkCollisionsCoins();
        this.checkCollisionsBottles();
        this.checkCollisionsBossChicken();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            if (this.bottle.energyBottles > 0) {
                this.checkThrowObjects();
                this.bottlesBarRefresh();
            }

        }, 200);
    }


    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.checkCollisionsBossChicken()
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit(5);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
        this.level.endboss.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit(5);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionsBossChicken() {
        let removeBottleFromList = [];

        this.throwableObjects.forEach((bottle, bottleIndex) => {
            if (this.endboss.isColliding(bottle)) {

                this.endboss.hit(1);
                //console.log('energy :>> ', this.endboss.energy);
                //console.log('movableObject :>> ', this.test);
                //this.throwableObjects = [];
                removeBottleFromList.push(bottleIndex);
                clearInterval(this.intervalIdSpeed);
                clearInterval(this.intervalIdGravity);
                //console.log('bottle :>> ', bottle.throw());
                //console.log('bottle :>> ', bottle.y);

            }
        });
        removeBottleFromList.forEach((bottleIndex) => {
            this.throwableObjects.splice(bottleIndex)
        });

    }

    checkCollisionsCoins() {
        setInterval(() => {
            this.level.coins.forEach((coin) => {
                if (this.character.isCollidingCoin(coin)) {
                    this.coin.hitCoins();
                    this.coinsBar.setPercentage(this.coin.energyCoins);
                    let index = this.level.coins.findIndex(c => c === coin);
                    this.level.coins.splice(index, 1);
                }
            });
        }, 20);

    }

    bottlesBarRefresh() {
        if (this.keyboard.D) {
            this.bottle.throwCollectedBottles();
            this.bottlesBar.setPercentage(this.bottle.energyBottles);
        }
    }


    checkCollisionsBottles() {
        setInterval(() => {
            this.level.bottles.forEach((bottle) => {
                if (this.character.isCollidingBottles(bottle)) {
                    this.bottle.hitBottles();
                    this.bottlesBar.setPercentage(this.bottle.energyBottles);
                    let index = this.level.bottles.findIndex(b => b === bottle);
                    this.level.bottles.splice(index, 1);
                }
            });
        }, 20);

    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //löscht frühere Standorte der Elemente bei jedem neuen zeichnen
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);//Zeichnet Hintergrund
        this.addObjectsToMap(this.level.clouds); //Zeichnet Wolken  
        this.addObjectsToMap(this.level.enemies); //Zeichnet Hünchen
        this.addObjectsToMap(this.level.coins); //Zeichnet Münzen
        this.addObjectsToMap(this.throwableObjects); // Zeichne Salsa-Flasche in der Luft
        this.addObjectsToMap(this.level.bottles); //Zeichne Salsa-Flasche am Boden     
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar); // Zeichnet Statusbar
        this.addToMap(this.coinsBar); // Zeichnet Statusbar für Münzen
        this.addToMap(this.bottlesBar); // Zeichnet Statusbar für Flaschen        
        this.ctx.translate(+this.camera_x, 0);

        this.addToMap(this.character); //Zeichnet Charakter
        this.addToMap(this.endboss);


        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawFrameOffsetCharacter(this.ctx);
        //mo.drawFrameOffsetChicken(this.ctx);
        //mo.drawFrameOffsetCoins(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);  // damit wird Canvas nach rechts geschoben, damit der Charakter keinen SPung um die Canvasbreite macht.
        this.ctx.scale(-1, 1);// spiegelt Element
        mo.x = mo.x * -1; // Spiegelt Achse
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /*     removeObjectsFromMap(objects) {
        objects.forEach(o => {
            this.removeFromMap(o);
        });
    }

    removeFromMap(mo) {
        if (checkCollisionsCoins()) {
            mo.remove(this.ctx);
        }
    } */
}




