interface FileProcessor { 
    fun process(fileName: String) 
} 


class TextFileProcessor : FileProcessor {
    override fun process(fileName: String) {
        println("Processing text file: $fileName")
    }
}


class CSVFileProcessor : FileProcessor {
    override fun process(fileName: String) {
        println("Processing CSV file: $fileName")
    }
}


class XMLFileProcessor : FileProcessor {
    override fun process(fileName: String) {
        println("Processing XML file: $fileName")
    }
}


abstract class FileProcessorFactory { 
    abstract fun createProcessor(): FileProcessor 
    fun processFile(fileName: String) { 
        val processor = createProcessor() 
        processor.process(fileName) 
    } 
}


class TextFileProcessorFactory : FileProcessorFactory() { 
    override fun createProcessor(): FileProcessor { 
        return TextFileProcessor() 
    } 
} 


class CSVFileProcessorFactory : FileProcessorFactory() { 
    override fun createProcessor(): FileProcessor { 
        return CSVFileProcessor() 
    } 
} 


class XMLFileProcessorFactory : FileProcessorFactory() { 
    override fun createProcessor(): FileProcessor { 
        return XMLFileProcessor() 
    } 
} 


fun getFileProcessorFactory(fileType: String): FileProcessorFactory {
    return when (fileType) {
        "Text" -> TextFileProcessorFactory()
        "CSV" -> CSVFileProcessorFactory()
        "XML" -> XMLFileProcessorFactory()
        else -> throw IllegalArgumentException("Unsupported file type: $fileType")
    }
}

fun main() {
    println("Enter file type (Text/CSV/XML):")
    val fileType = readLine()!!.trim()

    try {
        val factory = getFileProcessorFactory(fileType)
        factory.processFile("example.$fileType")
    } catch (e: IllegalArgumentException) {
        println(e.message)
    }
}
