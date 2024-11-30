import Foundation

class DatabaseConnection {
    static let sharedInstance = DatabaseConnection()
    
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

// Usage
let dbConnection = DatabaseConnection.sharedInstance
dbConnection.connectToDatabase()
dbConnection.executeQuery(query: "SELECT * FROM users")