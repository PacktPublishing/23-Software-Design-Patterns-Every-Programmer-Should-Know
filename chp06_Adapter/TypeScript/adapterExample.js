var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Step 2: Identify the Adaptee
// This represents the existing back-end service, which has a different method signature and data format.
var LegacyPaymentService = /** @class */ (function () {
    function LegacyPaymentService() {
    }
    LegacyPaymentService.prototype.processLegacyPayment = function (paymentData) {
        console.log('Sending request to legacy payment service:', paymentData);
        return Promise.resolve(true); // Simulate successful payment
    };
    return LegacyPaymentService;
}());
// Step 3: Implement the Adapter
// The adapter implements the front-end's expected interface (PaymentProcessor),
// but internally delegates to the legacy back-end service.
var PaymentAdapter = /** @class */ (function () {
    function PaymentAdapter(legacyService) {
        this.legacyService = legacyService;
    }
    PaymentAdapter.prototype.processPayment = function (amount, currency) {
        return __awaiter(this, void 0, void 0, function () {
            var paymentData, success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paymentData = {
                            cents: Math.round(amount * 100),
                            currencyCode: currency.toUpperCase()
                        };
                        return [4 /*yield*/, this.legacyService.processLegacyPayment(paymentData)];
                    case 1:
                        success = _a.sent();
                        if (success) {
                            return [2 /*return*/, "Payment processed successfully via legacy service."];
                        }
                        else {
                            return [2 /*return*/, "Payment failed in legacy service."];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return PaymentAdapter;
}());
// Step 4: Client Interaction
// The front-end works only with the PaymentProcessor interface.
function checkout(processor, amount, currency) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, processor.processPayment(amount, currency)];
                case 1:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
// Example usage
var legacyService = new LegacyPaymentService();
var adapter = new PaymentAdapter(legacyService);
// Front-end only interacts with PaymentProcessor, unaware of the legacy system.
checkout(adapter, 49.99, 'usd');
