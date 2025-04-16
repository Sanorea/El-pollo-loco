/**
 * Class responsible for handling all audio-related functionality in the game.
 * This includes background music, sound effects, volume control, mute toggling, and audio sliders.
 */
class Sounds {
    /** @type {HTMLAudioElement} */ button;
    /** @type {HTMLAudioElement} */ soundSample;
    /** @type {HTMLAudioElement} */ musicSample;
    /** @type {HTMLAudioElement} */ jumpSound;
    /** @type {HTMLAudioElement} */ hurtSound;
    /** @type {HTMLAudioElement} */ coinSound;
    /** @type {HTMLAudioElement} */ splashSound;
    /** @type {HTMLAudioElement} */ jumpOnChickenSound;
    /** @type {HTMLAudioElement} */ throwSound;
    /** @type {HTMLAudioElement} */ collectBottleSound;
    /** @type {HTMLAudioElement} */ winSound;
    /** @type {HTMLAudioElement} */ loseSound;
    /** @type {HTMLAudioElement} */ snoreSound;
    /** @type {HTMLAudioElement} */ backgroundMusic;

    /** @type {boolean} */ soundMuted;
    /** @type {boolean} */ musicMuted;
    /** @type {boolean} */ audioMuted;

    /**
     * Constructs the Sounds class and initializes audio settings.
     */
    constructor() {
        this.initAudioData();
        this.soundMuted = true;
    }

    /**
     * Initializes all game sounds and music.
     */
    initAudioData() {
        this.backgroundMusic = this.audioGenerator('audio/background-sound.mp3', 1.0, true);
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
    }

    /**
     * Creates and returns an audio object.
     * @param {string} audio - Path to the audio file.
     * @param {number} [volume=1.0] - Volume of the audio.
     * @param {boolean} [loop=false] - Whether the audio should loop.
     * @returns {HTMLAudioElement}
     */
    audioGenerator(audio, volume = 1.0, loop = false) {
        let sound = new Audio(audio);
        sound.preload = "auto";
        sound.volume = volume;
        sound.loop = loop;
        sound.load();
        return sound;
    }

    /**
     * Plays the UI button click sound.
     */
    playButtonSound() {
        this.button.currentTime = 0;
        this.button.play();
    }

    /**
     * Plays a generic sample sound.
     */
    playSoundSample() {
        this.soundSample.currentTime = 0;
        this.soundSample.play().catch(e => console.warn('Sound sample play blocked:', e));
    }

    /**
     * Plays a short music sample.
     */
    playMusicSample() {
        const sample = this.musicSample;
        sample.currentTime = 10;
        sample.volume = this.backgroundMusic.volume;
        sample.play().catch(e => console.warn('Music sample play blocked:', e));
        setTimeout(() => sample.pause(), 1500);
    }

    /**
     * Toggles the background music on or off.
     */
    toggleMusic() {
        let muteStatusBackgroundMusic = localStorage.getItem('muteStatusMusic') === 'true';
        if (muteStatusBackgroundMusic) {
            this.backgroundMusic.play();
            document.getElementById('soundOn').classList.remove('d-none');
            document.getElementById('soundOff').classList.add('d-none');
            localStorage.setItem('muteStatusMusic', false);
        } else {
            this.backgroundMusic.pause();
            document.getElementById('soundOn').classList.add('d-none');
            document.getElementById('soundOff').classList.remove('d-none');
            localStorage.setItem('muteStatusMusic', true);
        }
        document.activeElement.blur();
    }

    /**
 * Restores music playback or pause state and updates UI icons.
 * @param {boolean} musicPaused
 */
    setMusicStatus(musicPaused) {
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

    /**
     * Sets the volume for background music and UI sounds.
     * @param {number} volume - Volume level between 0.0 and 1.0
     */
    setVolume(volume) {
        this.backgroundMusic.volume = volume;
        this.button.volume = volume;
    }

    /**
     * Applies mute settings to sound effects.
     * @param {boolean} soundMuted - Whether sound effects are muted.
     */
    handleMuteStatusSounds(soundMuted) {
        this.loadSoundsStatus(soundMuted);
        this.toggleSoundButton(soundMuted);
    }

    /**
     * Loads and sets the mute state for all sound effect audio elements.
     */
    loadSoundsStatus(soundMuted) {
        const effectSounds = this.loadAllSounds();
        effectSounds.forEach(sound => {
            if (soundMuted) {
                sound.muted = soundMuted;
            }
        });
    }

    /**
     * Updates UI elements depending on whether sound effects are muted.
     * @param {boolean} soundMuted
     */
    toggleSoundButton(soundMuted) {
        document.getElementById('soundEffectOn').classList.toggle('d-none', soundMuted);
        document.getElementById('soundEffectOff').classList.toggle('d-none', !soundMuted);
    }

    /**
     * Plays the button sound unless sounds are muted.
     */
    checkMuteButtonSound() {
        if (!this || !this.soundMuted) this.playButtonSound();
    }

    /**
     * Toggles all sound effects on or off and updates UI.
     */
    muteSounds() {
        let currentMuteStatus = localStorage.getItem('muteStatusSound') === 'true'; // true = aktuell gemutet
        let newMuteStatus = !currentMuteStatus;
        let allSounds = this.loadAllSounds();
        allSounds.forEach(sound => {
            sound.muted = newMuteStatus;
        });
        localStorage.setItem('muteStatusSound', newMuteStatus.toString());
        this.soundMuted = newMuteStatus;  // für die UI später wichtig
        this.handleSoundMutedEffect();
        document.activeElement.blur();
    }


    /**
     * Returns an array of all game sound effect audio elements.
     * @returns {HTMLAudioElement[]}
     */
    loadAllSounds() {
        return [
            this.jumpSound,
            this.hurtSound,
            this.coinSound,
            this.splashSound,
            this.jumpOnChickenSound,
            this.throwSound,
            this.collectBottleSound,
            this.winSound,
            this.loseSound,
            this.snoreSound
        ];
    }

    /**
     * Updates UI icons depending on current sound mute status.
     */
    handleSoundMutedEffect() {
        if (this.soundMuted) {
            document.getElementById('soundEffectOn').classList.add('d-none');
            document.getElementById('soundEffectOff').classList.remove('d-none');
        } else {
            document.getElementById('soundEffectOn').classList.remove('d-none');
            document.getElementById('soundEffectOff').classList.add('d-none');
        }
    }

    /**
  * Initializes both music and sound volume sliders.
  */
    sliderSounds() {
        this.playSliderMusic();
        this.playSliderSound();
        document.activeElement.blur();
    };

    /**
 * Initializes the background music volume slider and its event listener.
 */
    playSliderMusic() {
        const musicSlider = document.getElementById("musicVolume");
        musicSlider.value = localStorage.getItem('musicVolume') || 1.0;
        musicSlider.addEventListener("input", (event) => {
            const volume = event.target.value;
            this.setVolume(volume);
            this.musicSample.volume = volume;
            this.playMusicSample();
            localStorage.setItem('musicVolume', musicSlider.value);
        });
    }

    /**
 * Initializes the sound effect volume slider and its event listener.
 */
    playSliderSound() {
        const soundSlider = document.getElementById("soundVolume");
        soundSlider.value = localStorage.getItem('soundVolume') || 1.0;
        soundSlider.addEventListener("input", (event) => {
            const volume = parseFloat(event.target.value);
            let allSounds = this.loadAllSounds();
            allSounds.forEach(sound => {
                sound.volume = volume;
            });
            this.soundSample.volume = volume;
            this.playSoundSample();
            localStorage.setItem('soundVolume', soundSlider.value);
        });

    }
}

