// might need to install gtest: brew install googletest

#include <iostream>
#include <string>
#include <mutex>
#include <thread>
#include <vector>
#include <gtest/gtest.h>

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

// Thread Safety Test using Google Test
TEST(ConfigurationSettingsTest, SingletonThreadSafety) {
    const int numThreads = 10;
    std::vector<std::thread> threads;
    ConfigurationSettings* instances[numThreads];

    // Launch multiple threads to access the singleton instance concurrently
    for (int i = 0; i < numThreads; ++i) {
        threads.emplace_back([&, i]() {
            instances[i] = &ConfigurationSettings::getInstance();
        });
    }

    // Join all threads
    for (auto& thread : threads) {
        thread.join();
    }

    // Verify that all instances are the same
    ConfigurationSettings* firstInstance = instances[0];
    for (int i = 1; i < numThreads; ++i) {
        EXPECT_EQ(firstInstance, instances[i]);
    }
}

int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
