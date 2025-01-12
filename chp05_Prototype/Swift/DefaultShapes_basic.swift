import Foundation

// Define the Prototype Protocol
protocol Shape: AnyObject {
    func clone() -> Shape
    func draw() -> String
}

// Implement Concrete Prototypes
class Circle: Shape {
    var radius: Double
    var color: String

    init(radius: Double, color: String) {
        self.radius = radius
        self.color = color
    }

    func clone() -> Shape {
        return Circle(radius: self.radius, color: self.color)
    }

    func draw() -> String {
        return "Drawing a \(color) circle with radius \(radius)"
    }
}

class Rectangle: Shape {
    var width: Double
    var height: Double
    var color: String

    init(width: Double, height: Double, color: String) {
        self.width = width
        self.height = height
        self.color = color
    }

    func clone() -> Shape {
        return Rectangle(width: self.width, height: self.height, color: self.color)
    }

    func draw() -> String {
        return "Drawing a \(color) rectangle with width \(width) and height \(height)"
    }
}

// Add a Prototype Registry
class ShapeRegistry {
    private var shapes: [String: Shape] = [:]

    func registerShape(key: String, shape: Shape) {
        shapes[key] = shape
    }

    func getShape(key: String) -> Shape? {
        guard let shape = shapes[key] else { return nil }
        return shape.clone()
    }
}

// Client Interaction
func main() {
    // Create initial shapes
    let defaultCircle = Circle(radius: 10.0, color: "Red")
    let defaultRectangle = Rectangle(width: 20.0, height: 15.0, color: "Blue")

    // Register shapes in the registry
    let shapeRegistry = ShapeRegistry()
    shapeRegistry.registerShape(key: "circle", shape: defaultCircle)
    shapeRegistry.registerShape(key: "rectangle", shape: defaultRectangle)

    // Clone shapes from the registry and customize
    if let clonedCircle = shapeRegistry.getShape(key: "circle") as? Circle {
        clonedCircle.color = "Green"
        print(clonedCircle.draw()) // Output: Drawing a Green circle with radius 10.0
    }

    if let clonedRectangle = shapeRegistry.getShape(key: "rectangle") as? Rectangle {
        clonedRectangle.width = 25.0
        clonedRectangle.color = "Yellow"
        print(clonedRectangle.draw()) // Output: Drawing a Yellow rectangle with width 25.0 and height 15.0
    }

    // Draw the default shapes (unaltered)
    print(defaultCircle.draw()) // Output: Drawing a Red circle with radius 10.0
    print(defaultRectangle.draw()) // Output: Drawing a Blue rectangle with width 20.0 and height 15.0
}

// Run the main function
main()
