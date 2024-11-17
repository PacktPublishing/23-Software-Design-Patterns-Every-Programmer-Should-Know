// might need to run: tsc --target es6 Logger_thread_safe.ts


class Logger {
  private static instance: Logger;

  private constructor() {}

  public static async getInstance(): Promise<Logger> {
    if (!Logger.instance) {
      Logger.instance = await Logger.initializeInstance();
    }
    return Logger.instance;
  }

  private static async initializeInstance(): Promise<Logger> {
    // Simulate an asynchronous operation, such as fetching configurations or waiting for a resource
    return new Promise<Logger>((resolve) => {
      setTimeout(() => {
        resolve(new Logger());
      }, 0);
    });
  }

  public log(message: string): void {
    console.log(message);
  }
}

// usage
(async () => {
  const logger = await Logger.getInstance();
  logger.log("Hello, Underworld!");
})();