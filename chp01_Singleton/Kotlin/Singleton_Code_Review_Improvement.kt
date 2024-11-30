interface ILogger {
    fun log(message: String)
}

class ConsoleLogger : ILogger {
    override fun log(message: String) {
        println(message)
    }
}

class DataManager(private val logger: ILogger) {
    fun saveData(data: String) {
        logger.log("Saving data: $data")
    }
}

// Usage example with the real logger
fun main() {
    val logger = ConsoleLogger()
    val dataManager = DataManager(logger)
    dataManager.saveData("Sample Data")
}

// Mock example for testing
class MockLogger : ILogger {
    val messages = mutableListOf<String>()
    override fun log(message: String) {
        messages.add(message)
    }
}

// Test example
fun testSaveData() {
    val mockLogger = MockLogger()
    val dataManager = DataManager(mockLogger)
    dataManager.saveData("Test Data")
    assert(mockLogger.messages.contains("Saving data: Test Data"))
}
