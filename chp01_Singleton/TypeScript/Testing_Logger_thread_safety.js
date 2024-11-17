// might need to run: tsc --target es6 Logger_thread_safe.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Logger {
    constructor() { }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Logger.instanceValue) {
                Logger.instanceValue = yield Logger.initializeInstance();
            }
            return Logger.instanceValue;
        });
    }
    static initializeInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate an asynchronous operation, such as fetching configurations or waiting for a resource
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(new Logger());
                }, 0);
            });
        });
    }
    static resetInstance() {
        Logger.instanceValue = null;
        console.log("Logger instance reset for testing purposes");
    }
    log(message) {
        console.log(message);
    }
}
Logger.instanceValue = null;
// Test class using Dependency Injection
class LoggerTest {
    constructor(logger) {
        this.logger = logger;
    }
    runTest() {
        this.logger.log("This is a test log message.");
    }
}
// Thread Safety Test
(() => __awaiter(this, void 0, void 0, function* () {
    // Thread Safety Test without test frameworks
    const numThreads = 10;
    const loggerInstances = [];
    // Create an array of promises to simulate concurrent access to the singleton instance
    const promises = Array.from({ length: numThreads }, (_, i) => __awaiter(this, void 0, void 0, function* () {
        const instance = yield Logger.getInstance();
        loggerInstances.push(instance);
        return instance;
    }));
    // Wait for all threads to complete
    yield Promise.all(promises);
    // Verify that all instances are the same
    const firstInstance = loggerInstances[0];
    const allSameInstance = loggerInstances.every((instance) => instance === firstInstance);
    console.log("All instances are the same:", allSameInstance);
    // Usage
    const logger = yield Logger.getInstance();
    logger.log("Hello, Underworld!");
    // Dependency Injection Example
    const loggerTest = new LoggerTest(logger);
    loggerTest.runTest();
    // Reset Singleton Instance for Testing Purposes
    Logger.resetInstance();
    const logger2 = yield Logger.getInstance();
    logger2.log("Hello again, after reset!");
}))();
