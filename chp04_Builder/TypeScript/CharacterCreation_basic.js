// Step 1: Define the Product
var Character = /** @class */ (function () {
    function Character() {
        this.name = "";
        this.race = "";
        this.characterClass = "";
        this.abilities = [];
        this.equipment = [];
    }
    Character.prototype.toString = function () {
        return "\n        Character:\n        Name: ".concat(this.name, "\n        Race: ").concat(this.race, "\n        Class: ").concat(this.characterClass, "\n        Abilities: ").concat(this.abilities.join(", "), "\n        Equipment: ").concat(this.equipment.join(", "), "\n        ");
    };
    return Character;
}());
// Step 3: Implement Concrete Builders
var WarriorBuilder = /** @class */ (function () {
    function WarriorBuilder() {
        this.character = new Character();
    }
    WarriorBuilder.prototype.setName = function (name) {
        this.character.name = name;
        return this;
    };
    WarriorBuilder.prototype.setRace = function (race) {
        this.character.race = race;
        return this;
    };
    WarriorBuilder.prototype.setClass = function (characterClass) {
        this.character.characterClass = "Warrior";
        return this;
    };
    WarriorBuilder.prototype.addAbility = function (ability) {
        this.character.abilities.push(ability);
        return this;
    };
    WarriorBuilder.prototype.addEquipment = function (item) {
        this.character.equipment.push(item);
        return this;
    };
    WarriorBuilder.prototype.build = function () {
        return this.character;
    };
    return WarriorBuilder;
}());
var MageBuilder = /** @class */ (function () {
    function MageBuilder() {
        this.character = new Character();
    }
    MageBuilder.prototype.setName = function (name) {
        this.character.name = name;
        return this;
    };
    MageBuilder.prototype.setRace = function (race) {
        this.character.race = race;
        return this;
    };
    MageBuilder.prototype.setClass = function (characterClass) {
        this.character.characterClass = "Mage";
        return this;
    };
    MageBuilder.prototype.addAbility = function (ability) {
        this.character.abilities.push(ability);
        return this;
    };
    MageBuilder.prototype.addEquipment = function (item) {
        this.character.equipment.push(item);
        return this;
    };
    MageBuilder.prototype.build = function () {
        return this.character;
    };
    return MageBuilder;
}());
// Step 4: Create the Director
var CharacterDirector = /** @class */ (function () {
    function CharacterDirector(builder) {
        this.builder = builder;
    }
    CharacterDirector.prototype.createWarriorCharacter = function () {
        return this.builder
            .setName("Thorin")
            .setRace("Dwarf")
            .setClass("Warrior")
            .addAbility("Strong Attack")
            .addAbility("Shield Block")
            .addEquipment("Battle Axe")
            .addEquipment("Heavy Armor")
            .build();
    };
    CharacterDirector.prototype.createMageCharacter = function () {
        return this.builder
            .setName("Gandalf")
            .setRace("Elf")
            .setClass("Mage")
            .addAbility("Fireball")
            .addAbility("Teleport")
            .addEquipment("Staff")
            .addEquipment("Robe")
            .build();
    };
    return CharacterDirector;
}());
// Step 5: Client Code
var warriorBuilder = new WarriorBuilder();
var mageBuilder = new MageBuilder();
var director1 = new CharacterDirector(warriorBuilder);
var warrior = director1.createWarriorCharacter();
console.log(warrior.toString());
var director2 = new CharacterDirector(mageBuilder);
var mage = director2.createMageCharacter();
console.log(mage.toString());
