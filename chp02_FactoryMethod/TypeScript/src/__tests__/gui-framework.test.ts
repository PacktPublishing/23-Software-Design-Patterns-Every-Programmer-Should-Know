// Import classes from your GUI framework implementation
import {
  Dialog,
  Button,
  WindowsButton,
  MacButton,
  WindowsDialog,
  MacDialog,
  getDialog,
} from '../gui-framework'; // Adjust the path to your implementation file

describe('GUI Framework Factory Tests', () => {
  // MARK: Factory Method Validation

  test('WindowsDialog creates a WindowsButton', () => {
    const factory = new WindowsDialog();
    const button = factory.createButton();
    expect(button).toBeInstanceOf(WindowsButton);
  });

  test('MacDialog creates a MacButton', () => {
    const factory = new MacDialog();
    const button = factory.createButton();
    expect(button).toBeInstanceOf(MacButton);
  });

  // MARK: Client Code Tests

  test('Client retrieves correct dialog dynamically', () => {
    const dialog = getDialog('Windows');
    expect(dialog).toBeInstanceOf(WindowsDialog);
    dialog.render(); // Ensure rendering works without errors
  });

  test('Invalid OS type throws an error', () => {
    expect(() => getDialog('Linux')).toThrow('Unsupported platform.');
  });

  // MARK: Runtime Flexibility

  test('New dialog type can be added dynamically', () => {
    // Add a new dialog and button
    class LinuxButton implements Button {
      render(): void {
        console.log('Rendering a Linux-style button.');
      }
    }

    class LinuxDialog extends Dialog {
      createButton(): Button {
        return new LinuxButton();
      }
    }

    // Test the new dialog
    const factory = new LinuxDialog();
    const button = factory.createButton();
    expect(button).toBeInstanceOf(LinuxButton);
    factory.render(); // Ensure the new dialog works as expected
  });

  // MARK: Edge Case Tests

  test('Dialog handles rendering without exceptions', () => {
    const dialog = new MacDialog();
    expect(() => dialog.render()).not.toThrow();
  });

  test('Dialog handles empty or null input gracefully', () => {
    expect(() => getDialog('')).toThrow('Unsupported platform.');
    expect(() => getDialog(null as unknown as string)).toThrow('Unsupported platform.');
  });

  // MARK: Pitfall Mitigation

  test('Factories avoid tight coupling to specific implementations', () => {
    const dialog = new WindowsDialog();
    const button = dialog.createButton();
    expect(button).toBeDefined(); // Ensure an object is created
    expect(typeof button.render).toBe('function'); // Ensure it adheres to the Button interface
  });

  test('Adding new button type does not break existing dialogs', () => {
    // Add a new dialog and button
    class CustomButton implements Button {
      render(): void {
        console.log('Rendering a Custom-style button.');
      }
    }

    class CustomDialog extends Dialog {
      createButton(): Button {
        return new CustomButton();
      }
    }

    // Ensure existing dialogs remain functional
    const windowsDialog = new WindowsDialog();
    const windowsButton = windowsDialog.createButton();
    expect(windowsButton).toBeInstanceOf(WindowsButton);

    // Test the new dialog
    const customDialog = new CustomDialog();
    const customButton = customDialog.createButton();
    expect(customButton).toBeInstanceOf(CustomButton);
    customDialog.render();
  });
});
