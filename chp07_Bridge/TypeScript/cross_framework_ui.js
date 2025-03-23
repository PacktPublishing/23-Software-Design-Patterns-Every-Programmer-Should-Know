var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Step 2: Concrete Implementors for different frameworks
var ReactButtonRenderer = /** @class */ (function () {
    function ReactButtonRenderer() {
    }
    ReactButtonRenderer.prototype.render = function (label) {
        console.log("<ReactButton label=\"".concat(label, "\" /> rendered in React"));
    };
    return ReactButtonRenderer;
}());
var AngularButtonRenderer = /** @class */ (function () {
    function AngularButtonRenderer() {
    }
    AngularButtonRenderer.prototype.render = function (label) {
        console.log("<app-button label=\"".concat(label, "\"></app-button> rendered in Angular"));
    };
    return AngularButtonRenderer;
}());
var VueButtonRenderer = /** @class */ (function () {
    function VueButtonRenderer() {
    }
    VueButtonRenderer.prototype.render = function (label) {
        console.log("<vue-button label=\"".concat(label, "\"></vue-button> rendered in Vue"));
    };
    return VueButtonRenderer;
}());
// Step 3: Define the Abstraction
var Button = /** @class */ (function () {
    function Button(renderer) {
        this.renderer = renderer;
    }
    return Button;
}());
// Step 4: Refined Abstractions
var PrimaryButton = /** @class */ (function (_super) {
    __extends(PrimaryButton, _super);
    function PrimaryButton(label, renderer) {
        var _this = _super.call(this, renderer) || this;
        _this.label = label;
        return _this;
    }
    PrimaryButton.prototype.render = function () {
        console.log("Rendering a primary button:");
        this.renderer.render(this.label);
    };
    return PrimaryButton;
}(Button));
var SecondaryButton = /** @class */ (function (_super) {
    __extends(SecondaryButton, _super);
    function SecondaryButton(label, renderer) {
        var _this = _super.call(this, renderer) || this;
        _this.label = label;
        return _this;
    }
    SecondaryButton.prototype.render = function () {
        console.log("Rendering a secondary button:");
        this.renderer.render(this.label);
    };
    return SecondaryButton;
}(Button));
// Step 5 & 6: Client code
var reactRenderer = new ReactButtonRenderer();
var angularRenderer = new AngularButtonRenderer();
var vueRenderer = new VueButtonRenderer();
var reactPrimaryButton = new PrimaryButton("Submit", reactRenderer);
var angularSecondaryButton = new SecondaryButton("Cancel", angularRenderer);
var vuePrimaryButton = new PrimaryButton("Save", vueRenderer);
reactPrimaryButton.render();
angularSecondaryButton.render();
vuePrimaryButton.render();
