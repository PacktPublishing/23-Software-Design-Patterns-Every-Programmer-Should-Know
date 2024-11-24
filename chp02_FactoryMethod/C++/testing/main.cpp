#include "payment_gateway.h"

int main() {
    try {
        auto gateway = getPaymentGateway("PayPal");
        gateway->executePayment(100.0); // Example payment using PayPal

        gateway = getPaymentGateway("Stripe");
        gateway->executePayment(200.0); // Example payment using Stripe

        gateway = getPaymentGateway("Square");
        gateway->executePayment(300.0); // Example payment using Square
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }
    return 0;
}
