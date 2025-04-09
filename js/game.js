let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

function restart() {
    cleanGame();
    let { audioMuted, musicPaused } = handleMuteStatusMusic();
    resetWorld(audioMuted);
    handleMuteStatusSounds(audioMuted, musicPaused);
    cleanUI();
    checkMuteButtonSound();
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

function handleMuteStatusMusic() {
    // 🧠 Merke dir den aktuellen Mute-Zustand
    let audioMuted = world?.audioMuted || false;
    let musicPaused = world?.backgroundSound?.paused || false;

    // 🧹 Vorherige Musik stoppen
    if (world && world.backgroundSound) {
        world.backgroundSound.pause();
        world.backgroundSound.currentTime = 0;
    }
    return { audioMuted, musicPaused }
}

function resetWorld(audioMuted) {
    // 🌍 Neues World-Objekt erzeugen
    world = new World(canvas, keyboard);
    world.audioMuted = audioMuted;
    world.level = createLevel();
}

function handleMuteStatusSounds(audioMuted, musicPaused) {
    loadSoundsStatus(audioMuted);
    setSoundsStatus(musicPaused);
    toggleSoundButton(audioMuted);
}

function loadSoundsStatus(audioMuted) {
    const effectSounds = [
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
    effectSounds.forEach(sound => {
        sound.muted = audioMuted;
    });
}

function setSoundsStatus(musicPaused) {
    // 🎵 Musikzustand wiederherstellens
    if (musicPaused) {
        world.backgroundSound.pause();
        document.getElementById('soundOn').classList.add('d-none');
        document.getElementById('soundOff').classList.remove('d-none');
    } else {
        world.backgroundSound.play();
        document.getElementById('soundOn').classList.remove('d-none');
        document.getElementById('soundOff').classList.add('d-none');
    }
}

function toggleSoundButton(audioMuted) {
    document.getElementById('soundEffectOn').classList.toggle('d-none', audioMuted);
    document.getElementById('soundEffectOff').classList.toggle('d-none', !audioMuted);
}

function cleanUI() {
    // 👇 Restliches UI aufräumen
    document.getElementById('gameover-screen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('menuButtonGame').classList.remove('d-none');
    document.activeElement.blur();
}

function checkMuteButtonSound() {
    // 🛎 Button-Sound nur bei aktivem Effekt-Ton
    if (!world.audioMuted) playButtonSound();
}

let spaceReleased = true; // Verhindert mehrfaches Restart-Auslösen

function handleKeyDown(event) {
    if (event.keyCode == 39) keyboard.RIGHT = true;
    if (event.keyCode == 37) keyboard.LEFT = true;
    if (event.keyCode == 38) keyboard.UP = true;
    if (event.keyCode == 40) keyboard.DOWN = true;
    if (event.keyCode == 32) {
        if (spaceReleased) {
            keyboard.SPACE = true;
            spaceReleased = false; // Blockiert wiederholtes Starten
        }
    }
    if (event.keyCode == 68) keyboard.D = true;
}

function handleKeyUp(event) {
    if (event.keyCode == 39) keyboard.RIGHT = false;
    if (event.keyCode == 37) keyboard.LEFT = false;
    if (event.keyCode == 38) keyboard.UP = false;
    if (event.keyCode == 40) keyboard.DOWN = false;
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
        spaceReleased = true; // Erlaubt neues Drücken nach dem Loslassen
    }
    if (event.keyCode == 68) keyboard.D = false;
}

function openMenu() {
    document.getElementById('menu-screen').classList.remove('d-none');
    document.getElementById('instruction-screen').classList.add('d-none');
    document.getElementById('setting-screen').classList.add('d-none');
    document.getElementById('menuButtonGame').classList.add('d-none');
    playButtonSound();
}

function openInstructions() {
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('instruction-screen').classList.remove('d-none');
    playButtonSound();
}

function openSettings() {
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('setting-screen').classList.remove('d-none');
    playButtonSound();
    sliderSounds();
}