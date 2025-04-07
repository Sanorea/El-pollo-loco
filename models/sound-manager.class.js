class SoundManager {
    constructor(world) {
        this.world = world;
    }

    initSounds() {
        this.world.jumpSound = this.audioGenerator('jump.mp3');
        this.world.hurtSound = this.audioGenerator('hurt.mp3');
        this.world.coinSound = this.audioGenerator('collect-coins.mp3');
        this.world.splashSound = this.audioGenerator('splash.mp3');
        this.world.jumpOnChickenSound = this.audioGenerator('collision.mp3');
        this.world.throwSound = this.audioGenerator('throw.mp3');
        this.world.collectBottleSound = this.audioGenerator('collect-bottle.mp3');
        this.world.winSound = this.audioGenerator('win-sound.mp3');
        this.world.loseSound = this.audioGenerator('lose-sound.mp3');
        this.world.snoreSound = this.audioGenerator('snore.mp3');
        this.world.backgroundSound = this.audioGenerator('background-sound.mp3', 0.2, true);
    }

    audioGenerator(audioFileName, volume = 1.0, loop = false) {
        const audioPath = `../../audio/${audioFileName}`;
        let sound = new Audio(audioPath);
        sound.preload = "auto";
        sound.volume = volume;
        sound.loop = loop;
        sound.load();
        return sound;
    }

    playButtonSoundIfNotMuted() {
        if (!this.world.audioMuted) {
            let buttonSound = this.audioGenerator('button.mp3');
            buttonSound.play();
        }
    }

    //speichert mute Status der Sound's
    applyMuteStateToEffects(audioMuted) {
        const allSounds = [
            this.world.jumpSound,
            this.world.hurtSound,
            this.world.coinSound,
            this.world.splashSound,
            this.world.jumpOnChickenSound,
            this.world.throwSound,
            this.world.collectBottleSound,
            this.world.winSound,
            this.world.loseSound,
            this.world.snoreSound,
        ];

        allSounds.forEach(sound => {
            if (sound) sound.muted = audioMuted;
        });
    }

    //speichert mute Status der music
    applyBackgroundMusicState(paused) {
        const bgSound = this.world.backgroundSound;
        if (!bgSound) return;

        if (paused) {
            bgSound.pause();
            document.getElementById('soundOn')?.classList.add('d-none');
            document.getElementById('soundOff')?.classList.remove('d-none');
        } else {
            bgSound.play();
            document.getElementById('soundOn')?.classList.remove('d-none');
            document.getElementById('soundOff')?.classList.add('d-none');
        }
    }


}
