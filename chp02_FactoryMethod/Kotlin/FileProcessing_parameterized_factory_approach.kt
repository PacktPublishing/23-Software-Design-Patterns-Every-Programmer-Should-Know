// Product classes
sealed class FileProcessor {
    abstract fun processFile(file: String)
}

class FileProcessorImpl(private val fileType: String) : FileProcessor() {
    override fun processFile(file: String) {
        when (fileType) {
            "text" -> println("Processing text file: $file")
            "image" -> println("Processing image file: $file")
            "video" -> println("Processing video file: $file")
            else -> throw IllegalArgumentException("Invalid file type")
        }
    }
}

// Parameterized factory
class FileProcessorFactory {
    companion object {
        fun createFileProcessor(fileType: String): FileProcessor {
            return FileProcessorImpl(fileType)
        }
    }
}

// Usage example
fun main() {
    val fileProcessor = FileProcessorFactory.createFileProcessor("text")
    fileProcessor.processFile("example.txt")
}