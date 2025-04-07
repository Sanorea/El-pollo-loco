let canvas;
let world;
let keyboard = new Keyboard();
let soundManager;
let isFirstLoad = true; // Variable, um den ersten Seitenaufruf zu erkennen

function init() {
    canvas = document.getElementById('canvas');
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Hier initialisieren wir den SoundManager, aber der Hintergrund-Sound wird noch nicht abgespielt.
    world = new World(canvas, keyboard);
    soundManager = new SoundManager(world);
    soundManager.initSounds(); // Sounds werden jetzt mit einem korrekt initialisierten World-Objekt geladen
    soundManager.applyBackgroundMusicState(true);

}

function restart() {
    cleanGame();
    let { audioMuted, musicPaused } = handleMuteStatusMusic();
    resetWorld(audioMuted);
    console.log('isFirstLoad :>> ', isFirstLoad);
    if (isFirstLoad = true) {
        isFirstLoad = false;
/*         soundManager.applyBackgroundMusicState(false); */
        console.log('object :>> ', isFirstLoad);
    }
    soundManager = new SoundManager(world);  // Sicherstellen, dass soundManager korrekt initialisiert wird
    soundManager.initSounds();

    applySoundStates(audioMuted, musicPaused);
    cleanUI();
    soundManager.playButtonSoundIfNotMuted();


    // Zustand des Hintergrund-Sounds nach dem Reset übernehmen
    if (world.backgroundSound) {
        if (world.backgroundSound.paused) {
            // Wenn der Sound pausiert wurde, behalte diesen Zustand bei
            soundManager.applyBackgroundMusicState(true);
        } else {
            // Andernfalls, wenn der Sound läuft, lasse ihn weiterlaufen
            soundManager.applyBackgroundMusicState(false);
        }
    }
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

function applySoundStates(audioMuted, musicPaused) {
    soundManager.applyMuteStateToEffects(audioMuted);
    soundManager.applyBackgroundMusicState(musicPaused);
}

function muteBackgroundMusic() {
    if (!world?.backgroundSound) return;

    const isPaused = world.backgroundSound.paused;
    soundManager.applyBackgroundMusicState(!isPaused);  // Fehlerbehebung: `toggleBackgroundMusic` ersetzt durch `applyBackgroundMusicState`
    document.activeElement.blur();
}

function muteSounds() {
    world.audioMuted = !world.audioMuted;
    soundManager.applyMuteStateToEffects(world.audioMuted);  // Fehlerbehebung: `toggleSoundEffects` ersetzt durch `applyMuteStateToEffects`
    document.activeElement.blur();
}

function handleMuteStatusMusic() {
    let audioMuted = world?.audioMuted || false;
    let musicPaused = world?.backgroundSound?.paused || false;

    if (world && world.backgroundSound) {
        world.backgroundSound.pause();
        world.backgroundSound.currentTime = 0;
    }
    return { audioMuted, musicPaused };
}

function resetWorld(audioMuted) {
    world = new World(canvas, keyboard);
    world.audioMuted = audioMuted;
    world.level = createLevel();
}

function cleanUI() {
    document.getElementById('gameover-screen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('menuButtonGame').classList.remove('d-none');
    document.activeElement.blur();
}

let spaceReleased = true;

function handleKeyDown(event) {
    if (event.keyCode == 39) keyboard.RIGHT = true;
    if (event.keyCode == 37) keyboard.LEFT = true;
    if (event.keyCode == 38) keyboard.UP = true;
    if (event.keyCode == 40) keyboard.DOWN = true;
    if (event.keyCode == 32) {
        if (spaceReleased) {
            keyboard.SPACE = true;
            spaceReleased = false;
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
        spaceReleased = true;
    }
    if (event.keyCode == 68) keyboard.D = false;
}

function openMenu() {
    document.getElementById('menu-screen').classList.remove('d-none');
    document.getElementById('instruction-screen').classList.add('d-none');
    document.getElementById('setting-screen').classList.add('d-none');
    document.getElementById('menuButtonGame').classList.add('d-none');
    if (!soundManager) {
        soundManager = new SoundManager(world);
        soundManager.initSounds();
    }
    soundManager.playButtonSoundIfNotMuted();   
}

function openInstructions() {
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('instruction-screen').classList.remove('d-none');

    if (!soundManager) {
        soundManager = new SoundManager(world);
        soundManager.initSounds();
    }
    soundManager.playButtonSoundIfNotMuted();
}

function openSettings() {
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('setting-screen').classList.remove('d-none');

    if (!soundManager) {
        soundManager = new SoundManager(world);
        soundManager.initSounds();
    }
    soundManager.playButtonSoundIfNotMuted();  
}
