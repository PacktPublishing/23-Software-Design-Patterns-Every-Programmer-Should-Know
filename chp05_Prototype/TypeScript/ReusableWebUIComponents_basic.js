// Implement Concrete Prototypes
var UIComponent = /** @class */ (function () {
    function UIComponent(type, text, styles, events) {
        this.type = type;
        this.text = text;
        this.styles = styles;
        this.events = events;
    }
    UIComponent.prototype.clone = function () {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), JSON.parse(JSON.stringify(this)) // Deep copy for nested objects
        );
    };
    UIComponent.prototype.render = function () {
        var styleString = Object.entries(this.styles)
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return "".concat(key, ": ").concat(value);
        })
            .join("; ");
        return "<".concat(this.type, " style=\"").concat(styleString, "\">").concat(this.text, "</").concat(this.type, ">");
    };
    return UIComponent;
}());
// Add a Prototype Registry (Optional)
var PrototypeRegistry = /** @class */ (function () {
    function PrototypeRegistry() {
        this.prototypes = {};
    }
    PrototypeRegistry.prototype.register = function (name, prototype) {
        this.prototypes[name] = prototype;
    };
    PrototypeRegistry.prototype.get = function (name) {
        if (!this.prototypes[name]) {
            throw new Error("Prototype with name \"".concat(name, "\" not found"));
        }
        return this.prototypes[name].clone();
    };
    return PrototypeRegistry;
}());
// Client Interaction
(function () {
    // Define base UI components
    var buttonPrototype = new UIComponent("button", "Click Me", { background: "blue", color: "white", padding: "10px" }, { onClick: function () { return console.log("Button clicked!"); } });
    var cardPrototype = new UIComponent("div", "Card Content", { border: "1px solid gray", padding: "20px", borderRadius: "5px" }, {});
    // Register prototypes
    var registry = new PrototypeRegistry();
    registry.register("button", buttonPrototype);
    registry.register("card", cardPrototype);
    // Clone and customize components at runtime
    var customButton = registry.get("button");
    customButton.text = "Submit";
    customButton.styles.background = "green";
    var customCard = registry.get("card");
    customCard.styles.border = "2px solid black";
    customCard.text = "Custom Card Content";
    // Render the components
    console.log("Custom Button HTML:", customButton.render());
    console.log("Custom Card HTML:", customCard.render());
})();
