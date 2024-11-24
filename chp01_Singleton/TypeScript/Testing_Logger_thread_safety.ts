// might need to run: tsc --target es6 Logger_thread_safe.ts

import { expect } from 'chai';
import { describe, it } from 'mocha';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

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

// Thread Safety Test
(async () => {
  describe('Logger Singleton Thread Safety Test', () => {
    it('should return the same instance when accessed from multiple threads', async () => {
      const numThreads = 10;
      const loggerInstances: Logger[] = [];

      // Create an array of promises to simulate concurrent access to the singleton instance
      const promises = Array.from({ length: numThreads }, async (_, i) => {
        const instance = await Logger.getInstance();
        loggerInstances.push(instance);
        return instance;
      });

      // Wait for all threads to complete
      await Promise.all(promises);

      // Verify that all instances are the same
      const firstInstance = loggerInstances[0];
      loggerInstances.forEach((instance) => {
        expect(instance).to.equal(firstInstance);
      });
    });
  });

  // Run tests explicitly in an async context
  if (typeof mocha !== 'undefined') {
    mocha.run();
  }

  // Usage
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
