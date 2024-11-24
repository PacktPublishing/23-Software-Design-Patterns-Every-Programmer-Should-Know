// Interface for Button (Product)
export interface Button {
  render(): void;
}

// Concrete Product: Windows Button
export class WindowsButton implements Button {
  render(): void {
    console.log("Rendering a Windows-style button.");
  }
}

// Concrete Product: Mac Button
export class MacButton implements Button {
  render(): void {
    console.log("Rendering a Mac-style button.");
  }
}

// Abstract Creator: Dialog
export abstract class Dialog {
  // Factory method to create a button
  abstract createButton(): Button;

  // High-level method using the factory method
  render(): void {
    const button = this.createButton();
    button.render();
  }
}

// Concrete Creator: Windows Dialog
export class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton();
  }
}

// Concrete Creator: Mac Dialog
export class MacDialog extends Dialog {
  createButton(): Button {
    return new MacButton();
  }
}

// Helper function to get the appropriate dialog dynamically
export function getDialog(platform: string): Dialog {
  if (platform === "Windows") {
    return new WindowsDialog();
  } else if (platform === "Mac") {
    return new MacDialog();
  } else {
    throw new Error("Unsupported platform.");
  }
}
