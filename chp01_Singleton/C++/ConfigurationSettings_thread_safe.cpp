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
};

ConfigurationSettings* ConfigurationSettings::instance = nullptr;
std::once_flag ConfigurationSettings::initInstanceFlag;

int main() {
    ConfigurationSettings& settings = ConfigurationSettings::getInstance();
    std::cout << settings.getSetting("godOfTheUnderworld") << std::endl;
    return 0;
}
