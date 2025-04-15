/**
 * Class representing a character in the game.
 * Inherits from {@link MovableObject}.
 *
 * This class handles the character's movements, animations, and interactions with the game world,
 * including walking, jumping, idle states, and death animations.
 *
 * @class
 * @extends MovableObject
 */
class Character extends MovableObject {
    
    /**
     * The x-coordinate position of the character.
     * @type {number}
     * @default 120
     */
    x = 120;

    /**
     * The y-coordinate position of the character.
     * @type {number}
     * @default 160
     */
    y = 160;

    /**
     * The height of the character.
     * @type {number}
     * @default 270
     */
    height = 270;

    /**
     * The width of the character.
     * @type {number}
     * @default 110
     */
    width = 110;

    /**
     * The character's movement speed.
     * @type {number}
     * @default 6
     */
    speed = 6;

    /**
     * The speed at which the character moves upward when dead.
     * @type {number}
     * @default 30
     */
    deadAnimationSpeedY = 30;

    /**
     * The interval for character animations.
     * @type {number}
     */
    animationInterval;

    /**
     * Reference to the game world the character is in.
     * @type {Object}
     */
    world;

    /**
     * The offset values for the character's collision box.
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} bottom - The bottom offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     */
    offsetCharacter = {
        top: 90,
        bottom: 90,
        left: 10,
        right: 20
    };

    /**
     * Counter for idle time.
     * @type {number}
     * @default 0
     */
    idleCounter = 0;

    /**
     * The time of the last move.
     * @type {number}
     */
    lastMoveTime = 0;

    /**
     * The vertical speed when the character is dead.
     * @type {number}
     * @default 30
     */
    deadSpeedY = 30;

    /**
     * Array of image paths for the character's walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Array of image paths for the character's jumping animation.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    /**
     * Array of image paths for the character's dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Array of image paths for the character's hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Array of image paths for the character's idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /**
     * Array of image paths for the character's long idle animation.
     * @type {string[]}
     */
    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * Creates an instance of the character.
     * Initializes the character's images and starts the animation loop.
     *
     * @constructor
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.applyGravity();
        this.animate();
    }

    /**
     * Starts the animation for the character's movements and state transitions.
     * 
     * @method
     */
    animate() {
        this.characterMoveAnimation();
        this.playCharacterAnimations();
    }

    /**
     * Handles the character's movement, including walking, jumping, and moving in both directions.
     * 
     * @method
     */
    characterMoveAnimation() {
        this.characterMoveRight();

        setInterval(() => {
            this.characterMoveLeft();
            this.characterJump();
        }, 1000 / 60);
    }

    /**
     * Handles the character's movement to the right.
     * 
     * @method
     */
    characterMoveRight() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.lastMoveTime = new Date().getTime();
            }
        }, 1000 / 60);
    }

    /**
     * Handles the character's movement to the left.
     * 
     * @method
     */
    characterMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.lastMoveTime = new Date().getTime();
        }
    }

    /**
     * Makes the character jump.
     * Plays the jump sound and updates the camera.
     * 
     * @method
     */
    characterJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) { // ! means "not"
            this.jump();
            soundManager.jumpSound.play();
            this.lastMoveTime = new Date().getTime();
        }
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Plays the appropriate animation for the character based on its state.
     * Handles idle, walking, jumping, and hurt/dead animations.
     * 
     * @method
     */
    playCharacterAnimations() {
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playCharacterDeadAnimation();
            } else if (this.isHurt(1)) {
                this.playAnimation(this.IMAGES_HURT);
                soundManager.hurtSound.play();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                } else {
                    this.playCharacterIdleAnimation();
                }
            }
        }, 100);
    }

    /**
     * Plays the character's dead animation and triggers the game over screen.
     * 
     * @method
     */
    playCharacterDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            let gameoverScreen = document.getElementById('gameover-screen');
            document.getElementById('menuButtonGame').classList.add('d-none');
            gameoverScreen.classList.remove('d-none');
            pauseGame();
        }, 1500);
        this.y -= this.deadSpeedY;
        this.deadSpeedY -= this.acceleration + 4;
    }

    /**
     * Plays the character's idle animation.
     * Switches between normal idle and long idle based on the time elapsed.
     * 
     * @method
     */
    playCharacterIdleAnimation() {
        let actuelTime = new Date().getTime(); // Time elapsed since Jan 1, 1970
        if (actuelTime - this.lastMoveTime > 5000) {
            this.playAnimation(this.IMAGES_LONGIDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Makes the character jump by adjusting its vertical speed.
     * 
     * @method
     */
    jump() {
        this.speedY = 30;
    }
}
