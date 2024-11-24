#include <gtest/gtest.h>
#include "payment_gateway.h" // Include your Payment Gateway implementation

// MARK: Factory Method Validation

TEST(PaymentGatewayFactoryTest, PayPalFactoryCreatesPayPalProcessor) {
    PayPalGateway factory;
    auto processor = factory.createProcessor();
    EXPECT_NE(processor, nullptr);
    EXPECT_NO_THROW(processor->processPayment(100.0));
}

TEST(PaymentGatewayFactoryTest, StripeFactoryCreatesStripeProcessor) {
    StripeGateway factory;
    auto processor = factory.createProcessor();
    EXPECT_NE(processor, nullptr);
    EXPECT_NO_THROW(processor->processPayment(200.0));
}

TEST(PaymentGatewayFactoryTest, SquareFactoryCreatesSquareProcessor) {
    SquareGateway factory;
    auto processor = factory.createProcessor();
    EXPECT_NE(processor, nullptr);
    EXPECT_NO_THROW(processor->processPayment(300.0));
}

// MARK: Client Code Tests

TEST(PaymentGatewayClientTest, ClientCanRetrieveAndUsePayPalGateway) {
    auto gateway = getPaymentGateway("PayPal");
    ASSERT_NE(gateway, nullptr);
    EXPECT_NO_THROW(gateway->executePayment(150.0));
}

TEST(PaymentGatewayClientTest, ClientCanRetrieveAndUseStripeGateway) {
    auto gateway = getPaymentGateway("Stripe");
    ASSERT_NE(gateway, nullptr);
    EXPECT_NO_THROW(gateway->executePayment(250.0));
}

TEST(PaymentGatewayClientTest, InvalidGatewayTypeThrowsException) {
    EXPECT_THROW(getPaymentGateway("UnknownGateway"), std::invalid_argument);
}

// MARK: Runtime Flexibility

TEST(PaymentGatewayTest, NewGatewayCanBeAddedDynamically) {
    // Define a new processor and gateway
    class BitcoinProcessor : public PaymentProcessor {
    public:
        void processPayment(double amount) override {
            std::cout << "Processing payment of $" << amount << " via Bitcoin.\n";
        }
    };

    class BitcoinGateway : public PaymentGateway {
    public:
        std::unique_ptr<PaymentProcessor> createProcessor() const override {
            return std::make_unique<BitcoinProcessor>();
        }
    };

    // Test the new gateway
    BitcoinGateway bitcoinGateway;
    auto processor = bitcoinGateway.createProcessor();
    EXPECT_NE(processor, nullptr);
    EXPECT_NO_THROW(processor->processPayment(500.0));
}

// MARK: Edge Case Tests

TEST(PaymentGatewayEdgeCaseTest, HandlesLargePaymentAmount) {
    auto gateway = getPaymentGateway("Stripe");
    ASSERT_NE(gateway, nullptr);
    EXPECT_NO_THROW(gateway->executePayment(1e6)); // $1,000,000 payment
}

TEST(PaymentGatewayEdgeCaseTest, HandlesZeroPaymentAmount) {
    auto gateway = getPaymentGateway("Square");
    ASSERT_NE(gateway, nullptr);
    EXPECT_NO_THROW(gateway->executePayment(0.0)); // $0 payment
}

// MARK: Pitfall Mitigation

TEST(PaymentGatewayPitfallTest, FactoriesAvoidTightCoupling) {
    PayPalGateway gateway;
    auto processor = gateway.createProcessor();
    EXPECT_NE(processor, nullptr);
    EXPECT_NO_THROW(processor->processPayment(100.0));
}

TEST(PaymentGatewayPitfallTest, AddingNewProcessorDoesNotBreakExistingFactories) {
    // Ensure existing factories still function
    StripeGateway stripeGateway;
    auto stripeProcessor = stripeGateway.createProcessor();
    EXPECT_NE(stripeProcessor, nullptr);
    EXPECT_NO_THROW(stripeProcessor->processPayment(300.0));

    // Adding a new processor
    class CustomProcessor : public PaymentProcessor {
    public:
        void processPayment(double amount) override {
            std::cout << "Processing payment of $" << amount << " via Custom Processor.\n";
        }
    };

    class CustomGateway : public PaymentGateway {
    public:
        std::unique_ptr<PaymentProcessor> createProcessor() const override {
            return std::make_unique<CustomProcessor>();
        }
    };

    // Ensure the new gateway works as expected
    CustomGateway customGateway;
    auto customProcessor = customGateway.createProcessor();
    EXPECT_NE(customProcessor, nullptr);
    EXPECT_NO_THROW(customProcessor->processPayment(400.0));
}
