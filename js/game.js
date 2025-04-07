let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    //world = new World(canvas, keyboard);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}


function restart() {
    world = new World(canvas, keyboard);
    clearAllIntervals();
    keyboard = new Keyboard(); // Erstellt ein frisches Keyboard-Objekt
    world.level = createLevel();
    canvas = document.getElementById('canvas');
    world.backgroundSound.pause();
    world.backgroundSound.currentTime = 0;
    world = new World(canvas, keyboard);
    document.getElementById('gameover-screen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('menuButtonGame').classList.remove('d-none');
    world.backgroundSound.play();
    world.buttonSound.play();
    document.activeElement.blur(); //entzieht dem gedrückten Knopf den Fokus
}

function clearAllIntervals() {
    let highesTimeoutId = setTimeout(() => { }); // Holt die höchste Timeout-ID
    for (let i = 0; i < highesTimeoutId; i++) {
        clearTimeout(i);
        clearInterval(i);
    }
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
    world.buttonSound.play();
}

function openInstructions() {
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('instruction-screen').classList.remove('d-none');
    world.buttonSound.play();
}

function openSettings() {
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('setting-screen').classList.remove('d-none');
    world.buttonSound.play();
}
