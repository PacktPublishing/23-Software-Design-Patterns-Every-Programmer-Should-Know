// Step 1: Define the Product
class Character {
    name: string = "";
    race: string = "";
    characterClass: string = "";
    abilities: string[] = [];
    equipment: string[] = [];

    toString(): string {
        return `
        Character:
        Name: ${this.name}
        Race: ${this.race}
        Class: ${this.characterClass}
        Abilities: ${this.abilities.join(", ")}
        Equipment: ${this.equipment.join(", ")}
        `;
    }
}

// Step 2: Create the Builder Interface
interface CharacterBuilder {
    setName(name: string): CharacterBuilder;
    setRace(race: string): CharacterBuilder;
    setClass(characterClass: string): CharacterBuilder;
    addAbility(ability: string): CharacterBuilder;
    addEquipment(item: string): CharacterBuilder;
    build(): Character;
}

// Step 3: Implement Concrete Builders
class WarriorBuilder implements CharacterBuilder {
    private character: Character;

    constructor() {
        this.character = new Character();
    }

    setName(name: string): CharacterBuilder {
        this.character.name = name;
        return this;
    }

    setRace(race: string): CharacterBuilder {
        this.character.race = race;
        return this;
    }

    setClass(characterClass: string): CharacterBuilder {
        this.character.characterClass = "Warrior";
        return this;
    }

    addAbility(ability: string): CharacterBuilder {
        this.character.abilities.push(ability);
        return this;
    }

    addEquipment(item: string): CharacterBuilder {
        this.character.equipment.push(item);
        return this;
    }

    build(): Character {
        return this.character;
    }
}

class MageBuilder implements CharacterBuilder {
    private character: Character;

    constructor() {
        this.character = new Character();
    }

    setName(name: string): CharacterBuilder {
        this.character.name = name;
        return this;
    }

    setRace(race: string): CharacterBuilder {
        this.character.race = race;
        return this;
    }

    setClass(characterClass: string): CharacterBuilder {
        this.character.characterClass = "Mage";
        return this;
    }

    addAbility(ability: string): CharacterBuilder {
        this.character.abilities.push(ability);
        return this;
    }

    addEquipment(item: string): CharacterBuilder {
        this.character.equipment.push(item);
        return this;
    }

    build(): Character {
        return this.character;
    }
}

// Step 4: Create the Director
class CharacterDirector {
    private builder: CharacterBuilder;

    constructor(builder: CharacterBuilder) {
        this.builder = builder;
    }

    createWarriorCharacter(): Character {
        return this.builder
            .setName("Thorin")
            .setRace("Dwarf")
            .setClass("Warrior")
            .addAbility("Strong Attack")
            .addAbility("Shield Block")
            .addEquipment("Battle Axe")
            .addEquipment("Heavy Armor")
            .build();
    }

    createMageCharacter(): Character {
        return this.builder
            .setName("Gandalf")
            .setRace("Elf")
            .setClass("Mage")
            .addAbility("Fireball")
            .addAbility("Teleport")
            .addEquipment("Staff")
            .addEquipment("Robe")
            .build();
    }
}

// Step 5: Client Code
const warriorBuilder = new WarriorBuilder();
const mageBuilder = new MageBuilder();

const director1 = new CharacterDirector(warriorBuilder);
const warrior = director1.createWarriorCharacter();
console.log(warrior.toString());

const director2 = new CharacterDirector(mageBuilder);
const mage = director2.createMageCharacter();
console.log(mage.toString());
