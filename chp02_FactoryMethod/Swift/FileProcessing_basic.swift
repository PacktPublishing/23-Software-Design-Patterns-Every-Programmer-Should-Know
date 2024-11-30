import Foundation

// MARK: - Product Protocol
/// The FileProcessor protocol defines the interface that all file processors must implement.
protocol FileProcessor {
    /// Method to process a file by name
    func process(fileName: String)
}

// MARK: - Concrete Products
/// TextFileProcessor: A concrete implementation for processing text files.
class TextFileProcessor: FileProcessor {
    func process(fileName: String) {
        print("Processing text file: \(fileName)")
    }
}

/// CSVFileProcessor: A concrete implementation for processing CSV files.
class CSVFileProcessor: FileProcessor {
    func process(fileName: String) {
        print("Processing CSV file: \(fileName)")
    }
}

/// XMLFileProcessor: A concrete implementation for processing XML files.
class XMLFileProcessor: FileProcessor {
    func process(fileName: String) {
        print("Processing XML file: \(fileName)")
    }
}

// MARK: - Creator Protocol
/// The FileProcessorFactory defines the Factory Method for creating file processors.
protocol FileProcessorFactory {
    /// Factory method to create a specific file processor
    func createProcessor() -> FileProcessor
}

// MARK: - Concrete Factories
/// TextFileProcessorFactory: A factory for creating TextFileProcessor instances.
class TextFileProcessorFactory: FileProcessorFactory {
    func createProcessor() -> FileProcessor {
        return TextFileProcessor()
    }
}

/// CSVFileProcessorFactory: A factory for creating CSVFileProcessor instances.
class CSVFileProcessorFactory: FileProcessorFactory {
    func createProcessor() -> FileProcessor {
        return CSVFileProcessor()
    }
}

/// XMLFileProcessorFactory: A factory for creating XMLFileProcessor instances.
class XMLFileProcessorFactory: FileProcessorFactory {
    func createProcessor() -> FileProcessor {
        return XMLFileProcessor()
    }
}

// MARK: - Client Code
/// The client interacts with factories to process files dynamically.
func processFile(fileType: String, fileName: String) {
    let factory: FileProcessorFactory

    // Determine the appropriate factory based on file type
    switch fileType.lowercased() {
    case "text":
        factory = TextFileProcessorFactory()
    case "csv":
        factory = CSVFileProcessorFactory()
    case "xml":
        factory = XMLFileProcessorFactory()
    default:
        print("Unsupported file type: \(fileType)")
        return
    }

    // Use the factory to create the processor and process the file
    let processor = factory.createProcessor()
    processor.process(fileName: fileName)
}

// MARK: - Main Program
/// Simulate user input and process files
func main() {
    print("Enter file type (Text/CSV/XML):", terminator: " ")
    if let fileType = readLine() {
        print("Enter file name:", terminator: " ")
        if let fileName = readLine() {
            processFile(fileType: fileType, fileName: fileName)
        } else {
            print("No file name entered.")
        }
    } else {
        print("No file type entered.")
    }
}

main()
