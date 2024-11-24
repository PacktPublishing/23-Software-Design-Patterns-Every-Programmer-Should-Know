import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows

// Product Interface
interface FileProcessor {
    fun process(fileName: String)
}

// Concrete Products
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

// Abstract Factory
abstract class FileProcessorFactory {
    abstract fun createProcessor(): FileProcessor

    fun processFile(fileName: String) {
        val processor = createProcessor()
        processor.process(fileName)
    }
}

// Concrete Factories
class TextFileProcessorFactory : FileProcessorFactory() {
    override fun createProcessor(): FileProcessor = TextFileProcessor()
}

class CSVFileProcessorFactory : FileProcessorFactory() {
    override fun createProcessor(): FileProcessor = CSVFileProcessor()
}

class XMLFileProcessorFactory : FileProcessorFactory() {
    override fun createProcessor(): FileProcessor = XMLFileProcessor()
}

// Helper Function
fun getFileProcessorFactory(fileType: String): FileProcessorFactory {
    return when (fileType.lowercase()) {
        "text" -> TextFileProcessorFactory()
        "csv" -> CSVFileProcessorFactory()
        "xml" -> XMLFileProcessorFactory()
        else -> throw IllegalArgumentException("Unsupported file type: $fileType")
    }
}

// Test Class
class FileProcessingTests {

    // MARK: Factory Method Validation

    @Test
    fun `TextFileProcessorFactory creates a TextFileProcessor`() {
        val factory = TextFileProcessorFactory()
        val processor = factory.createProcessor()
        assertTrue(processor is TextFileProcessor, "Factory did not create a TextFileProcessor")
    }

    @Test
    fun `CSVFileProcessorFactory creates a CSVFileProcessor`() {
        val factory = CSVFileProcessorFactory()
        val processor = factory.createProcessor()
        assertTrue(processor is CSVFileProcessor, "Factory did not create a CSVFileProcessor")
    }

    @Test
    fun `XMLFileProcessorFactory creates an XMLFileProcessor`() {
        val factory = XMLFileProcessorFactory()
        val processor = factory.createProcessor()
        assertTrue(processor is XMLFileProcessor, "Factory did not create an XMLFileProcessor")
    }

    // MARK: Client Code Tests

    @Test
    fun `Client retrieves correct factory dynamically`() {
        val factory = getFileProcessorFactory("csv")
        assertTrue(factory is CSVFileProcessorFactory, "getFileProcessorFactory did not return the correct factory")
        factory.processFile("example.csv")
    }

    @Test
    fun `Invalid file type throws IllegalArgumentException`() {
        val exception = assertThrows<IllegalArgumentException> {
            getFileProcessorFactory("json")
        }
        assertEquals("Unsupported file type: json", exception.message)
    }

    // MARK: Runtime Flexibility

    @Test
    fun `New file processor can be added dynamically`() {
        class JSONFileProcessor : FileProcessor {
            override fun process(fileName: String) {
                println("Processing JSON file: $fileName")
            }
        }

        class JSONFileProcessorFactory : FileProcessorFactory() {
            override fun createProcessor(): FileProcessor = JSONFileProcessor()
        }

        val factory = JSONFileProcessorFactory()
        val processor = factory.createProcessor()
        assertTrue(processor is JSONFileProcessor, "Factory did not create a JSONFileProcessor")
        factory.processFile("example.json")
    }

    // MARK: Edge Case Tests

    @Test
    fun `Factory handles large file names`() {
        val factory = getFileProcessorFactory("text")
        factory.processFile("a".repeat(10_000) + ".txt") // Large file name
    }

    @Test
    fun `Factory handles empty file names`() {
        val factory = getFileProcessorFactory("text")
        factory.processFile("") // Empty file name
    }

    // MARK: Pitfall Mitigation

    @Test
    fun `Factories avoid tight coupling to specific implementations`() {
        val factory = getFileProcessorFactory("xml")
        val processor = factory.createProcessor()
        assertTrue(processor is FileProcessor, "Client should only interact with FileProcessor interface")
    }

    @Test
    fun `Adding new processor does not affect existing factories`() {
        class MarkdownFileProcessor : FileProcessor {
            override fun process(fileName: String) {
                println("Processing Markdown file: $fileName")
            }
        }

        class MarkdownFileProcessorFactory : FileProcessorFactory() {
            override fun createProcessor(): FileProcessor = MarkdownFileProcessor()
        }

        // Ensure existing factories are unaffected
        val csvFactory = CSVFileProcessorFactory()
        val csvProcessor = csvFactory.createProcessor()
        assertTrue(csvProcessor is CSVFileProcessor, "Existing factories should remain functional")
    }
}
