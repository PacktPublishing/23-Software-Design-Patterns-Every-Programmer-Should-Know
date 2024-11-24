# Product classes 
class PayPal: 
    def process_payment(self, amount): 
        print(f"Processing PayPal payment of ${amount}") 


class Stripe: 
    def process_payment(self, amount): 
        print(f"Processing Stripe payment of ${amount}") 

  
class BankTransfer: 
    def process_payment(self, amount): 
        print(f"Processing bank transfer payment of ${amount}") 

  
# Registry-based factory 
class PaymentGatewayFactory: 
    _registry = {} 

    @classmethod 
    def register(cls, gateway_type, gateway_class): 
        cls._registry[gateway_type] = gateway_class 

    @classmethod 
    def create_gateway(cls, gateway_type): 
        gateway_class = cls._registry.get(gateway_type) 
        if gateway_class is None: 
            raise ValueError("Invalid gateway type") 
        return gateway_class() 


# Register payment gateways with the factory 
PaymentGatewayFactory.register("paypal", PayPal) 
PaymentGatewayFactory.register("stripe", Stripe) 
PaymentGatewayFactory.register("bank_transfer", BankTransfer) 


# Usage example 
gateway = PaymentGatewayFactory.create_gateway("paypal") 
gateway.process_payment(100) 
  

# Adding a new product type does not require modifying the factory code 
class ApplePay: 
    def process_payment(self, amount): 
        print(f"Processing Apple Pay payment of ${amount}") 


# Register the new payment gateway with the factory 
PaymentGatewayFactory.register("apple_pay", ApplePay) 
  

# Usage example 
gateway = PaymentGatewayFactory.create_gateway("apple_pay") 
gateway.process_payment(100) 