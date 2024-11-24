import Foundation

// Define an error for unsupported file types
enum FileProcessorError: Error {
    case unsupportedFileType
}

// MARK: - Product Protocol
protocol FileProcessor {
    func process(fileName: String)
}

// MARK: - Concrete Products
class TextFileProcessor: FileProcessor {
    func process(fileName: String) {
        print("Processing text file: \(fileName)")
    }
}

class CSVFileProcessor: FileProcessor {
    func process(fileName: String) {
        print("Processing CSV file: \(fileName)")
    }
}

class XMLFileProcessor: FileProcessor {
    func process(fileName: String) {
        print("Processing XML file: \(fileName)")
    }
}

// MARK: - Factory Protocol
protocol FileProcessorFactory {
    func createProcessor() -> FileProcessor
}

// MARK: - Concrete Factories
class TextFileProcessorFactory: FileProcessorFactory {
    func createProcessor() -> FileProcessor {
        return TextFileProcessor()
    }
}

class CSVFileProcessorFactory: FileProcessorFactory {
    func createProcessor() -> FileProcessor {
        return CSVFileProcessor()
    }
}

class XMLFileProcessorFactory: FileProcessorFactory {
    func createProcessor() -> FileProcessor {
        return XMLFileProcessor()
    }
}

// MARK: - Factory Helper
enum FileProcessorType {
    case text
    case csv
    case xml
}

func getFileProcessorFactory(for type: FileProcessorType) throws -> FileProcessorFactory {
    switch type {
    case .text:
        return TextFileProcessorFactory()
    case .csv:
        return CSVFileProcessorFactory()
    case .xml:
        return XMLFileProcessorFactory()
    }
}
