#ifndef PAYMENT_GATEWAY_H
#define PAYMENT_GATEWAY_H

#include <iostream>
#include <memory>
#include <stdexcept>

// MARK: Abstract Product
class PaymentProcessor {
public:
    virtual void processPayment(double amount) = 0; // Declaration only
    virtual ~PaymentProcessor() = default;
};

// MARK: Concrete Products
class PayPalProcessor : public PaymentProcessor {
public:
    void processPayment(double amount) override; // Declaration
};

class StripeProcessor : public PaymentProcessor {
public:
    void processPayment(double amount) override; // Declaration
};

class SquareProcessor : public PaymentProcessor {
public:
    void processPayment(double amount) override; // Declaration
};

// MARK: Abstract Creator
class PaymentGateway {
public:
    virtual std::unique_ptr<PaymentProcessor> createProcessor() const = 0;
    virtual ~PaymentGateway() = default;

    void executePayment(double amount) const;
};

// MARK: Concrete Creators
class PayPalGateway : public PaymentGateway {
public:
    std::unique_ptr<PaymentProcessor> createProcessor() const override;
};

class StripeGateway : public PaymentGateway {
public:
    std::unique_ptr<PaymentProcessor> createProcessor() const override;
};

class SquareGateway : public PaymentGateway {
public:
    std::unique_ptr<PaymentProcessor> createProcessor() const override;
};

// Factory Function
std::unique_ptr<PaymentGateway> getPaymentGateway(const std::string& gatewayType);

#endif // PAYMENT_GATEWAY_H
