#include <iostream>
#include <string>
#include <unordered_map>
#include <memory>

// Define the Prototype Interface
class CharacterPrototype {
public:
    virtual ~CharacterPrototype() = default;
    virtual std::unique_ptr<CharacterPrototype> clone() const = 0;
    virtual void display() const = 0;
};

// Implement Concrete Prototypes
class CharacterModel : public CharacterPrototype {
private:
    std::string name;
    std::string texture;
    int polygonCount;

public:
    CharacterModel(std::string name, std::string texture, int polygonCount)
        : name(std::move(name)), texture(std::move(texture)), polygonCount(polygonCount) {}

    // Simulate a costly initialization process
    void loadAssets() {
        std::cout << "Loading assets for " << name << " (texture: " << texture
                  << ", polygons: " << polygonCount << ")...\n";
    }

    // Clone method
    std::unique_ptr<CharacterPrototype> clone() const override {
        return std::make_unique<CharacterModel>(*this);
    }

    // Display method to show character details
    void display() const override {
        std::cout << "Character: " << name << ", Texture: " << texture
                  << ", Polygons: " << polygonCount << "\n";
    }
};

// Add a Prototype Registry (Optional)
class PrototypeRegistry {
private:
    std::unordered_map<std::string, std::unique_ptr<CharacterPrototype>> prototypes;

public:
    void registerPrototype(const std::string& key, std::unique_ptr<CharacterPrototype> prototype) {
        prototypes[key] = std::move(prototype);
    }

    CharacterPrototype* getPrototype(const std::string& key) const {
        auto it = prototypes.find(key);
        if (it != prototypes.end()) {
            return it->second->clone().release();
        }
        throw std::runtime_error("Prototype not found: " + key);
    }
};

// Client Interaction
int main() {
    // Create initial prototypes
    auto warrior = std::make_unique<CharacterModel>("Warrior", "warrior_texture.png", 5000);
    auto mage = std::make_unique<CharacterModel>("Mage", "mage_texture.png", 7000);

    // Simulate loading assets
    warrior->loadAssets();
    mage->loadAssets();

    // Register prototypes
    PrototypeRegistry registry;
    registry.registerPrototype("warrior", std::move(warrior));
    registry.registerPrototype("mage", std::move(mage));

    // Clone and customize character models
    auto clonedWarrior = std::unique_ptr<CharacterPrototype>(registry.getPrototype("warrior"));
    auto clonedMage = std::unique_ptr<CharacterPrototype>(registry.getPrototype("mage"));

    // Display cloned characters
    clonedWarrior->display();
    clonedMage->display();

    return 0;
}
