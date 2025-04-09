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
    console.log('world1 :>> ', world);
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
    console.log('world :>> ', world);
    const volumeSlider = document.getElementById("volume");
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


    // Setze den Slider auf die Lautstärke des ersten Sounds oder auf den Standardwert 1.0
    volumeSlider.value = allSounds[0].volume || 1.0;

    // Füge einen einmaligen Event-Listener hinzu, der die Lautstärke für alle Sounds ändert
    volumeSlider.addEventListener("input", function() {
        const volume = volumeSlider.value; // Hole den aktuellen Wert des Sliders
        allSounds.forEach(sound => {
            sound.volume = volume; // Setze die Lautstärke für jedes Soundobjekt
        });
    });

    document.activeElement.blur();
}


