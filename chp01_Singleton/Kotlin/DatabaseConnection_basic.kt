object DatabaseConnection { 

    private var instance: DatabaseConnection? = null 

    init { 

        // Initialize the database connection here 

        println("Database connection initialized") 

    }

    fun getInstance(): DatabaseConnection { 

        if (instance == null) { 

            instance = DatabaseConnection 

        } 

        return instance!! 

    } 
     

    fun executeQuery(query: String): String { 

        // Execute the query and return the result 

        println("Executing query: $query") 

        return "Query executed successfully" 

    } 

}  

fun main() {  

    val dbInstance = DatabaseConnection.getInstance() 

val result = dbInstance.executeQuery("SELECT * FROM users") 

println(result)  

} 