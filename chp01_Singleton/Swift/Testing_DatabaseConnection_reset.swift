import Foundation

class DatabaseConnection {
    private static var _sharedInstance: DatabaseConnection?
    
    internal static func _initializeInstance() {
        _sharedInstance = DatabaseConnection()
    }

    static var sharedInstance: DatabaseConnection {
        guard let instance = _sharedInstance else {
            _initializeInstance(); return _sharedInstance!
        }
        return instance
    }
    
    private init() {}
    
    func connectToDatabase() {
        // Connect to the database here
        print("Connected to database")
    }
    
    func executeQuery(query: String) {
        // Execute the query on the database
        print("Executing query: \(query)")
    }
    
    static func resetInstance() {
        _sharedInstance = nil
        print("DatabaseConnection instance reset for testing purposes")
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

// Reset Singleton Instance for Testing Purposes
DatabaseConnection.resetInstance()
// The next line will crash intentionally to demonstrate reset behavior:
// let dbConnection2 = DatabaseConnection.sharedInstance
// Instead, reinitialize to prevent crash
DatabaseConnection._initializeInstance()
let dbConnection2 = DatabaseConnection.sharedInstance
dbConnection2.connectToDatabase()
dbConnection2.executeQuery(query: "SELECT * FROM new_users")
