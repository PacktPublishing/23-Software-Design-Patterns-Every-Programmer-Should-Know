object DatabaseConnection {

    init {
        // Initialize the database connection here
        println("Database connection initialized")
    }

    fun executeQuery(query: String): String {
        // Execute the query and return the result
        println("Executing query: $query")
        return "Query executed successfully"
    }
}

// Test class using Dependency Injection
class DatabaseConnectionTest(private val databaseConnection: DatabaseConnection) {
    fun runTest() {
        // Example test case: execute a query
        val result = databaseConnection.executeQuery("SELECT * FROM test_table")
        println("Test Query Result: $result")
    }
}

fun main() {
    val dbInstance = DatabaseConnection
    val result = dbInstance.executeQuery("SELECT * FROM users")
    println(result)

    // Dependency Injection Example
    val dbTest = DatabaseConnectionTest(dbInstance)
    dbTest.runTest()
}
