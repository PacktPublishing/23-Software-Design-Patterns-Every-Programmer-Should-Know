from abc import ABC, abstractmethod

# Abstract Products
class IoTDevice(ABC):
    @abstractmethod
    def connect(self) -> None:
        pass


class IoTController(ABC):
    @abstractmethod
    def configure(self) -> None:
        pass


# Concrete Products for Zigbee
class ZigbeeDevice(IoTDevice):
    def connect(self) -> None:
        print("Connecting to Zigbee device...")

class ZigbeeController(IoTController):
    def configure(self) -> None:
        print("Configuring Zigbee controller...")

# Concrete Products for Bluetooth
class BluetoothDevice(IoTDevice):
    def connect(self) -> None:
        print("Connecting to Bluetooth device...")

class BluetoothController(IoTController):
    def configure(self) -> None:
        print("Configuring Bluetooth controller...")


# Abstract Factory
class IoTFactory(ABC):
    @abstractmethod
    def create_device(self) -> IoTDevice:
        pass

    @abstractmethod
    def create_controller(self) -> IoTController:
        pass


# Concrete Factories
class ZigbeeFactory(IoTFactory):
    def create_device(self) -> IoTDevice:
        return ZigbeeDevice()

    def create_controller(self) -> IoTController:
        return ZigbeeController()

class BluetoothFactory(IoTFactory):
    def create_device(self) -> IoTDevice:
        return BluetoothDevice()

    def create_controller(self) -> IoTController:
        return BluetoothController()


# Client Code
def client_code(factory: IoTFactory) -> None:
    # Use the factory to create a device and a controller
    device = factory.create_device()
    controller = factory.create_controller()

    # Interact with the device and controller
    device.connect()
    controller.configure()


# Usage
if __name__ == "__main__":
    print("Using Zigbee Factory:")
    zigbee_factory = ZigbeeFactory()
    client_code(zigbee_factory)

    print("\nUsing Bluetooth Factory:")
    bluetooth_factory = BluetoothFactory()
    client_code(bluetooth_factory)
