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
            if (!Logger.instance) {
                Logger.instance = yield Logger.initializeInstance();
            }
            return Logger.instance;
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
    log(message) {
        console.log(message);
    }
}
// usage
(() => __awaiter(this, void 0, void 0, function* () {
    const logger = yield Logger.getInstance();
    logger.log("Hello, Underworld!");
}))();
