#include <iostream>
#include <memory>

// Abstract Product: IoTDevice
class IoTDevice {
public:
    virtual void connect() const = 0;
    virtual ~IoTDevice() = default;
};

// Abstract Product: IoTController
class IoTController {
public:
    virtual void configure() const = 0;
    virtual ~IoTController() = default;
};

// Concrete Products for Zigbee
class ZigbeeDevice : public IoTDevice {
public:
    void connect() const override {
        std::cout << "Connecting to Zigbee device..." << std::endl;
    }
};

class ZigbeeController : public IoTController {
public:
    void configure() const override {
        std::cout << "Configuring Zigbee controller..." << std::endl;
    }
};

// Concrete Products for Bluetooth
class BluetoothDevice : public IoTDevice {
public:
    void connect() const override {
        std::cout << "Connecting to Bluetooth device..." << std::endl;
    }
};

class BluetoothController : public IoTController {
public:
    void configure() const override {
        std::cout << "Configuring Bluetooth controller..." << std::endl;
    }
};

// Abstract Factory
class IoTFactory {
public:
    virtual std::unique_ptr<IoTDevice> createDevice() const = 0;
    virtual std::unique_ptr<IoTController> createController() const = 0;
    virtual ~IoTFactory() = default;
};

// Concrete Factory for Zigbee
class ZigbeeFactory : public IoTFactory {
public:
    std::unique_ptr<IoTDevice> createDevice() const override {
        return std::make_unique<ZigbeeDevice>();
    }

    std::unique_ptr<IoTController> createController() const override {
        return std::make_unique<ZigbeeController>();
    }
};

// Concrete Factory for Bluetooth
class BluetoothFactory : public IoTFactory {
public:
    std::unique_ptr<IoTDevice> createDevice() const override {
        return std::make_unique<BluetoothDevice>();
    }

    std::unique_ptr<IoTController> createController() const override {
        return std::make_unique<BluetoothController>();
    }
};

// Client Code
void clientCode(const IoTFactory& factory) {
    auto device = factory.createDevice();
    auto controller = factory.createController();

    device->connect();
    controller->configure();
}

// Main Function
int main() {
    std::cout << "Using Zigbee Factory:" << std::endl;
    ZigbeeFactory zigbeeFactory;
    clientCode(zigbeeFactory);

    std::cout << "\nUsing Bluetooth Factory:" << std::endl;
    BluetoothFactory bluetoothFactory;
    clientCode(bluetoothFactory);

    return 0;
}
