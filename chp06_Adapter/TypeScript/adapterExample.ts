// Step 1: Define the Target Interface
// This is the clean interface the front-end expects to work with.
interface PaymentProcessor {
    processPayment(amount: number, currency: string): Promise<string>;
}

// Step 2: Identify the Adaptee
// This represents the existing back-end service, which has a different method signature and data format.
class LegacyPaymentService {
    processLegacyPayment(paymentData: { cents: number; currencyCode: string }): Promise<boolean> {
        console.log('Sending request to legacy payment service:', paymentData);
        return Promise.resolve(true);  // Simulate successful payment
    }
}

// Step 3: Implement the Adapter
// The adapter implements the front-end's expected interface (PaymentProcessor),
// but internally delegates to the legacy back-end service.
class PaymentAdapter implements PaymentProcessor {
    private legacyService: LegacyPaymentService;

    constructor(legacyService: LegacyPaymentService) {
        this.legacyService = legacyService;
    }

    async processPayment(amount: number, currency: string): Promise<string> {
        const paymentData = {
            cents: Math.round(amount * 100),
            currencyCode: currency.toUpperCase()
        };
        const success = await this.legacyService.processLegacyPayment(paymentData);

        if (success) {
            return "Payment processed successfully via legacy service.";
        } else {
            return "Payment failed in legacy service.";
        }
    }
}

// Step 4: Client Interaction
// The front-end works only with the PaymentProcessor interface.
async function checkout(processor: PaymentProcessor, amount: number, currency: string): Promise<void> {
    const result = await processor.processPayment(amount, currency);
    console.log(result);
}

// Example usage
const legacyService = new LegacyPaymentService();
const adapter = new PaymentAdapter(legacyService);

// Front-end only interacts with PaymentProcessor, unaware of the legacy system.
checkout(adapter, 49.99, 'usd');