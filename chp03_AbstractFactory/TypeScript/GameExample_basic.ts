// Abstract Products
interface Enemy {
    attack(): void;
}

interface Obstacle {
    block(): void;
}

interface PowerUp {
    apply(): void;
}

// Concrete Products for Forest Level
class ForestEnemy implements Enemy {
    attack(): void {
        console.log("Forest enemy attacks with vines!");
    }
}

class ForestObstacle implements Obstacle {
    block(): void {
        console.log("Forest obstacle blocks the path with a fallen tree!");
    }
}

class ForestPowerUp implements PowerUp {
    apply(): void {
        console.log("Forest power-up restores health using a magical fruit!");
    }
}

// Concrete Products for Desert Level
class DesertEnemy implements Enemy {
    attack(): void {
        console.log("Desert enemy attacks with sandstorm!");
    }
}

class DesertObstacle implements Obstacle {
    block(): void {
        console.log("Desert obstacle blocks the path with quicksand!");
    }
}

class DesertPowerUp implements PowerUp {
    apply(): void {
        console.log("Desert power-up increases stamina with an energy potion!");
    }
}

// Abstract Factory
interface GameLevelFactory {
    createEnemy(): Enemy;
    createObstacle(): Obstacle;
    createPowerUp(): PowerUp;
}

// Concrete Factories for Forest Level
class ForestLevelFactory implements GameLevelFactory {
    createEnemy(): Enemy {
        return new ForestEnemy();
    }
    createObstacle(): Obstacle {
        return new ForestObstacle();
    }
    createPowerUp(): PowerUp {
        return new ForestPowerUp();
    }
}

// Concrete Factories for Desert Level
class DesertLevelFactory implements GameLevelFactory {
    createEnemy(): Enemy {
        return new DesertEnemy();
    }
    createObstacle(): Obstacle {
        return new DesertObstacle();
    }
    createPowerUp(): PowerUp {
        return new DesertPowerUp();
    }
}

// Client Code
class Game {
    private enemy: Enemy;
    private obstacle: Obstacle;
    private powerUp: PowerUp;

    constructor(factory: GameLevelFactory) {
        this.enemy = factory.createEnemy();
        this.obstacle = factory.createObstacle();
        this.powerUp = factory.createPowerUp();
    }

    play(): void {
        console.log("Game starts:");
        this.enemy.attack();
        this.obstacle.block();
        this.powerUp.apply();
    }
}

// Usage
console.log("Playing Forest Level:");
const forestGame = new Game(new ForestLevelFactory());
forestGame.play();

console.log("\nPlaying Desert Level:");
const desertGame = new Game(new DesertLevelFactory());
desertGame.play();
