import org.testng.annotations.Test
import org.testng.Assert.assertSame
import org.testng.Assert.assertNotNull
import kotlin.concurrent.thread
import java.util.concurrent.CountDownLatch

object DatabaseConnection {
    @Volatile
    private var instance: DatabaseConnection? = null

    init {
        // Initialize the database connection here
        println("Database connection initialized")
    }

    fun executeQuery(query: String): String {
        // Execute the query and return the result
        println("Executing query: $query")
        return "Query executed successfully"
    }

    @Synchronized
    fun resetInstance() {
        instance = null
        println("Database connection instance reset for testing purposes")
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

import org.testng.annotations.BeforeMethod

class DatabaseConnectionThreadSafetyTest {
    @BeforeMethod
    fun setup() {
        DatabaseConnection.resetInstance()
    }
    @Test
    fun testSingletonInstanceWithMultipleThreads() {
        val latch = CountDownLatch(10)
        val instances = mutableListOf<DatabaseConnection>()

        for (i in 1..10) {
            thread {
                val instance = DatabaseConnection
                synchronized(instances) {
                    instances.add(instance)
                }
                latch.countDown()
            }
        }

        latch.await()

        val firstInstance = instances.first()
        instances.forEach { instance ->
            assertSame("All instances should be the same", firstInstance, instance)
        }
        assertNotNull("Singleton instance should not be null", firstInstance)
    }
}

fun main() {
    val dbInstance = DatabaseConnection
    val result = dbInstance.executeQuery("SELECT * FROM users")
    println(result)

    // Dependency Injection Example
    val dbTest = DatabaseConnectionTest(dbInstance)
    dbTest.runTest()

    // Reset the Singleton Instance for Testing Purposes
    DatabaseConnection.resetInstance()
    val dbInstance2 = DatabaseConnection
    val result2 = dbInstance2.executeQuery("SELECT * FROM new_users")
    println(result2)
}

// Gradle commands for executing the application and test:
// To run the main application, make sure you have Gradle installed and use the following command:
// gradle run
// To run the tests, make sure you have TestNG configured and use the following command:
// gradle test --info
// If Gradle wrapper is available, you can use ./gradlew run or ./gradlew test --info
