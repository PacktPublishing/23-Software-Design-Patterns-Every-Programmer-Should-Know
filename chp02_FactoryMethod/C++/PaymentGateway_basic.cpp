// gcc -lstdc++ -std=c++14 PaymentGateway_basic.cpp -o PaymentGateway_basic.o
#include <iostream>
#include <string>
#include <memory>

// Abstract Product: Defines the interface for all payment processors
class PaymentProcessor {
public:
    virtual void processPayment(double amount) = 0; // Pure virtual method
    virtual ~PaymentProcessor() = default;         // Virtual destructor for proper cleanup
};

// Concrete Product: PayPal Payment Processor
class PayPalProcessor : public PaymentProcessor {
public:
    void processPayment(double amount) override {
        std::cout << "Processing payment of $" << amount << " via PayPal.\n";
    }
};

// Concrete Product: Stripe Payment Processor
class StripeProcessor : public PaymentProcessor {
public:
    void processPayment(double amount) override {
        std::cout << "Processing payment of $" << amount << " via Stripe.\n";
    }
};

// Concrete Product: Square Payment Processor
class SquareProcessor : public PaymentProcessor {
public:
    void processPayment(double amount) override {
        std::cout << "Processing payment of $" << amount << " via Square.\n";
    }
};

// Abstract Creator: Factory for creating payment processors
class PaymentGateway {
public:
    virtual std::unique_ptr<PaymentProcessor> createProcessor() const = 0; // Factory Method
    virtual ~PaymentGateway() = default;

    // High-level method that uses the factory method
    void executePayment(double amount) const {
        auto processor = createProcessor();
        processor->processPayment(amount);
    }
};

// Concrete Creator: PayPal Gateway Factory
class PayPalGateway : public PaymentGateway {
public:
    std::unique_ptr<PaymentProcessor> createProcessor() const override {
        return std::make_unique<PayPalProcessor>();
    }
};

// Concrete Creator: Stripe Gateway Factory
class StripeGateway : public PaymentGateway {
public:
    std::unique_ptr<PaymentProcessor> createProcessor() const override {
        return std::make_unique<StripeProcessor>();
    }
};

// Concrete Creator: Square Gateway Factory
class SquareGateway : public PaymentGateway {
public:
    std::unique_ptr<PaymentProcessor> createProcessor() const override {
        return std::make_unique<SquareProcessor>();
    }
};

// Client Code: Decides which gateway to use based on user input
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

// Main function: Entry point
int main() {
    try {
        // Prompt the user for the payment gateway type
        std::cout << "Enter payment gateway (PayPal/Stripe/Square): ";
        std::string gatewayType;
        std::cin >> gatewayType;

        // Get the appropriate payment gateway
        auto gateway = getPaymentGateway(gatewayType);

        // Execute a payment using the selected gateway
        gateway->executePayment(100.0); // Example: $100 payment
    } catch (const std::exception& e) {
        // Handle invalid input or other exceptions
        std::cerr << "Error: " << e.what() << '\n';
    }

    return 0;
}
