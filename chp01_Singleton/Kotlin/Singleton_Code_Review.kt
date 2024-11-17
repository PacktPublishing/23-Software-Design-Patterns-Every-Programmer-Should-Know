object Logger { 

    fun log(message: String) { 

        println(message) 

    } 
} 


class DataManager { 

    fun saveData(data: String) { 

        Logger.log("Saving data: $data")  // Overuse of Singleton 

    } 

} 