/**
 * Global reference to the game world.
 * @type {World}
 */
world;

/**
 * Timestamp of the last jump on an enemy.
 * @type {number}
 */
let lastJumpOnEnemy = 0;

/**
 * Checks collisions between the character and all enemies (normal & small).
 * @param {World} world - The current game world.
 */
function checkCollisionsEnemies(world) {
    world.level.enemies.forEach((e) =>
        defineResultCollisionsEnemies(world, e, world.level.enemies)
    );
    world.level.smallEnemies.forEach((e) =>
        defineResultCollisionsEnemies(world, e, world.level.smallEnemies)
    );
}

/**
 * Defines the result of a collision between the character and an enemy.
 * @param {World} world - The current game world.
 * @param {Chicken|SmallChicken} e - The enemy object.
 * @param {Array<Chicken|SmallChicken>} enemiePath - The list of enemies the object belongs to.
 */
function defineResultCollisionsEnemies(world, e, enemiePath) {
    let isChicken = e instanceof Chicken || e instanceof SmallChicken;
    if (isChicken && isColliding(world.character, e)) {
        checkCollisionsJumpOnEnemies(world, e, enemiePath);
    }
}

/**
 * Checks if the character has jumped on an enemy from above.
 * If true, the enemy is eliminated.
 * @param {World} world - The current game world.
 * @param {Chicken|SmallChicken} enemy - The enemy involved in the collision.
 * @param {Array<Chicken|SmallChicken>} enemiePath - The list from which the enemy will be removed.
 */
function checkCollisionsJumpOnEnemies(world, enemy, enemiePath) {
    let feetOfCharacter = world.character.y + world.character.height;
    let headOfChicken = enemy.y + (enemy.height * 0.6);
    if (feetOfCharacter <= headOfChicken && world.character.speedY <= 0) {
        lastJumpOnEnemy = new Date().getTime();
        world.deadChicken(enemy, enemiePath);
    }
}

/**
 * Determines whether two objects are colliding.
 * @param {Character} character - The player character.
 * @param {MovableObject} enemy - The enemy object.
 * @returns {boolean} - True if a collision is detected.
 */
function isColliding(character, enemy) {
    return character.x + character.width > enemy.x &&
        character.y + character.height > enemy.y &&
        character.x < enemy.x + enemy.width &&
        character.y < enemy.y + enemy.height;
}

/**
 * Executes all collision checks – for enemies and the end boss.
 * @param {World} world - The current game world.
 */
function checkCollisions(world) {
    collisionEnemies(world.level.enemies);
    collisionEnemies(world.level.smallEnemies);

    if (world.character.isColliding(world.level.endboss)) {
        world.character.hit(5);
        world.statusBar.setPercentage(world.character.energy);
    }
}

/**
 * Applies damage to the character on collision with an enemy.
 * Prevents repeated damage by using a time delay.
 * @param {Array<Chicken|SmallChicken>} key - List of enemies to check against.
 */
function collisionEnemies(key) {
    let actuellTime = new Date().getTime();
    key.forEach((enemy) => {
        if (world.character.isColliding(enemy) && actuellTime - lastJumpOnEnemy > 1500) {
            world.character.hit(5);
            world.statusBar.setPercentage(world.character.energy);
        }
    });
}
