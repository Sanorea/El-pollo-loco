class level {
    enemies;
    smallEnemies;
    clouds;
    coins;
    bottles;
    backgroundObjects;
    endboss;
    level_end_x = 3200;

    constructor(enemies, smallEnemies, clouds, coins, backgroundObjects, bottles, endboss) {
        this.enemies = enemies;
        this.smallEnemies = smallEnemies;
        this.clouds = clouds;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.endboss = endboss;
    }
}