import * as readline from "readline";

// Button interface (Product)
interface Button {
  render(): void;
}

// Concrete Product for Windows
class WindowsButton implements Button {
  render(): void {
    console.log("Rendering a Windows-style button.");
  }
}

// Concrete Product for Mac
class MacButton implements Button {
  render(): void {
    console.log("Rendering a Mac-style button.");
  }
}

// Creator (Abstract)
abstract class Dialog {
  abstract createButton(): Button;

  render(): void {
    const button = this.createButton(); // Factory Method
    button.render();
  }
}

// Concrete Creator for Windows
class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton();
  }
}

// Concrete Creator for Mac
class MacDialog extends Dialog {
  createButton(): Button {
    return new MacButton();
  }
}

// Factory method to decide the dialog type based on the platform
function getDialog(platform: string): Dialog {
  if (platform === "Windows") {
    return new WindowsDialog();
  } else if (platform === "Mac") {
    return new MacDialog();
  } else {
    throw new Error("Unsupported platform.");
  }
}

// Client code
function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter your platform (Windows/Mac): ", (platform) => {
    try {
      const dialog = getDialog(platform.trim());
      dialog.render();
    } catch (error) {
      console.error(error.message);
    } finally {
      rl.close();
    }
  });
}

main();
