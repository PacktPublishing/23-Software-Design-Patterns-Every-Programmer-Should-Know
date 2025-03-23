// Step 1: Define the Implementor interface
interface ButtonRenderer {
    render(label: string): void;
}

// Step 2: Concrete Implementors for different frameworks
class ReactButtonRenderer implements ButtonRenderer {
    render(label: string): void {
        console.log(`<ReactButton label="${label}" /> rendered in React`);
    }
}

class AngularButtonRenderer implements ButtonRenderer {
    render(label: string): void {
        console.log(`<app-button label="${label}"></app-button> rendered in Angular`);
    }
}

class VueButtonRenderer implements ButtonRenderer {
    render(label: string): void {
        console.log(`<vue-button label="${label}"></vue-button> rendered in Vue`);
    }
}

// Step 3: Define the Abstraction
abstract class Button {
    protected renderer: ButtonRenderer;

    constructor(renderer: ButtonRenderer) {
        this.renderer = renderer;
    }

    abstract render(): void;
}

// Step 4: Refined Abstractions
class PrimaryButton extends Button {
    private label: string;

    constructor(label: string, renderer: ButtonRenderer) {
        super(renderer);
        this.label = label;
    }

    render(): void {
        console.log("Rendering a primary button:");
        this.renderer.render(this.label);
    }
}

class SecondaryButton extends Button {
    private label: string;

    constructor(label: string, renderer: ButtonRenderer) {
        super(renderer);
        this.label = label;
    }

    render(): void {
        console.log("Rendering a secondary button:");
        this.renderer.render(this.label);
    }
}

// Step 5 & 6: Client code
const reactRenderer = new ReactButtonRenderer();
const angularRenderer = new AngularButtonRenderer();
const vueRenderer = new VueButtonRenderer();

const reactPrimaryButton = new PrimaryButton("Submit", reactRenderer);
const angularSecondaryButton = new SecondaryButton("Cancel", angularRenderer);
const vuePrimaryButton = new PrimaryButton("Save", vueRenderer);

reactPrimaryButton.render();
angularSecondaryButton.render();
vuePrimaryButton.render();