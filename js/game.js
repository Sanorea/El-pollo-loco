/**
 * The main canvas element.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The main game world.
 * @type {World}
 */
let world;

/**
 * The global keyboard input tracker.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * The sound manager handling music and effects.
 * @type {Sounds}
 */
let soundManager;

/**
 * Indicates whether fullscreen mode is active.
 * @type {boolean}
 */
let fullscreen = false;

/**
 * Initializes the game environment and event listeners.
 */
function init() {
    canvas = document.getElementById('canvas');
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    soundManager = new Sounds();
    setupTouchControls();

}

/**
 * Restarts the game while preserving volume/mute settings.
 */
function restart() {
    const currentMusicVolume = soundManager.backgroundMusic.volume;
    const currentSoundVolume = soundManager.soundSample.volume;
    const currentMusicMuteStatus = soundManager.backgroundMusic.paused;
    requestFullscreenIfMobile();
    cleanGame();
    let { musicMuted, soundMuted } = soundManager.handleMuteStatusMusic();
    resetWorld(musicMuted, soundMuted);
    soundManager.handleMuteStatusSounds(musicMuted, soundMuted);
    cleanUI();
    soundManager.checkMuteButtonSound();
    setVolumeAfterReset(currentMusicVolume, currentSoundVolume, currentMusicMuteStatus);
}

/**
 * Restores volume and playback status for music and sounds.
 * @param {number} currentMusicVolume - Previous background music volume.
 * @param {number} currentSoundVolume - Previous sound effect volume.
 * @param {boolean} currentMusicMuteStatus - Whether music was muted before reset.
 */
function setVolumeAfterReset(currentMusicVolume, currentSoundVolume, currentMusicMuteStatus) {
    soundManager.setVolume(currentMusicVolume);
    soundManager.musicSample.volume = currentMusicVolume;

    const allSounds = loadSoundsAfterReset();
    allSounds.forEach(sound => {
        sound.volume = currentSoundVolume;
    });

    soundManager.soundSample.volume = currentSoundVolume;

    if (currentMusicMuteStatus) {
        soundManager.backgroundMusic.pause();
    } else {
        soundManager.backgroundMusic.play();
    }
}

/**
 * Returns an array of all audio elements managed by the sound manager.
 * @returns {HTMLAudioElement[]} Array of audio elements.
 */
function loadSoundsAfterReset() {
    return [
        soundManager.jumpSound,
        soundManager.hurtSound,
        soundManager.coinSound,
        soundManager.splashSound,
        soundManager.jumpOnChickenSound,
        soundManager.throwSound,
        soundManager.collectBottleSound,
        soundManager.winSound,
        soundManager.loseSound,
        soundManager.snoreSound,
    ];
}

/**
 * Resets game-related variables and canvas state.
 */
function cleanGame() {
    clearAllIntervals();
    keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
}

/**
 * Clears all existing timeouts and intervals.
 */
function clearAllIntervals() {
    let highestTimeoutId = setTimeout(() => { });
    for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
        clearInterval(i);
    }
}

/**
 * Creates a new game world instance.
 * @param {boolean} musicMuted - Whether music should be muted.
 * @param {boolean} soundMuted - Whether sounds should be muted.
 */
function resetWorld(musicMuted, soundMuted) {
    world = new World(canvas, keyboard);
    soundManager.soundMuted = soundMuted;
    soundManager.musicMuted = musicMuted;
    world.level = createLevel();
}

/**
 * Resets and hides/show appropriate UI elements for game start.
 */
function cleanUI() {
    document.getElementById('gameScreen').classList.remove('d-none');
    document.getElementById('gameover-screen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('menuButtonGame').classList.remove('d-none');
    document.getElementById('setting-screen').classList.add('d-none');
    document.getElementById('screenOpenFS').classList.add('d-none');
    document.getElementById('screenCloseFS').classList.add('d-none');
    toggleFScleanUI();
    document.getElementById('screens').classList.add('d-none');
    document.getElementById('impressumScreen').classList.add('d-none');
    document.activeElement.blur();
}

/**
 * Pauses the game by clearing all intervals.
 */
function pauseGame() {
    clearAllIntervals();
}

/**
 * Updates the fullscreen toggle buttons based on current fullscreen state.
 */
function toggleFScleanUI() {
    if (fullscreen) {
        document.getElementById('gameCloseFS').classList.remove('d-none');
        document.getElementById('gameOpenFS').classList.add('d-none');
    } else {
        document.getElementById('gameOpenFS').classList.remove('d-none');
        document.getElementById('gameCloseFS').classList.add('d-none');
    }
}

/**
 * Handles keyboard key press events.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function handleKeyDown(event) {
    if (event.keyCode == 39) keyboard.RIGHT = true;
    if (event.keyCode == 37) keyboard.LEFT = true;
    if (event.keyCode == 38) keyboard.UP = true;
    if (event.keyCode == 40) keyboard.DOWN = true;
    if (event.keyCode == 32) keyboard.SPACE = true;
    if (event.keyCode == 68) keyboard.D = true;
}

/**
 * Handles keyboard key release events.
 * @param {KeyboardEvent} event - The keyboard event.
 */
function handleKeyUp(event) {
    if (event.keyCode == 39) keyboard.RIGHT = false;
    if (event.keyCode == 37) keyboard.LEFT = false;
    if (event.keyCode == 38) keyboard.UP = false;
    if (event.keyCode == 40) keyboard.DOWN = false;
    if (event.keyCode == 32) keyboard.SPACE = false;
    if (event.keyCode == 68) keyboard.D = false;
}

/**
 * Sets up touch-based controls for mobile devices.
 */
function setupTouchControls() {
    mobileButtons('btn-left', 'touchstart', 'LEFT', true);
    mobileButtons('btn-left', 'touchend', 'LEFT', false);
    mobileButtons('btn-right', 'touchstart', 'RIGHT', true);
    mobileButtons('btn-right', 'touchend', 'RIGHT', false);
    mobileButtons('btn-up', 'touchstart', 'SPACE', true);
    mobileButtons('btn-up', 'touchend', 'SPACE', false);
    mobileButtons('btn-throw', 'touchstart', 'D', true);
    mobileButtons('btn-throw', 'touchend', 'D', false);
}

/**
 * Handles events for a specific mobile control button.
 * @param {string} id - The element ID of the button.
 * @param {string} eventType - The type of touch event.
 * @param {string} key - The virtual key to activate.
 * @param {boolean} status - Whether the key is pressed or released.
 */
function mobileButtons(id, eventType, key, status) {
    document.getElementById(id).addEventListener(eventType, (e) => {
        e.preventDefault();
        keyboard[key] = status;
    });
}

/**
 * Opens the game menu and pauses the game.
 */
function openMenu() {
    basicOpenPopupScreen();
    document.getElementById('menu-screen').classList.remove('d-none');
    document.getElementById('instruction-screen').classList.add('d-none');
    document.getElementById('setting-screen').classList.add('d-none');
    document.getElementById('impressumScreen').classList.add('d-none');
    pauseGame();
}

/**
 * Opens the instructions/help screen.
 */
function openInstructions() {
    basicOpenPopupScreen();
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('instruction-screen').classList.remove('d-none');
}

/**
 * Opens the game settings screen.
 */
function openSettings() {
    basicOpenPopupScreen();
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('setting-screen').classList.remove('d-none');
    soundManager.sliderSounds();
    pauseGame();
}

/**
 * Opens the legal info screen.
 */
function openImpressum() {
    basicOpenPopupScreen();
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('impressumScreen').classList.remove('d-none');
}

/**
 * Toggles the fullscreen button visibility for menu screens.
 */
function toggleFSButton() {
    if (fullscreen) {
        document.getElementById('screenCloseFS').classList.remove('d-none');
    } else {
        document.getElementById('screenOpenFS').classList.remove('d-none');
    }
    document.activeElement.blur();
}

/**
 * Opens a generic popup screen and plays button sound.
 */
function basicOpenPopupScreen() {
    document.getElementById('menuButtonGame').classList.add('d-none');
    document.getElementById('gameScreen').classList.add('d-none');
    document.getElementById('screens').classList.remove('screensFS');
    document.getElementById('screens').classList.remove('d-none');
    document.getElementById('gameover-screen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    toggleFSButton();
    soundManager.playButtonSound();
}

/**
 * Applies fullscreen UI styling to game-related elements.
 */
function generalFullscreenOpenUI() {
    document.getElementById('gameScreen').classList.add('fullscreen');
    document.getElementById('canvas').classList.add('fullscreen');
    document.getElementById('screens').classList.add('fullscreen');
    document.getElementById('header').classList.add('d-none');
    document.getElementById('screenPosition').classList.add('fs-screen-position');
    document.getElementById('actionScreens').classList.add('action-screens-FS');
    document.getElementById('gameover-screen').classList.add('win-or-lose-screen-FS');
}

/**
 * Removes fullscreen styling from game-related UI elements.
 */
function generalFullscreenCloseUI() {
    document.getElementById('gameScreen').classList.remove('fullscreen');
    document.getElementById('canvas').classList.remove('fullscreen');
    document.getElementById('screens').classList.remove('fullscreen');
    document.getElementById('header').classList.remove('d-none');
    document.getElementById('screenPosition').classList.remove('fs-screen-position');
    document.getElementById('actionScreens').classList.remove('action-screens-FS');
    document.getElementById('gameover-screen').classList.remove('win-or-lose-screen-FS');
}

/**
 * Enters fullscreen mode for the game view.
 */
function openFullscreenGame() {
    document.documentElement.requestFullscreen().catch((err) => {});
    generalFullscreenOpenUI();
    document.getElementById('gameOpenFS').classList.add('d-none');
    document.getElementById('gameCloseFS').classList.remove('d-none');
    fullscreen = true;
}

/**
 * Exits fullscreen mode for the game view.
 */
function closeFullscreenGame() {
    document.exitFullscreen().catch((err) => {});
    generalFullscreenCloseUI();
    document.getElementById('gameOpenFS').classList.remove('d-none');
    document.getElementById('gameCloseFS').classList.add('d-none');
    fullscreen = false;
}

/**
 * Enters fullscreen mode for screens (e.g. menu, settings).
 */
function openFullscreenScreen() {
    document.documentElement.requestFullscreen().catch((err) => {});
    generalFullscreenOpenUI();
    document.getElementById('screenOpenFS').classList.add('d-none');
    document.getElementById('screenCloseFS').classList.remove('d-none');
    fullscreen = true;
}

/**
 * Exits fullscreen mode for screens (e.g. menu, settings).
 */
function closeFullscreenScreen() {
    document.exitFullscreen().catch((err) => {});
    generalFullscreenCloseUI();
    document.getElementById('screenOpenFS').classList.remove('d-none');
    document.getElementById('screenCloseFS').classList.add('d-none');
    fullscreen = false;
}

function requestFullscreenIfMobile() {
    const isMobileSize = window.innerWidth < 1400; 
    if (isMobileSize) {
        document.documentElement.requestFullscreen().catch((err) => {});
        generalFullscreenOpenUI();
    }
  }
  
  function setupMobileFullscreenTrigger() {
    function handler() {
      requestFullscreenIfMobile();
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("click", handler);
    }
    window.addEventListener("touchstart", handler);
    window.addEventListener("click", handler);
  }

