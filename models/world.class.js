class World {
    character = new Character();
    throwableObject;
    coin = new Coins();
    bottle = new Bottles();
    test = 'test';
    level = createLevel();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinsBar = new CoinsBar();
    bottlesBar = new BottlesBar();
    throwableObjects = [];
    endboss = new Endboss();
    throwDirection = false;
    checkCollisionsThrowBottlesInterval;
    checkCollisionsEnemiesInterval;
    checkCollisionsBossChickenInterval;
    checkCollisionsCoinsInterval;
    checkCollisionsBottlesInterval;
    audioMuted;
    soundManager;

/*     musicMuted = false;
    backgroundSound; */


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;    
        this.keyboard = keyboard;
        this.audioMuted = false;
        this.draw();
        this.setWorld();
        this.run();
        this.checkCollisionsCoins();
        this.checkCollisionsBottles();
        this.checkCollisionsBossChicken();
        this.initAudioData();

    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            checkCollisions(world);
        }, 500);
        this.checkCollisionsThrowBottlesInterval = setInterval(() => {

            if (this.bottle.energyBottles > 0) {
                this.checkThrowObjects();
                this.bottlesBarRefresh();
            }
        }, 200);
        this.checkCollisionsEnemiesInterval = setInterval(() => {
            checkCollisionsEnemies(world);
        }, 20);
    }



    checkThrowObjects() {
        if (this.keyboard.D) {
            this.defineDirectionThrowableObject();
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.throwDirection, this);
            this.throwableObjects.push(bottle);
        }
    }

    deadChicken(enemy, enemiePath) {
        enemy.playDeadAnimation();
        this.jumpOnChickenSound.play();
        this.enemyDespawned (enemy, enemiePath);
        this.character.speedY = 20; // jump when collide with enemy
    }

    enemyDespawned(enemy, enemiePath) {
        this.enemieArray = enemiePath;
        setTimeout(() => {
          let i = this.enemieArray.indexOf(enemy);
          if (i > -1) this.enemieArray.splice(i, 1);
        }, 250);
    }


    checkCollisionsBossChicken() {
        this.checkCollisionsBossChickenInterval = setInterval(() => {
            this.throwableObjects.forEach((bottle) => {
                if (this.endboss.isColliding(bottle)) {
                    this.throwableObjects = [];
                    this.endboss.hit(1);
                }
            });
        }, 400);
    }



    checkCollisionsCoins() {
        this.checkCollisionsCoinsInterval = setInterval(() => {
            this.level.coins.forEach((coin) => {
                if (this.character.isCollidingCoin(coin)) {
                    this.coin.hitCoins();
                    this.coinsBar.setPercentage(this.coin.energyCoins);
                    let index = this.level.coins.findIndex(c => c === coin);
                    this.level.coins.splice(index, 1);
                    world.coinSound.play();
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
        this.checkCollisionsBottlesInterval = setInterval(() => {
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

    initAudioData() {
        this.jumpSound = audioGenerator('audio/jump.mp3');
        this.hurtSound = audioGenerator('audio/hurt.mp3');
        this.coinSound = audioGenerator('audio/collect-coins.mp3');
        this.splashSound = audioGenerator('audio/splash.mp3');
        this.jumpOnChickenSound = audioGenerator('audio/collision.mp3');
        this.throwSound = audioGenerator('audio/throw.mp3');
        this.collectBottleSound = audioGenerator('audio/collect-bottle.mp3');
        this.winSound = audioGenerator('audio/win-sound.mp3');
        this.loseSound = audioGenerator('audio/lose-sound.mp3');
        this.snoreSound = audioGenerator('audio/snore.mp3');
    };
    


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //löscht frühere Standorte der Elemente bei jedem neuen zeichnen
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);//Zeichnet Hintergrund
        this.addObjectsToMap(this.level.clouds); //Zeichnet Wolken  
        this.addObjectsToMap(this.level.enemies); //Zeichnet Hünchen
        this.addObjectsToMap(this.level.smallEnemies); //Zeichnet kleine Hünchen        
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
        //mo.drawFrame(this.ctx);
        //mo.drawFrameOffsetCharacter(this.ctx);
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

    defineDirectionThrowableObject() {
        this.throwDirection = this.character.otherDirection;
    }
     
}




