#include <iostream>
#include <string>
#include <memory>

// Step 1: Define the Target Interface
// This is the clean, modern interface that the app's UI templates expect.
class ModernUIComponent {
public:
    virtual ~ModernUIComponent() = default;
    virtual void render() const = 0;
    virtual std::unique_ptr<ModernUIComponent> clone() const = 0;
};

// Step 2: Identify the Adaptee
// This is the existing or third-party UI component with an incompatible interface.
class LegacyUIElement {
public:
    void drawOldStyleUI() const {
        std::cout << "Rendering UI using legacy graphics engine..." << std::endl;
    }

    LegacyUIElement* copy() const {
        return new LegacyUIElement(*this);  // Legacy cloning behavior
    }
};

// Step 3: Implement the Adapter
// The adapter implements the modern interface but delegates rendering and cloning to the legacy component.
class UIElementAdapter : public ModernUIComponent {
private:
    std::unique_ptr<LegacyUIElement> legacyElement;

public:
    UIElementAdapter(std::unique_ptr<LegacyUIElement> element)
        : legacyElement(std::move(element)) {}

    void render() const override {
        legacyElement->drawOldStyleUI();
    }

    std::unique_ptr<ModernUIComponent> clone() const override {
        return std::make_unique<UIElementAdapter>(
            std::unique_ptr<LegacyUIElement>(legacyElement->copy())
        );
    }
};

// Step 4: Client Interaction
// This is the modern UI system that expects to work with ModernUIComponent only.
void displayTemplate(const ModernUIComponent& component) {
    std::cout << "Rendering UI Template:" << std::endl;
    component.render();
}

void cloneAndDisplayTemplate(const ModernUIComponent& component) {
    auto clonedComponent = component.clone();
    std::cout << "Rendering Cloned UI Template:" << std::endl;
    clonedComponent->render();
}

// Example Usage
int main() {
    std::unique_ptr<LegacyUIElement> legacyElement = std::make_unique<LegacyUIElement>();

    // Wrap the legacy element inside an adapter
    UIElementAdapter adapter(std::move(legacyElement));

    // Modern UI system works only with ModernUIComponent
    displayTemplate(adapter);
    cloneAndDisplayTemplate(adapter);

    return 0;
}