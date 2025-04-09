class Sounds {
    button;
    soundSample;
    musicSample;
    jumpSound;
    hurtSound;
    coinSound;
    splashSound;
    jumpOnChickenSound;
    throwSound;
    collectBottleSound;
    winSound;
    loseSound;
    snoreSound;

    soundMuted;
    musicMuted;
    audioMuted;

    constructor() {
        this.initAudioData();
        this.musicMuted = false;
        this.soundMuted = false;
    }

    initAudioData() {
        this.backgroundMusic = this.audioGenerator('audio/background-sound.mp3', 1.0, true),
        this.button = this.audioGenerator('audio/button.mp3');
        this.soundSample = this.audioGenerator('audio/hurt.mp3');
        this.musicSample = this.audioGenerator('audio/background-sound.mp3');
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
    };

    audioGenerator(audio, volume = 1.0, loop = false) {
        let sound = new Audio(audio);
        sound.preload = "auto";
        sound.volume = volume;
        sound.loop = loop;
        sound.load();
        return sound;
    }

    playButtonSound() {
        this.button.currentTime = 0;
        this.button.play();
    }

    playSoundSample() {
        this.soundSample.currentTime = 0;
        this.soundSample.play().catch(e => console.warn('Sound sample play blocked:', e));
    }

    playMusicSample() {
        const sample = this.musicSample;
        sample.currentTime = 10;
        sample.volume = this.backgroundMusic.volume;
        this.musicSample.play().catch(e => console.warn('Music sample play blocked:', e));
        setTimeout(() => sample.pause(), 1500);
    }

    toggleMusic() {
        console.log('davor', this.backgroundMusic.paused);
        if (this.backgroundMusic.paused) {
            console.log('if1', this.backgroundMusic.paused);

            this.backgroundMusic.play();
            document.getElementById('soundOn').classList.remove('d-none');
            document.getElementById('soundOff').classList.add('d-none');
            document.getElementById('soundOnInGame').classList.remove('d-none');
            document.getElementById('soundOffInGame').classList.add('d-none');
            console.log('if2', this.backgroundMusic.paused);
            console.log('************');
        } else {
            console.log('else1', this.backgroundMusic.paused);
            this.backgroundMusic.pause();
            document.getElementById('soundOn').classList.add('d-none');
            document.getElementById('soundOff').classList.remove('d-none');
            document.getElementById('soundOnInGame').classList.add('d-none');
            document.getElementById('soundOffInGame').classList.remove('d-none');
            console.log('else2', this.backgroundMusic.paused);
            console.log('************');
        }
        document.activeElement.blur();
    }

    setVolume(volume) {
        this.backgroundMusic.volume = volume;
        this.button.volume = volume;
    }

    handleMuteStatusMusic() {
        // 🧠 Merke dir den aktuellen Mute-Zustand
        let musicMuted = this?.backgroundMusic.paused || false;
        let musicPaused = this?.backgroundSound?.paused || false;
        return { musicMuted, musicPaused }
    }

    handleMuteStatusSounds(soundMuted, musicPaused) {
        this.loadSoundsStatus(soundMuted);
        this.setMusicStatus(musicPaused);
        this.toggleSoundButton(soundMuted);
    }

    loadSoundsStatus(soundMuted) {
        const effectSounds = [
            this.jumpSound,
            this.hurtSound,
            this.coinSound,
            this.splashSound,
            this.jumpOnChickenSound,
            this.throwSound,
            this.collectBottleSound,
            this.winSound,
            this.loseSound,
            this.snoreSound,
        ];
        effectSounds.forEach(sound => {
            sound.muted = soundMuted;
        });
    }

    setMusicStatus(musicPaused) {
        // 🎵 Musikzustand wiederherstellens
        if (musicPaused) {
            this.backgroundMusic.pause();
            document.getElementById('soundOn').classList.add('d-none');
            document.getElementById('soundOff').classList.remove('d-none');
        } else {
            this.backgroundMusic.play();
            document.getElementById('soundOn').classList.remove('d-none');
            document.getElementById('soundOff').classList.add('d-none');
        }
    }

    toggleSoundButton(soundMuted) {
        document.getElementById('soundEffectOn').classList.toggle('d-none', soundMuted);
        document.getElementById('soundEffectOff').classList.toggle('d-none', !soundMuted);
    }

    checkMuteButtonSound() {
        if (!soundManager || !soundManager.soundMuted) soundManager.playButtonSound();
    }

    muteBackgroundMusic() {
        this.toggleMusic();
    }


    muteSounds() {
        this.soundMuted = !this.soundMuted;
        const allSounds = [
            this.jumpSound,
            this.hurtSound,
            this.coinSound,
            this.splashSound,
            this.jumpOnChickenSound,
            this.throwSound,
            this.collectBottleSound,
            this.winSound,
            this.loseSound,
            this.snoreSound,
        ];
        allSounds.forEach(sound => {
            sound.muted = this.soundMuted;
        });
        console.log('soundMuted :>> ', this.soundMuted);

        if (this.soundMuted) {
            document.getElementById('soundEffectOn').classList.add('d-none');
            document.getElementById('soundEffectOff').classList.remove('d-none');
            document.getElementById('soundEffectOnInGame').classList.add('d-none');
            document.getElementById('soundEffectOffInGame').classList.remove('d-none');
            console.log('soundMuted1 :>> ', this.soundMuted);
        } else {
            document.getElementById('soundEffectOn').classList.remove('d-none');
            document.getElementById('soundEffectOff').classList.add('d-none');
            document.getElementById('soundEffectOnInGame').classList.remove('d-none');
            document.getElementById('soundEffectOffInGame').classList.add('d-none');
            console.log('soundMuted2 :>> ', this.soundMuted);
        };
        document.activeElement.blur();
    }

    sliderSounds() {
        // Slider für Background-Music
        const musicSlider = document.getElementById("musicVolume");
        musicSlider.value = this.backgroundMusic.volume || 1.0;
        musicSlider.addEventListener("input", (event) => { // Benutze hier eine Arrow Function
            const volume = event.target.value;
            console.log('volume :>> ', volume);
            this.setVolume(volume);  // Jetzt sollte es funktionieren
            this.musicSample.volume = volume;
            this.playMusicSample();
        });

        const soundSlider = document.getElementById("soundVolume");
        // Slider für Sounds
        soundSlider.value = this.soundSample.volume || 1.0; // Referenzwert setzen

        soundSlider.addEventListener("input", (event) => { // Auch hier eine Arrow Function verwenden
            const volume = parseFloat(event.target.value); // ❗ Hier wird die Lautstärke korrekt ausgelesen

            const allSounds = [
                this.jumpSound,
                this.hurtSound,
                this.coinSound,
                this.splashSound,
                this.jumpOnChickenSound,
                this.throwSound,
                this.collectBottleSound,
                this.winSound,
                this.loseSound,
                this.snoreSound,
            ];
            allSounds.forEach(sound => {
                sound.volume = volume;
            });

            // Lautstärke der Vorschau anpassen + abspielen
            this.soundSample.volume = volume;
            this.playSoundSample();
        });

        document.activeElement.blur();
    };






}

