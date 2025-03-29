world;



function checkCollisionsEnemies(world) {

    world.level.enemies.forEach((e) => defineResultCollisionsEnemies(world, e, world.level.enemies));
    world.level.smallEnemies.forEach((e) => defineResultCollisionsEnemies(world, e, world.level.smallEnemies));
}

function defineResultCollisionsEnemies(world, e, enemiePath) {
    let isChicken = e instanceof Chicken || e instanceof SmallChicken;
    if (isChicken && isColliding(world.character, e)) {
        checkCollisionsJumpOnEnemies(world, e, enemiePath);
    }
}

function checkCollisionsJumpOnEnemies(world, enemy, enemiePath) {
    let feetOfCharacter = world.character.y + world.character.height;
    let headOfChicken = enemy.y + (enemy.height * 0.6);
    if (feetOfCharacter <= headOfChicken) {
        world.deadChicken(enemy, enemiePath);
    }
}

function isColliding(character, enemy) {
    return character.x + character.width > enemy.x &&
        character.y + character.height > enemy.y &&
        character.x < enemy.x + enemy.width &&
        character.y < enemy.y + enemy.height;
}

function checkCollisions() {
    world.level.enemies.forEach((enemy) => {
        if (world.character.isColliding(enemy)) {
            world.character.hit(5);
            world.statusBar.setPercentage(world.character.energy);
        }
    });
    world.level.smallEnemies.forEach((enemy) => {
        if (world.character.isColliding(enemy)) {
            world.character.hit(5);
            world.statusBar.setPercentage(world.character.energy);
        }
    });
    world.level.endboss.forEach((enemy) => {
        if (world.character.isColliding(enemy)) {
            world.character.hit(5);
            world.statusBar.setPercentage(world.character.energy);
        }
    });
}