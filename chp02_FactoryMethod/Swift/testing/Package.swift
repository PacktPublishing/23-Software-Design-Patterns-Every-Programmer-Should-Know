// swift-tools-version: 6.0
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "FileProcessor", // This is the module name
    products: [
        .library(
            name: "FileProcessor",
            targets: ["FileProcessor"]
        ),
    ],
    dependencies: [],
    targets: [
        .target(
            name: "FileProcessor",
            dependencies: []
        ),
        .testTarget(
            name: "FileProcessorTests",
            dependencies: ["FileProcessor"] // Link the FileProcessor target here
        ),
    ]
)