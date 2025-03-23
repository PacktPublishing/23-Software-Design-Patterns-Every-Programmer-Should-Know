import Foundation

// Step 1: Define the Implementor protocol
protocol Renderer {
    func drawButton(label: String)
    func drawChart(dataPoints: [Int])
}

// Step 2: Concrete Implementors
class UIKitRenderer: Renderer {
    func drawButton(label: String) {
        print("Drawing button with label '\(label)' using UIKit.")
    }
    
    func drawChart(dataPoints: [Int]) {
        print("Rendering chart with data points \(dataPoints) using UIKit.")
    }
}

class AppKitRenderer: Renderer {
    func drawButton(label: String) {
        print("Drawing button with label '\(label)' using AppKit.")
    }
    
    func drawChart(dataPoints: [Int]) {
        print("Rendering chart with data points \(dataPoints) using AppKit.")
    }
}

// Step 3: Define the Abstraction
class UIControl {
    var renderer: Renderer
    
    init(renderer: Renderer) {
        self.renderer = renderer
    }
    
    func render() {
        // Default implementation does nothing
    }
}

// Step 4: Refined Abstractions
class CustomButton: UIControl {
    var label: String
    
    init(label: String, renderer: Renderer) {
        self.label = label
        super.init(renderer: renderer)
    }
    
    override func render() {
        renderer.drawButton(label: label)
    }
}

class CustomChart: UIControl {
    var dataPoints: [Int]
    
    init(dataPoints: [Int], renderer: Renderer) {
        self.dataPoints = dataPoints
        super.init(renderer: renderer)
    }
    
    override func render() {
        renderer.drawChart(dataPoints: dataPoints)
    }
}

// Step 5 & 6: Client code
let uiKitRenderer = UIKitRenderer()
let appKitRenderer = AppKitRenderer()

let iosButton = CustomButton(label: "Submit", renderer: uiKitRenderer)
let macChart = CustomChart(dataPoints: [10, 20, 30, 40], renderer: appKitRenderer)

iosButton.render()
macChart.render()