// Product classes
sealed class FileProcessor {
    abstract fun processFile(file: String)
}

class TextFileProcessor : FileProcessor() {
    override fun processFile(file: String) {
        println("Processing text file: $file")
    }
}

class ImageFileProcessor : FileProcessor() {
    override fun processFile(file: String) {
        println("Processing image file: $file")
    }
}

class VideoFileProcessor : FileProcessor() {
    override fun processFile(file: String) {
        println("Processing video file: $file")
    }
}

// Factory method with excessive subclassing
class FileProcessorFactory {
    companion object {
        fun createFileProcessor(fileType: String): FileProcessor {
            return when (fileType) {
                "text" -> TextFileProcessor()
                "image" -> ImageFileProcessor()
                "video" -> VideoFileProcessor()
                else -> throw IllegalArgumentException("Invalid file type")
            }
        }
    }
}

// Usage example
fun main() {
    val fileProcessor = FileProcessorFactory.createFileProcessor("text")
    fileProcessor.processFile("example.txt")
}