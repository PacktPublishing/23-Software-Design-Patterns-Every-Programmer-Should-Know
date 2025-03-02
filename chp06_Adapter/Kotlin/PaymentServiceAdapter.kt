// Step 1: Define the Target Interface
// This is the expected common interface defined in the KMP shared module.
interface PaymentProcessor {
    fun processPayment(amount: Double, currency: String): String
}

// Step 2: Identify the Adaptee
// This represents an existing Android-specific payment service (legacy or platform-tied).
// In reality, this could be a service using Android's IntentService, a third-party library, or some other Android-specific API.
class AndroidPaymentService {
    fun initiatePayment(paymentDetails: Map<String, Any>): Boolean {
        println("Processing payment on Android: $paymentDetails")
        return true // Simulate successful payment
    }
}

// Step 3: Implement the Adapter
// This is the adapter that conforms to the multiplatform interface (PaymentProcessor),
// but delegates actual work to the platform-specific AndroidPaymentService.
class AndroidPaymentAdapter(
    private val androidService: AndroidPaymentService
) : PaymentProcessor {

    override fun processPayment(amount: Double, currency: String): String {
        val paymentDetails = mapOf(
            "amountInCents" to (amount * 100).toInt(),
            "currencyCode" to currency.uppercase()
        )
        val success = androidService.initiatePayment(paymentDetails)

        return if (success) {
            "Payment processed successfully via Android service."
        } else {
            "Payment failed via Android service."
        }
    }
}

// Step 4: Client Interaction
// The client works only with the PaymentProcessor interface, never knowing it's talking to an Android-specific implementation.
fun checkout(processor: PaymentProcessor, amount: Double, currency: String) {
    val result = processor.processPayment(amount, currency)
    println(result)
}

// Example Usage
fun main() {
    val androidService = AndroidPaymentService()
    val adapter = AndroidPaymentAdapter(androidService)

    // Client only knows about PaymentProcessor interface
    checkout(adapter, 49.99, "usd")
}