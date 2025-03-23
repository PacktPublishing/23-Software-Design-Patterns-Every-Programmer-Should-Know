from abc import ABC, abstractmethod

# Step 1: Define the Implementor interface
class NotificationChannel(ABC):
    @abstractmethod
    def send(self, message: str):
        pass

# Step 2: Create Concrete Implementors
class EmailChannel(NotificationChannel):
    def send(self, message: str):
        print(f"Sending Email: {message}")

class SMSChannel(NotificationChannel):
    def send(self, message: str):
        print(f"Sending SMS: {message}")

class SlackChannel(NotificationChannel):
    def send(self, message: str):
        print(f"Sending Slack message: {message}")

# Step 3: Define the Abstraction
class NotificationSender(ABC):
    def __init__(self, channel: NotificationChannel):
        self.channel = channel

    @abstractmethod
    def notify(self, message: str):
        pass

# Step 4: Create Refined Abstractions
class UrgentNotification(NotificationSender):
    def notify(self, message: str):
        self.channel.send(f"[URGENT] {message}")

class CasualNotification(NotificationSender):
    def notify(self, message: str):
        self.channel.send(f"[INFO] {message}")

# Step 5 & 6: Use in Client Code
if __name__ == "__main__":
    # Create different channel implementations
    email_channel = EmailChannel()
    sms_channel = SMSChannel()
    slack_channel = SlackChannel()

    # Pair them with different abstraction types
    urgent_email = UrgentNotification(email_channel)
    casual_sms = CasualNotification(sms_channel)
    urgent_slack = UrgentNotification(slack_channel)

    # Trigger notifications
    urgent_email.notify("System outage detected!")
    casual_sms.notify("Your order has been shipped.")
    urgent_slack.notify("Critical security update required.")