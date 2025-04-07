function playButtonSound() {
    let buttonSound = this.audioGenerator('audio/button.mp3');
    buttonSound.play();
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
    if (world.backgroundSound.paused) {
        world.backgroundSound.play();
        document.getElementById('soundOn').classList.remove('d-none');
        document.getElementById('soundOff').classList.add('d-none');
    } else {
        world.backgroundSound.pause();
        document.getElementById('soundOn').classList.add('d-none');
        document.getElementById('soundOff').classList.remove('d-none');
    }
    document.activeElement.blur();
}

function muteSounds() {
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
    document.activeElement.blur();
}