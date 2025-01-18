"use strict";
// Implement Concrete Prototypes
class UIComponent {
    constructor(type, text, styles, events) {
        this.type = type;
        this.text = text;
        this.styles = styles;
        this.events = events;
    }
    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), JSON.parse(JSON.stringify(this)) // Deep copy for nested objects
        );
    }
    render() {
        const styleString = Object.entries(this.styles)
            .map(([key, value]) => `${key}: ${value}`)
            .join("; ");
        return `<${this.type} style="${styleString}">${this.text}</${this.type}>`;
    }
}
// Add a Prototype Registry (Optional)
class PrototypeRegistry {
    constructor() {
        this.prototypes = {};
    }
    register(name, prototype) {
        this.prototypes[name] = prototype;
    }
    get(name) {
        if (!this.prototypes[name]) {
            throw new Error(`Prototype with name "${name}" not found`);
        }
        return this.prototypes[name].clone();
    }
}
// Client Interaction
(() => {
    // Define base UI components
    const buttonPrototype = new UIComponent("button", "Click Me", { background: "blue", color: "white", padding: "10px" }, { onClick: () => console.log("Button clicked!") });
    const cardPrototype = new UIComponent("div", "Card Content", { border: "1px solid gray", padding: "20px", borderRadius: "5px" }, {});
    // Register prototypes
    const registry = new PrototypeRegistry();
    registry.register("button", buttonPrototype);
    registry.register("card", cardPrototype);
    // Clone and customize components at runtime
    const customButton = registry.get("button");
    customButton.text = "Submit";
    customButton.styles.background = "green";
    const customCard = registry.get("card");
    customCard.styles.border = "2px solid black";
    customCard.text = "Custom Card Content";
    // Render the components
    console.log("Custom Button HTML:", customButton.render());
    console.log("Custom Card HTML:", customCard.render());
})();
