import Foundation

// Abstract Products
protocol Button {
    func render()
}

protocol TextBox {
    func render()
}

// Concrete Products for Light Theme
class LightButton: Button {
    func render() {
        print("Rendering a Light Button")
    }
}

class LightTextBox: TextBox {
    func render() {
        print("Rendering a Light TextBox")
    }
}

// Concrete Products for Dark Theme
class DarkButton: Button {
    func render() {
        print("Rendering a Dark Button")
    }
}

class DarkTextBox: TextBox {
    func render() {
        print("Rendering a Dark TextBox")
    }
}

// Abstract Factory
protocol ThemeFactory {
    func createButton() -> Button
    func createTextBox() -> TextBox
}

// Concrete Factory for Light Theme
class LightThemeFactory: ThemeFactory {
    func createButton() -> Button {
        return LightButton()
    }
    
    func createTextBox() -> TextBox {
        return LightTextBox()
    }
}

// Concrete Factory for Dark Theme
class DarkThemeFactory: ThemeFactory {
    func createButton() -> Button {
        return DarkButton()
    }
    
    func createTextBox() -> TextBox {
        return DarkTextBox()
    }
}

// Client Code
class ThemedApplication {
    private let factory: ThemeFactory
    
    init(factory: ThemeFactory) {
        self.factory = factory
    }
    
    func renderUI() {
        let button = factory.createButton()
        let textBox = factory.createTextBox()
        
        button.render()
        textBox.render()
    }
}

// Usage
print("Using Light Theme:")
let lightApp = ThemedApplication(factory: LightThemeFactory())
lightApp.renderUI()

print("\nUsing Dark Theme:")
let darkApp = ThemedApplication(factory: DarkThemeFactory())
darkApp.renderUI()
