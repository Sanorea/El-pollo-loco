class level {
    enemies;
    clouds;
    coins;
    bottles;
    backgroundObjects;
    endboss;
    level_end_x = 2200;

    constructor(enemies, clouds, coins, backgroundObjects, bottles, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.endboss = endboss;
    }
}