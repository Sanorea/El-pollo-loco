
// js/sound-manager.js
/* const audioMuted = false; */

const SoundManager = {
    ui: {
        button: new Audio('audio/button.mp3'),
    },
    backgroundMusic: new Audio('audio/background-sound.mp3'),
    soundSample: new Audio('audio/hurt.mp3'),
    musicSample: new Audio('audio/background-sound.mp3'),
    effects: {}, // Hier später weitere Effekt-Sounds rein, falls nötig

    init() {
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 1.0;
        this.backgroundMusic.preload = "auto";
        this.backgroundMusic.load();

        this.ui.button.volume = 1.0;
        this.ui.button.preload = "auto";
        this.ui.button.load();

        this.soundSample.volume = 1.0;
        this.soundSample.preload = "auto";
        this.soundSample.load();

        this.musicSample.volume = 1.0;
        this.musicSample.preload = "auto";
        this.musicSample.load();
    },

    playButtonSound() {
        this.ui.button.currentTime = 0;
        this.ui.button.play();
    },

    playSoundSample() {
        this.soundSample.currentTime = 0;
        this.soundSample.play().catch(e => console.warn('Sound sample play blocked:', e));
    },
    playMusicSample() {
        const sample = this.musicSample;
        sample.currentTime = 10;
        sample.volume = this.backgroundMusic.volume;
        this.musicSample.play().catch(e => console.warn('Music sample play blocked:', e));
        setTimeout(() => sample.pause(), 1500);
    },

    toggleMusic() {
        if (this.backgroundMusic.paused) {
            this.backgroundMusic.play();
            document.getElementById('soundOn').classList.remove('d-none');
            document.getElementById('soundOff').classList.add('d-none');
        } else {
            this.backgroundMusic.pause();
            document.getElementById('soundOn').classList.add('d-none');
            document.getElementById('soundOff').classList.remove('d-none');
        }
        document.activeElement.blur();
    },

    setVolume(volume) {
        this.backgroundMusic.volume = volume;
        this.ui.button.volume = volume;
    }
};





function playButtonSound() {
    let buttonSound = this.audioGenerator('audio/button.mp3');
    buttonSound.play();
}

/* function audioGenerator(audio, volume = 1.0, loop = false) {
    let sound = new Audio(audio);
    sound.preload = "auto";
    sound.volume = volume;
    sound.loop = loop;
    sound.load();
    return sound;
} */

function initAudioData() {
    this.jumpSound = this.audioGenerator('audio/jump.mp3');
    this.hurtSound = this.audioGenerator('audio/hurt.mp3');
    this.coinSound = this.audioGenerator('audio/collect-coins.mp3');
    this.splashSound = this.audioGenerator('audio/splash.mp3');
    this.jumpOnChickenSound = this.audioGenerator('audio/collision.mp3');
    this.throwSound = this.audioGenerator('audio/throw.mp3');
    this.collectBottleSound = this.audioGenerator('audio/collect-bottle.mp3');
    this.winSound = this.audioGenerator('audio/win-sound.mp3');
    this.loseSound = this.audioGenerator('audio/lose-sound.mp3');
    this.snoreSound = this.audioGenerator('audio/snore.mp3');
}

function audioGenerator(audio, volume = 1.0, loop = false) {
    let sound = new Audio(audio);
    sound.preload = "auto";
    sound.volume = volume;
    sound.loop = loop;
    sound.load();
    return sound;
}


function muteBackgroundMusic() {
    SoundManager.toggleMusic();
}


function muteSounds() {
    console.log('world :>> ', world);
    world.audioMuted = !world.audioMuted;
    const allSounds = [
        world.jumpSound,
        world.hurtSound,
        world.coinSound,
        world.splashSound,
        world.jumpOnChickenSound,
        world.throwSound,
        world.collectBottleSound,
        world.winSound,
        world.loseSound,
        world.snoreSound,
    ];
    allSounds.forEach(sound => {
        sound.muted = world.audioMuted;
    });
    if (world.audioMuted) {
        document.getElementById('soundEffectOn').classList.add('d-none');
        document.getElementById('soundEffectOff').classList.remove('d-none');
    } else {
        document.getElementById('soundEffectOn').classList.remove('d-none');
        document.getElementById('soundEffectOff').classList.add('d-none');
    };
    document.activeElement.blur();
}

function sliderSounds() {
    // Slider für Background-Music
    const musicSlider = document.getElementById("musicVolume");
    musicSlider.value = SoundManager.backgroundMusic.volume || 1.0;
    musicSlider.addEventListener("input", function () {
        const volume = musicSlider.value;
        SoundManager.setVolume(volume);
        SoundManager.musicSample.volume = volume;
        SoundManager.playMusicSample();

    })
    const soundSlider = document.getElementById("soundVolume");
    // Slider für Sounds
    soundSlider.value = SoundManager.soundSample.volume || 1.0; // Referenzwert setzen

    soundSlider.addEventListener("input", function () {
        const volume = parseFloat(soundSlider.value); // ❗ Hier wird die Lautstärke korrekt ausgelesen

        if (world) {
            const allSounds = [
                world.jumpSound,
                world.hurtSound,
                world.coinSound,
                world.splashSound,
                world.jumpOnChickenSound,
                world.throwSound,
                world.collectBottleSound,
                world.winSound,
                world.loseSound,
                world.snoreSound,
            ];
            allSounds.forEach(sound => {
                sound.volume = volume;
            });
        }

        // Lautstärke der Vorschau anpassen + abspielen
        SoundManager.soundSample.volume = volume;
        SoundManager.playSoundSample();
    });

    document.activeElement.blur();
};



