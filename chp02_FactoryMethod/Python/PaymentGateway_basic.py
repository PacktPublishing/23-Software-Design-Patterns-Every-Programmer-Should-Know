from abc import ABC, abstractmethod 

  

class PaymentProcessor(ABC): 
    @abstractmethod  
    def process_payment(self, amount: float): 

        """Process the payment""" 

        pass


class PayPalProcessor(PaymentProcessor):
    def process_payment(self, amount: float):
        print(f"Processing payment of ${amount} via PayPal.")


class StripeProcessor(PaymentProcessor):
    def process_payment(self, amount: float):
        print(f"Processing payment of ${amount} via Stripe.")


class SquareProcessor(PaymentProcessor):
    def process_payment(self, amount: float):
        print(f"Processing payment of ${amount} via Square.")


class PaymentGateway(ABC):
    @abstractmethod
    def create_processor(self) -> PaymentProcessor:
        """Factory method to create payment processors"""
        pass

    def execute_payment(self, amount: float):
        """Client code that uses the factory method"""
        processor = self.create_processor()
        processor.process_payment(amount)


class PayPalGateway(PaymentGateway): 
    def create_processor(self) -> PaymentProcessor: 
        return PayPalProcessor() 

        
class StripeGateway(PaymentGateway): 
    def create_processor(self) -> PaymentProcessor: 
        return StripeProcessor() 

          
class SquareGateway(PaymentGateway): 
    def create_processor(self) -> PaymentProcessor: 
        return SquareProcessor()

def get_payment_gateway(gateway_type: str) -> PaymentGateway: 
    if gateway_type == "PayPal": 
        return PayPalGateway() 
    elif gateway_type == "Stripe": 
        return StripeGateway() 
    elif gateway_type == "Square": 
        return SquareGateway() 
    else: 
        raise ValueError("Unsupported payment gateway.") 


# Simulate the client code 

if __name__ == "__main__": 
    gateway_type = input("Enter payment gateway (PayPal/Stripe/Square): ").strip() 

    try: 
        gateway = get_payment_gateway(gateway_type) 
        gateway.execute_payment(100.0)  # Process a $100 payment 

    except ValueError as e: 
        print(e) 