// Define the Prototype Interface
interface Prototype<T> {
    fun clone(): T
}

// Implement Concrete Prototypes
data class MobileScreenTemplate(
    var name: String,
    var backgroundColor: String,
    var font: String,
    var hasHeader: Boolean,
    var hasFooter: Boolean
) : Prototype<MobileScreenTemplate> {
    override fun clone(): MobileScreenTemplate {
        return this.copy()
    }

    override fun toString(): String {
        return "MobileScreenTemplate(name='$name', backgroundColor='$backgroundColor', font='$font', hasHeader=$hasHeader, hasFooter=$hasFooter)"
    }
}

// Add a Prototype Registry (Optional)
class PrototypeRegistry {
    private val templates = mutableMapOf<String, MobileScreenTemplate>()

    fun registerTemplate(key: String, template: MobileScreenTemplate) {
        templates[key] = template
    }

    fun getTemplate(key: String): MobileScreenTemplate {
        return templates[key]?.clone() ?: throw IllegalArgumentException("Template with key '$key' not found.")
    }
}

// Client Interaction
fun main() {
    // Define base templates
    val homeScreen = MobileScreenTemplate(
        name = "Home Screen",
        backgroundColor = "White",
        font = "Roboto",
        hasHeader = true,
        hasFooter = true
    )

    val settingsScreen = MobileScreenTemplate(
        name = "Settings Screen",
        backgroundColor = "Gray",
        font = "Arial",
        hasHeader = true,
        hasFooter = false
    )

    // Register templates in the PrototypeRegistry
    val registry = PrototypeRegistry()
    registry.registerTemplate("home", homeScreen)
    registry.registerTemplate("settings", settingsScreen)

    // Clone and customize templates at runtime
    val customHomeScreen = registry.getTemplate("home").apply {
        backgroundColor = "Light Blue"
        hasFooter = false
    }

    val customSettingsScreen = registry.getTemplate("settings").apply {
        font = "Verdana"
    }

    // Display the cloned and customized templates
    println(customHomeScreen)
    println(customSettingsScreen)
}
