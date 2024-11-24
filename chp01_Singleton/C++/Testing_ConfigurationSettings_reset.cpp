#include <iostream>
#include <string>
#include <mutex>

class ConfigurationSettings {
public:
    static ConfigurationSettings& getInstance() {
        // Use call_once to ensure the instance is created only once in a thread-safe manner
        std::call_once(initInstanceFlag, createInstance);
        return *instance;
    }

    static void resetInstance() {
        std::lock_guard<std::mutex> lock(instanceMutex);
        delete instance;
        instance = nullptr;
        std::cout << "ConfigurationSettings instance reset for testing purposes" << std::endl;
    }

    std::string getSetting(const std::string& key) {
        // Simulate getting a setting from a configuration file
        if (key == "godOfTheUnderworld") {
            return "Hades";
        }
        return "";
    }

private:
    ConfigurationSettings() {}
    ~ConfigurationSettings() {}

    // Declare but do not define copy constructor and assignment operator to prevent copying
    ConfigurationSettings(const ConfigurationSettings&);
    ConfigurationSettings& operator=(const ConfigurationSettings&);

    static void createInstance() {
        instance = new ConfigurationSettings();
    }

    static ConfigurationSettings* instance;
    static std::once_flag initInstanceFlag;
    static std::mutex instanceMutex;
};

ConfigurationSettings* ConfigurationSettings::instance = nullptr;
std::once_flag ConfigurationSettings::initInstanceFlag;
std::mutex ConfigurationSettings::instanceMutex;

// Test class using Dependency Injection
class ConfigurationSettingsTest {
public:
    ConfigurationSettingsTest(ConfigurationSettings& config) : configuration(config) {}

    void runTest() {
        std::string value = configuration.getSetting("godOfTheUnderworld");
        std::cout << "Test Configuration Value: " << value << std::endl;
    }

private:
    ConfigurationSettings& configuration;
};

int main() {
    ConfigurationSettings& settings = ConfigurationSettings::getInstance();
    std::cout << settings.getSetting("godOfTheUnderworld") << std::endl;

    // Dependency Injection Example
    ConfigurationSettingsTest configTest(settings);
    configTest.runTest();

    // Reset Singleton Instance for Testing Purposes
    ConfigurationSettings::resetInstance();
    ConfigurationSettings& settings2 = ConfigurationSettings::getInstance();
    std::cout << settings2.getSetting("godOfTheUnderworld") << std::endl;

    return 0;
}
