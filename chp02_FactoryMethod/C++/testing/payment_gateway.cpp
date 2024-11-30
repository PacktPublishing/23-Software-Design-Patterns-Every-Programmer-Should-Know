#include "payment_gateway.h"

// MARK: Concrete Product Implementations

// PayPalProcessor: Handles payment processing via PayPal
void PayPalProcessor::processPayment(double amount) {
    std::cout << "Processing payment of $" << amount << " via PayPal." << std::endl;
}

// StripeProcessor: Handles payment processing via Stripe
void StripeProcessor::processPayment(double amount) {
    std::cout << "Processing payment of $" << amount << " via Stripe." << std::endl;
}

// SquareProcessor: Handles payment processing via Square
void SquareProcessor::processPayment(double amount) {
    std::cout << "Processing payment of $" << amount << " via Square." << std::endl;
}

// MARK: Concrete Factory Implementations

// PayPalGateway: Creates PayPalProcessor
std::unique_ptr<PaymentProcessor> PayPalGateway::createProcessor() const {
    return std::make_unique<PayPalProcessor>();
}

// StripeGateway: Creates StripeProcessor
std::unique_ptr<PaymentProcessor> StripeGateway::createProcessor() const {
    return std::make_unique<StripeProcessor>();
}

// SquareGateway: Creates SquareProcessor
std::unique_ptr<PaymentProcessor> SquareGateway::createProcessor() const {
    return std::make_unique<SquareProcessor>();
}

// MARK: Factory Function Implementation

// Dynamically retrieves the appropriate PaymentGateway
std::unique_ptr<PaymentGateway> getPaymentGateway(const std::string& gatewayType) {
    if (gatewayType == "PayPal") {
        return std::make_unique<PayPalGateway>();
    } else if (gatewayType == "Stripe") {
        return std::make_unique<StripeGateway>();
    } else if (gatewayType == "Square") {
        return std::make_unique<SquareGateway>();
    } else {
        throw std::invalid_argument("Unsupported payment gateway: " + gatewayType);
    }
}


void PaymentGateway::executePayment(double amount) const {
    auto processor = createProcessor(); // Use the factory method to create the processor
    processor->processPayment(amount); // Delegate the payment processing to the created processor
}
