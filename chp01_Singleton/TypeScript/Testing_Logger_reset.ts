// might need to run: tsc --target es6 Logger_thread_safe.ts

class Logger {
  private static instanceValue: Logger | null = null;

  private constructor() {}

  public static async getInstance(): Promise<Logger> {
    if (!Logger.instanceValue) {
      Logger.instanceValue = await Logger.initializeInstance();
    }
    return Logger.instanceValue;
  }

  private static async initializeInstance(): Promise<Logger> {
    // Simulate an asynchronous operation, such as fetching configurations or waiting for a resource
    return new Promise<Logger>((resolve) => {
      setTimeout(() => {
        resolve(new Logger());
      }, 0);
    });
  }

  public static resetInstance(): void {
    Logger.instanceValue = null;
    console.log("Logger instance reset for testing purposes");
  }

  public log(message: string): void {
    console.log(message);
  }
}

// Test class using Dependency Injection
class LoggerTest {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public runTest(): void {
    this.logger.log("This is a test log message.");
  }
}

// usage
(async () => {
  const logger = await Logger.getInstance();
  logger.log("Hello, Underworld!");

  // Dependency Injection Example
  const loggerTest = new LoggerTest(logger);
  loggerTest.runTest();

  // Reset Singleton Instance for Testing Purposes
  Logger.resetInstance();
  const logger2 = await Logger.getInstance();
  logger2.log("Hello again, after reset!");
})();
