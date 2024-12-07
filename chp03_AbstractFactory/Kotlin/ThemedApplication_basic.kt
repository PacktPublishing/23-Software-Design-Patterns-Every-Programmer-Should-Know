// Abstract Products
interface Button {
    fun render()
}

interface TextBox {
    fun render()
}

// Concrete Products for Light Theme
class LightButton : Button {
    override fun render() {
        println("Rendering a Light Button")
    }
}

class LightTextBox : TextBox {
    override fun render() {
        println("Rendering a Light TextBox")
    }
}

// Concrete Products for Dark Theme
class DarkButton : Button {
    override fun render() {
        println("Rendering a Dark Button")
    }
}

class DarkTextBox : TextBox {
    override fun render() {
        println("Rendering a Dark TextBox")
    }
}

// Abstract Factory
interface ThemeFactory {
    fun createButton(): Button
    fun createTextBox(): TextBox
}

// Concrete Factories for Light Theme
class LightThemeFactory : ThemeFactory {
    override fun createButton(): Button {
        return LightButton()
    }

    override fun createTextBox(): TextBox {
        return LightTextBox()
    }
}

// Concrete Factories for Dark Theme
class DarkThemeFactory : ThemeFactory {
    override fun createButton(): Button {
        return DarkButton()
    }

    override fun createTextBox(): TextBox {
        return DarkTextBox()
    }
}

// Client Code
class ThemedApplication(private val factory: ThemeFactory) {
    fun renderUI() {
        val button = factory.createButton()
        val textBox = factory.createTextBox()
        button.render()
        textBox.render()
    }
}

// Usage
fun main() {
    println("Using Light Theme:")
    val lightThemeApp = ThemedApplication(LightThemeFactory())
    lightThemeApp.renderUI()

    println("\nUsing Dark Theme:")
    val darkThemeApp = ThemedApplication(DarkThemeFactory())
    darkThemeApp.renderUI()
}
