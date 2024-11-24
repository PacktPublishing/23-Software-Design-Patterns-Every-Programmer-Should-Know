#include <iostream>
#include <string>

class ConfigurationSettings {
public:
    static ConfigurationSettings& getInstance() {
        static ConfigurationSettings instance;
        return instance;
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
};

int main() {
    ConfigurationSettings& settings = ConfigurationSettings::getInstance();
    std::cout << settings.getSetting("godOfTheUnderworld") << std::endl;
    return 0;
}