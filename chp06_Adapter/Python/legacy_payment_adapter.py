from abc import ABC, abstractmethod

# Step 1: Define the Target Interface
class PaymentProcessor(ABC):
    @abstractmethod
    def process_payment(self, amount: float, currency: str) -> str:
        pass


# Step 2: Identify the Adaptee
class LegacyPaymentSystem:
    def make_payment(self, data: dict) -> bool:
        print(f"Processing payment through legacy system: {data}")
        # Simulate successful payment
        return True


# Step 3: Implement the Adapter
class LegacyPaymentAdapter(PaymentProcessor):
    def __init__(self, legacy_system: LegacyPaymentSystem):
        self.legacy_system = legacy_system

    def process_payment(self, amount: float, currency: str) -> str:
        # Translate the modern method call into a legacy-compatible format
        legacy_data = {
            "amount_in_cents": int(amount * 100),
            "currency_code": currency.upper()
        }
        success = self.legacy_system.make_payment(legacy_data)
        if success:
            return "Payment processed successfully via legacy system."
        else:
            return "Payment failed in legacy system."


# Step 4: Client Interaction
def checkout(processor: PaymentProcessor, amount: float, currency: str):
    result = processor.process_payment(amount, currency)
    print(result)


# Example Usage
if __name__ == "__main__":
    legacy_system = LegacyPaymentSystem()
    adapter = LegacyPaymentAdapter(legacy_system)

    # Client (modern checkout system) only knows about PaymentProcessor interface
    checkout(adapter, 49.99, "usd")