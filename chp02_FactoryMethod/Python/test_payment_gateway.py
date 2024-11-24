import pytest # might need to install pytest
from typing import Type
from PaymentGateway_basic import (
    PaymentProcessor,
    PayPalProcessor,
    StripeProcessor,
    SquareProcessor,
    PaymentGateway,
    PayPalGateway,
    StripeGateway,
    SquareGateway,
    get_payment_gateway,
)

# MARK: Testing Factory Methods
def test_paypal_factory_creates_correct_processor():
    """Test that PayPalGateway factory creates a PayPalProcessor."""
    factory = PayPalGateway()
    processor = factory.create_processor()
    assert isinstance(processor, PayPalProcessor), "Factory did not create a PayPalProcessor."

def test_stripe_factory_creates_correct_processor():
    """Test that StripeGateway factory creates a StripeProcessor."""
    factory = StripeGateway()
    processor = factory.create_processor()
    assert isinstance(processor, StripeProcessor), "Factory did not create a StripeProcessor."

def test_square_factory_creates_correct_processor():
    """Test that SquareGateway factory creates a SquareProcessor."""
    factory = SquareGateway()
    processor = factory.create_processor()
    assert isinstance(processor, SquareProcessor), "Factory did not create a SquareProcessor."

# MARK: Testing Client Code
def test_client_creates_correct_processor_via_gateway():
    """Test that the client retrieves the correct gateway and processor dynamically."""
    gateway = get_payment_gateway("PayPal")
    assert isinstance(gateway, PayPalGateway), "get_payment_gateway did not return a PayPalGateway."
    gateway.execute_payment(100.0)  # Ensure no errors during execution.

def test_invalid_gateway_type_raises_error():
    """Test that an invalid gateway type raises a ValueError."""
    with pytest.raises(ValueError, match="Unsupported payment gateway"):
        get_payment_gateway("UnknownGateway")

# MARK: Testing Runtime Flexibility
def test_new_gateway_can_be_added_dynamically():
    """Test the extensibility of the factory with new products."""
    class ApplePayProcessor(PaymentProcessor):
        def process_payment(self, amount: float):
            print(f"Processing payment of ${amount} via Apple Pay.")

    class ApplePayGateway(PaymentGateway):
        def create_processor(self) -> PaymentProcessor:
            return ApplePayProcessor()

    # Test the new gateway
    gateway = ApplePayGateway()
    processor = gateway.create_processor()
    assert isinstance(processor, ApplePayProcessor), "ApplePayGateway did not create ApplePayProcessor."
    gateway.execute_payment(150.0)  # Ensure execution with the new gateway works correctly.

# MARK: Testing Edge Cases
def test_factory_handles_large_payment_amount():
    """Test the factory's behavior with large payment amounts."""
    gateway = get_payment_gateway("Stripe")
    gateway.execute_payment(1_000_000.0)  # Test with a large payment.

def test_factory_handles_zero_payment_amount():
    """Test the factory's behavior with zero payment."""
    gateway = get_payment_gateway("Square")
    gateway.execute_payment(0.0)  # Ensure no crashes or unexpected behavior.

# MARK: Testing Pitfall Mitigation
def test_tightly_coupled_factory_avoided():
    """Test that factories are not tightly coupled to product implementations."""
    gateway = get_payment_gateway("Stripe")
    processor = gateway.create_processor()
    assert isinstance(processor, PaymentProcessor), "Client should only interact with PaymentProcessor interface."

def test_new_processor_does_not_break_existing_factories():
    """Ensure adding a new processor does not affect existing factories."""
    class BitcoinProcessor(PaymentProcessor):
        def process_payment(self, amount: float):
            print(f"Processing ${amount} in Bitcoin.")

    # Ensure existing gateways still function
    stripe_gateway = StripeGateway()
    stripe_processor = stripe_gateway.create_processor()
    assert isinstance(stripe_processor, StripeProcessor), "Existing factories should remain functional."