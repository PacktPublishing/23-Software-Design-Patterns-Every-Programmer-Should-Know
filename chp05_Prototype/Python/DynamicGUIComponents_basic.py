from copy import deepcopy


# Define the Prototype Interface
class Prototype:
    def clone(self):
        raise NotImplementedError("Clone method not implemented.")


# Implement Concrete Prototypes
class Button(Prototype):
    def __init__(self, label, color, width, height):
        self.label = label
        self.color = color
        self.width = width
        self.height = height

    def clone(self):
        return deepcopy(self)

    def __str__(self):
        return f"Button(label='{self.label}', color='{self.color}', width={self.width}, height={self.height})"


class TextBox(Prototype):
    def __init__(self, placeholder, font_size, width):
        self.placeholder = placeholder
        self.font_size = font_size
        self.width = width

    def clone(self):
        return deepcopy(self)

    def __str__(self):
        return f"TextBox(placeholder='{self.placeholder}', font_size={self.font_size}, width={self.width})"


# Add a Prototype Registry (Optional)
class PrototypeRegistry:
    def __init__(self):
        self._prototypes = {}

    def register(self, name, prototype):
        self._prototypes[name] = prototype

    def get(self, name):
        if name in self._prototypes:
            return self._prototypes[name].clone()
        raise ValueError(f"Prototype with name '{name}' not found")


# Client Interaction
if __name__ == "__main__":
    # Create initial prototypes
    default_button = Button("Submit", "blue", 100, 50)
    default_textbox = TextBox("Enter text", 12, 200)

    # Register prototypes
    registry = PrototypeRegistry()
    registry.register("default_button", default_button)
    registry.register("default_textbox", default_textbox)

    # Client clones and customizes prototypes at runtime
    button1 = registry.get("default_button")
    button1.label = "Cancel"
    button1.color = "red"

    button2 = registry.get("default_button")
    button2.width = 120

    textbox1 = registry.get("default_textbox")
    textbox1.placeholder = "Username"

    textbox2 = registry.get("default_textbox")
    textbox2.font_size = 14

    # Display the customized components
    print(button1)
    print(button2)
    print(textbox1)
    print(textbox2)
