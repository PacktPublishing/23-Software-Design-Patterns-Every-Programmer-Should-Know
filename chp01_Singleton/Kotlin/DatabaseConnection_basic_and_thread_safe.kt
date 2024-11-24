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

fun main() {
    val dbInstance = DatabaseConnection
    val result = dbInstance.executeQuery("SELECT * FROM users")
    println(result)
}