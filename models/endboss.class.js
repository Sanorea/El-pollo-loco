class Endboss extends MovableObject {

    height = 410;
    width = 400;
    energy = 3;
    bossAnimationInterval;
    bossAnimationTimeout;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = 2700;
        this.y = 40;
        this.animateBossChicken();
    }

    animateBossChicken() {
        this.bossAnimationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimationBossChicken(this.IMAGES_DEAD);
                //clearIntervals();
                this.bossAnimationTimeout = setTimeout(() => {
                    document.getElementById('winScreen').classList.remove('d-none');
                    document.getElementById('menuButtonGame').classList.add('d-none');
                    clearAllIntervals();
                }, 1000);

            } else if (this.isHurt(2)) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
            , 200);
    };

}