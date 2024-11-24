

class PayPal: 
    def process_payment(self, amount): 
        print(f"Processing PayPal payment of ${amount}") 


class Stripe: 
    def process_payment(self, amount): 
        print(f"Processing Stripe payment of ${amount}") 
  

class BankTransfer: 
    def process_payment(self, amount): 
        print(f"Processing bank transfer payment of ${amount}") 


# Tightly coupled factory 
class PaymentGatewayFactory: 
    def create_gateway(self, gateway_type): 
        if gateway_type == "paypal": 
            return PayPal() 
        elif gateway_type == "stripe": 
            return Stripe() 
        elif gateway_type == "bank_transfer": 
            return BankTransfer() 
        else: 
            raise ValueError("Invalid gateway type") 


# Usage example 
factory = PaymentGatewayFactory() 
gateway = factory.create_gateway("paypal") 
gateway.process_payment(100) 


# Adding a new product type requires modifying the factory 
class ApplePay: 
    def process_payment(self, amount): 
        print(f"Processing Apple Pay payment of ${amount}") 


# Modified factory with added support for Apple Pay 
class PaymentGatewayFactoryModified: 

    def create_gateway(self, gateway_type): 
        if gateway_type == "paypal": 
            return PayPal() 
        elif gateway_type == "stripe": 
            return Stripe() 
        elif gateway_type == "bank_transfer": 
            return BankTransfer() 
        elif gateway_type == "apple_pay":  # Added support for Apple Pay 
            return ApplePay() 
        else: 
            raise ValueError("Invalid gateway type") 
