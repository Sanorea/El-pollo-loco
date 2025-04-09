let canvas;
let world;
let keyboard = new Keyboard();
let soundManager;

function init() {
    canvas = document.getElementById('canvas');
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    soundManager = new Sounds();
}

function restart() {
    const currentMusicVolume = soundManager.backgroundMusic.volume;
    const currentSoundVolume = soundManager.soundSample.volume;
    const currentMusicMuteStatus = soundManager.backgroundMusic.paused;

    cleanGame();
    
    //console.log('restart0 :>> ', currentSoundMuteStatus);

    let { musicMuted, soundMuted } = soundManager.handleMuteStatusMusic();
    //soundManager.handleMuteStatusSounds(musicMuted, soundMuted);

    console.log('restart1 :>> ', soundMuted);
    resetWorld(musicMuted, soundMuted);
    soundManager.handleMuteStatusSounds(musicMuted, soundMuted);

    cleanUI();
    soundManager.checkMuteButtonSound();

    // 🔉 Stelle Lautstärke nach dem Reset wieder her
    soundManager.setVolume(currentMusicVolume);
    soundManager.musicSample.volume = currentMusicVolume;

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
    console.log('restart2 :>> ', soundMuted);
    allSounds.forEach(sound => {
        sound.volume = currentSoundVolume;
    });
    soundManager.soundSample.volume = currentSoundVolume;

    if (currentMusicMuteStatus) {

        soundManager.backgroundMusic.pause();
    } else {
        soundManager.backgroundMusic.play();
    }

    console.log('restart3 :>> ', soundMuted);
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
    document.getElementById('gameover-screen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('menuButtonGame').classList.remove('d-none');
    document.activeElement.blur();
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

function openMenu() {
    document.getElementById('menu-screen').classList.remove('d-none');
    document.getElementById('instruction-screen').classList.add('d-none');
    document.getElementById('setting-screen').classList.add('d-none');
    document.getElementById('menuButtonGame').classList.add('d-none');
    soundManager.playButtonSound();
}

function openInstructions() {
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('instruction-screen').classList.remove('d-none');
    soundManager.playButtonSound();

}

function openSettings() {
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('setting-screen').classList.remove('d-none');
    soundManager.playButtonSound();
    soundManager.sliderSounds();

}