// Concrete Products for Forest Level
var ForestEnemy = /** @class */ (function () {
    function ForestEnemy() {
    }
    ForestEnemy.prototype.attack = function () {
        console.log("Forest enemy attacks with vines!");
    };
    return ForestEnemy;
}());
var ForestObstacle = /** @class */ (function () {
    function ForestObstacle() {
    }
    ForestObstacle.prototype.block = function () {
        console.log("Forest obstacle blocks the path with a fallen tree!");
    };
    return ForestObstacle;
}());
var ForestPowerUp = /** @class */ (function () {
    function ForestPowerUp() {
    }
    ForestPowerUp.prototype.apply = function () {
        console.log("Forest power-up restores health using a magical fruit!");
    };
    return ForestPowerUp;
}());
// Concrete Products for Desert Level
var DesertEnemy = /** @class */ (function () {
    function DesertEnemy() {
    }
    DesertEnemy.prototype.attack = function () {
        console.log("Desert enemy attacks with sandstorm!");
    };
    return DesertEnemy;
}());
var DesertObstacle = /** @class */ (function () {
    function DesertObstacle() {
    }
    DesertObstacle.prototype.block = function () {
        console.log("Desert obstacle blocks the path with quicksand!");
    };
    return DesertObstacle;
}());
var DesertPowerUp = /** @class */ (function () {
    function DesertPowerUp() {
    }
    DesertPowerUp.prototype.apply = function () {
        console.log("Desert power-up increases stamina with an energy potion!");
    };
    return DesertPowerUp;
}());
// Concrete Factories for Forest Level
var ForestLevelFactory = /** @class */ (function () {
    function ForestLevelFactory() {
    }
    ForestLevelFactory.prototype.createEnemy = function () {
        return new ForestEnemy();
    };
    ForestLevelFactory.prototype.createObstacle = function () {
        return new ForestObstacle();
    };
    ForestLevelFactory.prototype.createPowerUp = function () {
        return new ForestPowerUp();
    };
    return ForestLevelFactory;
}());
// Concrete Factories for Desert Level
var DesertLevelFactory = /** @class */ (function () {
    function DesertLevelFactory() {
    }
    DesertLevelFactory.prototype.createEnemy = function () {
        return new DesertEnemy();
    };
    DesertLevelFactory.prototype.createObstacle = function () {
        return new DesertObstacle();
    };
    DesertLevelFactory.prototype.createPowerUp = function () {
        return new DesertPowerUp();
    };
    return DesertLevelFactory;
}());
// Client Code
var Game = /** @class */ (function () {
    function Game(factory) {
        this.enemy = factory.createEnemy();
        this.obstacle = factory.createObstacle();
        this.powerUp = factory.createPowerUp();
    }
    Game.prototype.play = function () {
        console.log("Game starts:");
        this.enemy.attack();
        this.obstacle.block();
        this.powerUp.apply();
    };
    return Game;
}());
// Usage
console.log("Playing Forest Level:");
var forestGame = new Game(new ForestLevelFactory());
forestGame.play();
console.log("\nPlaying Desert Level:");
var desertGame = new Game(new DesertLevelFactory());
desertGame.play();
