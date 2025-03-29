world;



function checkCollisionsEnemies(world) {
    world.level.enemies.forEach((e) => defineResultCollisionsEnemies(world, e));
    world.level.smallEnemies.forEach((e) => defineResultCollisionsEnemies(world, e));
}

function defineResultCollisionsEnemies(world, e) {
    let isChicken = e instanceof Chicken || e instanceof SmallChicken;
    if (isChicken && isColliding(world.character, e)) {
        checkCollisionsJumpOnEnemies(world, e);
    }
}

function checkCollisionsJumpOnEnemies(world, enemy) {
    let feetOfCharacter = world.character.y + world.character.height;
    let headOfChicken = enemy.y + (enemy.height * 0.6);
    if (feetOfCharacter <= headOfChicken) {
        world.deadChicken(enemy);
    }
}

function isColliding(character, enemy) {
    return character.x + character.width > enemy.x &&
        character.y + character.height > enemy.y &&
        character.x < enemy.x + enemy.width &&
        character.y < enemy.y + enemy.height;
}