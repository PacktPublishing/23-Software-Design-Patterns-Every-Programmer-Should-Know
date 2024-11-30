var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.getInstance = function () {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    };
    Logger.prototype.log = function (message) {
        console.log(message);
    };
    return Logger;
}());
// usage 
var logger = Logger.getInstance();
logger.log("Hello, Underworld!");
