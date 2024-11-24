import Foundation

class DatabaseConnection {
  // static property initializer ensures thread safety by leveraging Swift's 
  // guarantee of thread-safe initialization for static properties.
    static let sharedInstance: DatabaseConnection = {
        let instance = DatabaseConnection()
        // Additional initialization if needed
        return instance
    }()
    
    private init() {}
    
    func connectToDatabase() {
        // Connect to the database here
        print("Connected to database")
    }
    
    func executeQuery(query: String) {
        // Execute the query on the database
        print("Executing query: \(query)")
    }
}

// Test class using Dependency Injection
class DatabaseConnectionTest {
    private let databaseConnection: DatabaseConnection
    
    init(databaseConnection: DatabaseConnection) {
        self.databaseConnection = databaseConnection
    }
    
    func runTest() {
        // Example test case: connect to database and execute a query
        databaseConnection.connectToDatabase()
        databaseConnection.executeQuery(query: "SELECT * FROM test_table")
    }
}

// Usage
let dbConnection = DatabaseConnection.sharedInstance
dbConnection.connectToDatabase()
dbConnection.executeQuery(query: "SELECT * FROM users")

// Dependency Injection Example
let dbTest = DatabaseConnectionTest(databaseConnection: dbConnection)
dbTest.runTest()
