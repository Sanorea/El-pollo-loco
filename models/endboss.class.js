/**
 * Class representing the Endboss character in the game.
 * The Endboss moves across the screen, can attack, and plays animations for various states such as walking, alert, hurt, and dead.
 * The Endboss has energy and interacts with the character.
 *
 * @class
 */
class Endboss extends MovableObject {

    /**
     * The height of the Endboss.
     * @type {number}
     * @default 410
     */
    height = 410;

    /**
     * The width of the Endboss.
     * @type {number}
     * @default 400
     */
    width = 400;

    /**
     * The energy of the Endboss.
     * @type {number}
     * @default 3
     */
    energy = 3;

    /**
     * Interval for the Endboss's animation.
     * @type {number}
     */
    bossAnimationInterval;

    /**
     * Timeout for the Endboss's dead animation.
     * @type {number}
     */
    bossAnimationTimeout;

    /**
     * The speed at which the Endboss moves.
     * @type {number}
     * @default 50
     */
    speed = 50;

    /**
     * A flag to indicate if the Endboss is facing the opposite direction.
     * @type {boolean}
     * @default false
     */
    otherDirection = false;

    /**
     * An array of image paths for the Endboss's walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * An array of image paths for the Endboss's alert animation.
     * @type {string[]}
     */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * An array of image paths for the Endboss's dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * An array of image paths for the Endboss's hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    /**
     * Creates an instance of the Endboss and initializes the position, animations, and other properties.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = 2700;
        this.y = 40;
        this.animateBossChicken();
    }

    /**
     * Starts the Endboss's animation, controlling its state (walking, hurt, dead).
     * This method periodically checks the Endboss's state and updates the animation accordingly.
     * 
     * @method
     */
    animateBossChicken() {
        this.bossAnimationInterval = setInterval(() => {
            if (this.isDead()) {
                this.deadBossChickenAnimation();
            } else if (this.isHurt(0.3)) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.bossChickenAttack();
            }
        }, 200);
    };

    /**
     * Plays the Endboss's dead animation and triggers the end of the game.
     * This method is called when the Endboss is defeated.
     * 
     * @method
     */
    deadBossChickenAnimation() {
        this.playAnimationBossChicken(this.IMAGES_DEAD);
        soundManager.winSound.play();
        this.bossAnimationTimeout = setTimeout(() => {
            document.getElementById('winScreen').classList.remove('d-none');
            document.getElementById('menuButtonGame').classList.add('d-none');
            pauseGame();
        }, 1000);
    }

    /**
     * Controls the movement and attack behavior of the Endboss based on the character's position.
     * The Endboss will move towards the character and attack if within a certain range.
     * 
     * @method
     */
    bossChickenAttack() {
        if (typeof world !== 'undefined') {
            if (world.character.x > world.level.endboss.x - 500 && world.character.x <= world.level.endboss.x) {
                this.x -= this.speed;
                this.playAnimation(this.IMAGES_WALKING);
                this.otherDirection = false;
            } else {
                if (world.character.x > world.level.endboss.x - 500) {
                    this.x += this.speed;
                    this.otherDirection = true;
                }
            }
        }
    };
}
