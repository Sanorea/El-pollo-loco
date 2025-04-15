let canvas;
let world;
let keyboard = new Keyboard();
let soundManager;
let fullscreen = false;

function init() {
    canvas = document.getElementById('canvas');
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    soundManager = new Sounds();
    setupTouchControls();
}

function restart() {
    const currentMusicVolume = soundManager.backgroundMusic.volume;
    const currentSoundVolume = soundManager.soundSample.volume;
    const currentMusicMuteStatus = soundManager.backgroundMusic.paused;
    cleanGame();
    let { musicMuted, soundMuted } = soundManager.handleMuteStatusMusic();
    resetWorld(musicMuted, soundMuted);
    soundManager.handleMuteStatusSounds(musicMuted, soundMuted);
    cleanUI();
    soundManager.checkMuteButtonSound();
    setVolumeAfterReset(currentMusicVolume, currentSoundVolume, currentMusicMuteStatus);
}

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

function loadSoundsAfterReset() {
    const allSounds = [
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
    return allSounds;
}


function cleanGame() {
    clearAllIntervals();
    keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
}

function clearAllIntervals() {
    let highesTimeoutId = setTimeout(() => { }); // Holt die höchste Timeout-ID
    for (let i = 0; i < highesTimeoutId; i++) {
        clearTimeout(i);
        clearInterval(i);
    }
}

function resetWorld(musicMuted, soundMuted) {
    // 🌍 Neues World-Objekt erzeugen
    world = new World(canvas, keyboard);
    soundManager.soundMuted = soundMuted;
    soundManager.musicMuted = musicMuted;
    world.level = createLevel();
}


function cleanUI() {
    // 👇 Restliches UI aufräumen
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

function pauseGame() {
    clearAllIntervals();
}

function toggleFScleanUI() {
    if (fullscreen) {
        document.getElementById('gameCloseFS').classList.remove('d-none');
        document.getElementById('gameOpenFS').classList.add('d-none');
    } else {
        document.getElementById('gameOpenFS').classList.remove('d-none');
        document.getElementById('gameCloseFS').classList.add('d-none');
    }
}

function handleKeyDown(event) {
    if (event.keyCode == 39) keyboard.RIGHT = true;
    if (event.keyCode == 37) keyboard.LEFT = true;
    if (event.keyCode == 38) keyboard.UP = true;
    if (event.keyCode == 40) keyboard.DOWN = true;
    if (event.keyCode == 32) keyboard.SPACE = true;
    if (event.keyCode == 68) keyboard.D = true;
}

function handleKeyUp(event) {
    if (event.keyCode == 39) keyboard.RIGHT = false;
    if (event.keyCode == 37) keyboard.LEFT = false;
    if (event.keyCode == 38) keyboard.UP = false;
    if (event.keyCode == 40) keyboard.DOWN = false;
    if (event.keyCode == 32) keyboard.SPACE = false;
    if (event.keyCode == 68) keyboard.D = false;
}


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

function mobileButtons(id, eventType, key, status) {
    document.getElementById(id).addEventListener(eventType, (e) => {
        e.preventDefault();
        keyboard[key] = status;
    });
}


function openMenu() {
    basicOpenPopupScreen();
    document.getElementById('menu-screen').classList.remove('d-none');
    document.getElementById('instruction-screen').classList.add('d-none');
    document.getElementById('setting-screen').classList.add('d-none');
    document.getElementById('impressumScreen').classList.add('d-none');
    pauseGame();
}

function openInstructions() {
    basicOpenPopupScreen();
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('instruction-screen').classList.remove('d-none');
}

function openSettings() {
    basicOpenPopupScreen();
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('setting-screen').classList.remove('d-none');
    soundManager.sliderSounds();
    pauseGame();
}

function openImpressum() {
    basicOpenPopupScreen();
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('impressumScreen').classList.remove('d-none');
    //soundManager.sliderSounds();
}

function toggleFSButton() {
    if (fullscreen) {
        document.getElementById('screenCloseFS').classList.remove('d-none');
    } else {
        document.getElementById('screenOpenFS').classList.remove('d-none');
    }
}

function basicOpenPopupScreen() {
    document.getElementById('menuButtonGame').classList.add('d-none');
    document.getElementById('gameScreen').classList.add('d-none');
    document.getElementById('screens').classList.remove('screensFS')
    document.getElementById('screens').classList.remove('d-none');
    toggleFSButton();
    soundManager.playButtonSound();
}

function generalFullscreenOpenUI() {
    document.getElementById('gameScreen').classList.add('fullscreen');
    document.getElementById('canvas').classList.add('fullscreen');
    document.getElementById('screens').classList.add('fullscreen');
    document.getElementById('gameScreen').classList.add('fullscreen');
    document.getElementById('header').classList.add('d-none');
    document.getElementById('screenPosition').classList.add('fs-screen-position');
    document.getElementById('actionScreens').classList.add('action-screens-FS');
    document.getElementById('gameover-screen').classList.add('win-or-lose-screen-FS');

}

function generalFullscreenCloseUI() {
    document.getElementById('gameScreen').classList.remove('fullscreen');
    document.getElementById('canvas').classList.remove('fullscreen');
    document.getElementById('screens').classList.remove('fullscreen');
    document.getElementById('gameScreen').classList.remove('fullscreen');
    document.getElementById('header').classList.remove('d-none');
    document.getElementById('screenPosition').classList.remove('fs-screen-position');
    document.getElementById('actionScreens').classList.remove('action-screens-FS');
    document.getElementById('gameover-screen').classList.remove('win-or-lose-screen-FS');
}

function openFullscreenGame() {
    generalFullscreenOpenUI();
    document.getElementById('gameOpenFS').classList.add('d-none');
    document.getElementById('gameCloseFS').classList.remove('d-none');
    fullscreen = true;

}

function closeFullscreenGame() {
    generalFullscreenCloseUI();
    document.getElementById('gameOpenFS').classList.remove('d-none');
    document.getElementById('gameCloseFS').classList.add('d-none');
    fullscreen = false;
}

function openFullscreenScreen() {
    generalFullscreenOpenUI();
    document.getElementById('screenOpenFS').classList.add('d-none');
    document.getElementById('screenCloseFS').classList.remove('d-none');
    fullscreen = true;
}

function closeFullscreenScreen() {
    generalFullscreenCloseUI();
    document.getElementById('screenOpenFS').classList.remove('d-none');
    document.getElementById('screenCloseFS').classList.add('d-none');
    fullscreen = false;
}

