import XCTest
@testable import FileProcessor 

final class FileProcessorTests: XCTestCase {

    // MARK: Factory Method Validation

    func testTextFileProcessorFactoryCreatesTextFileProcessor() {
        let factory = TextFileProcessorFactory()
        let processor = factory.createProcessor()
        XCTAssertTrue(processor is TextFileProcessor, "Expected a TextFileProcessor instance.")
    }

    func testCSVFileProcessorFactoryCreatesCSVFileProcessor() {
        let factory = CSVFileProcessorFactory()
        let processor = factory.createProcessor()
        XCTAssertTrue(processor is CSVFileProcessor, "Expected a CSVFileProcessor instance.")
    }

    func testXMLFileProcessorFactoryCreatesXMLFileProcessor() {
        let factory = XMLFileProcessorFactory()
        let processor = factory.createProcessor()
        XCTAssertTrue(processor is XMLFileProcessor, "Expected an XMLFileProcessor instance.")
    }

    // MARK: Client Code Tests

    func testClientRetrievesAndUsesCorrectProcessor() {

        do {
            let factory = try getFileProcessorFactory(for: .csv) 
            let processor = factory.createProcessor()
            XCTAssertTrue(processor is CSVFileProcessor, "Expected a CSVFileProcessor instance.")
        
            // Ensure the processor can process the file without errors
            XCTAssertNoThrow(processor.process(fileName: "example.csv"))
        } catch let caughtError {
            XCTFail("Unexpected error thrown: \(caughtError)")
        }
    } 

    // MARK: Runtime Flexibility

    func testNewProcessorCanBeAddedDynamically() {
        // Define a new processor type
        class JSONFileProcessor: FileProcessor {
            func process(fileName: String) {
                print("Processing JSON file: \(fileName)")
            }
        }

        // Define a new factory
        class JSONFileProcessorFactory: FileProcessorFactory {
            func createProcessor() -> FileProcessor {
                return JSONFileProcessor()
            }
        }

        let factory = JSONFileProcessorFactory()
        let processor = factory.createProcessor()
        XCTAssertTrue(processor is JSONFileProcessor, "Expected a JSONFileProcessor instance.")
        
        // Ensure the new processor works without errors
        XCTAssertNoThrow(processor.process(fileName: "example.json"))
    }

    // MARK: Edge Case Tests

    func testProcessorHandlesLargeFileNames() {
        let factory = TextFileProcessorFactory()
        let processor = factory.createProcessor()
        
        // Test with a large file name
        let largeFileName = String(repeating: "a", count: 10_000) + ".txt"
        XCTAssertNoThrow(processor.process(fileName: largeFileName))
    }

    func testProcessorHandlesEmptyFileNames() {
        let factory = CSVFileProcessorFactory()
        let processor = factory.createProcessor()
        
        // Test with an empty file name
        XCTAssertNoThrow(processor.process(fileName: ""))
    }

    // MARK: Pitfall Mitigation

    func testAddingNewProcessorDoesNotBreakExistingFactories() {
        // Existing factory
        let csvFactory = CSVFileProcessorFactory()
        let csvProcessor = csvFactory.createProcessor()
        XCTAssertTrue(csvProcessor is CSVFileProcessor, "Expected a CSVFileProcessor instance.")

        // Adding a new processor
        class MarkdownFileProcessor: FileProcessor {
            func process(fileName: String) {
                print("Processing Markdown file: \(fileName)")
            }
        }

        class MarkdownFileProcessorFactory: FileProcessorFactory {
            func createProcessor() -> FileProcessor {
                return MarkdownFileProcessor()
            }
        }

        let markdownFactory = MarkdownFileProcessorFactory()
        let markdownProcessor = markdownFactory.createProcessor()
        XCTAssertTrue(markdownProcessor is MarkdownFileProcessor, "Expected a MarkdownFileProcessor instance.")
        
        // Ensure both processors work correctly
        XCTAssertNoThrow(csvProcessor.process(fileName: "example.csv"))
        XCTAssertNoThrow(markdownProcessor.process(fileName: "example.md"))
    }
}
