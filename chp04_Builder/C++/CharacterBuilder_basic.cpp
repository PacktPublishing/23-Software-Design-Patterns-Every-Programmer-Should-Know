#include <iostream>
#include <vector>
#include <string>
#include <sstream>

// Step 1: Define the Product
class Character {
public:
    std::string name;
    std::string race;
    std::string characterClass;
    std::vector<std::string> abilities;
    std::vector<std::string> equipment;

    std::string toString() const {
        std::ostringstream oss;
        oss << "Character:\n"
            << "Name: " << name << "\n"
            << "Race: " << race << "\n"
            << "Class: " << characterClass << "\n"
            << "Abilities: ";
        for (const auto& ability : abilities) oss << ability << ", ";
        oss << "\nEquipment: ";
        for (const auto& item : equipment) oss << item << ", ";
        oss << "\n";
        return oss.str();
    }
};

// Step 2: Create the Builder Interface
class CharacterBuilder {
public:
    virtual ~CharacterBuilder() = default;
    virtual CharacterBuilder* setName(const std::string& name) = 0;
    virtual CharacterBuilder* setRace(const std::string& race) = 0;
    virtual CharacterBuilder* setClass(const std::string& characterClass) = 0;
    virtual CharacterBuilder* addAbility(const std::string& ability) = 0;
    virtual CharacterBuilder* addEquipment(const std::string& equipment) = 0;
    virtual Character* build() = 0;
};

// Step 3: Implement Concrete Builders
class WarriorBuilder : public CharacterBuilder {
private:
    Character* character;

public:
    WarriorBuilder() { character = new Character(); }

    CharacterBuilder* setName(const std::string& name) override {
        character->name = name;
        return this;
    }

    CharacterBuilder* setRace(const std::string& race) override {
        character->race = race;
        return this;
    }

    CharacterBuilder* setClass(const std::string& characterClass) override {
        character->characterClass = "Warrior";
        return this;
    }

    CharacterBuilder* addAbility(const std::string& ability) override {
        character->abilities.push_back(ability);
        return this;
    }

    CharacterBuilder* addEquipment(const std::string& equipment) override {
        character->equipment.push_back(equipment);
        return this;
    }

    Character* build() override {
        return character;
    }
};

class MageBuilder : public CharacterBuilder {
private:
    Character* character;

public:
    MageBuilder() { character = new Character(); }

    CharacterBuilder* setName(const std::string& name) override {
        character->name = name;
        return this;
    }

    CharacterBuilder* setRace(const std::string& race) override {
        character->race = race;
        return this;
    }

    CharacterBuilder* setClass(const std::string& characterClass) override {
        character->characterClass = "Mage";
        return this;
    }

    CharacterBuilder* addAbility(const std::string& ability) override {
        character->abilities.push_back(ability);
        return this;
    }

    CharacterBuilder* addEquipment(const std::string& equipment) override {
        character->equipment.push_back(equipment);
        return this;
    }

    Character* build() override {
        return character;
    }
};

// Step 4: Create the Director
class CharacterDirector {
private:
    CharacterBuilder* builder;

public:
    CharacterDirector(CharacterBuilder* builder) : builder(builder) {}

    Character* createWarriorCharacter() {
        return builder
            ->setName("Thorin")
            ->setRace("Dwarf")
            ->setClass("Warrior")
            ->addAbility("Strong Attack")
            ->addAbility("Shield Block")
            ->addEquipment("Battle Axe")
            ->addEquipment("Heavy Armor")
            ->build();
    }

    Character* createMageCharacter() {
        return builder
            ->setName("Gandalf")
            ->setRace("Elf")
            ->setClass("Mage")
            ->addAbility("Fireball")
            ->addAbility("Teleport")
            ->addEquipment("Staff")
            ->addEquipment("Robe")
            ->build();
    }
};

// Step 5: Client Code
int main() {
    // Create a Warrior
    WarriorBuilder warriorBuilder;
    CharacterDirector warriorDirector(&warriorBuilder);
    Character* warrior = warriorDirector.createWarriorCharacter();
    std::cout << warrior->toString();

    // Create a Mage
    MageBuilder mageBuilder;
    CharacterDirector mageDirector(&mageBuilder);
    Character* mage = mageDirector.createMageCharacter();
    std::cout << mage->toString();

    // Clean up
    delete warrior;
    delete mage;

    return 0;
}
