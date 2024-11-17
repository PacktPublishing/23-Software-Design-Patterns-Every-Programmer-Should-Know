import threading

class ConfigurationSettings:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super(ConfigurationSettings, cls).__new__(cls)
        return cls._instance

    def get_config(self):
        return self.config

    def set_config(self, config):
        self.config = config

    @classmethod
    def reset_instance(cls):
        with cls._lock:
            cls._instance = None

# Test class using Dependency Injection
class ConfigurationSettingsTest:
    def __init__(self, configuration_settings):
        self.configuration_settings = configuration_settings

    def run_test(self):
        # Example test case: set and get configuration
        self.configuration_settings.set_config("Test Settings")
        config_value = self.configuration_settings.get_config()
        print(f"Configuration Value: {config_value}")

# Usage
config_settings1 = ConfigurationSettings()
config_settings2 = ConfigurationSettings()
config_settings1.set_config("Server Settings")
print(config_settings1 is config_settings2)  # Output: True 
print(config_settings1.get_config())  # Output: Server Settings
print(config_settings2.get_config())  # Output: Server Settings

# Dependency Injection Example
config_test = ConfigurationSettingsTest(config_settings1)
config_test.run_test()  # Output: Configuration Value: Test Settings

# Reset Singleton Instance for Testing Purposes
ConfigurationSettings.reset_instance()
config_settings3 = ConfigurationSettings()
print(config_settings1 is config_settings3)  # Output: False (since the singleton instance was reset)
config_settings3.set_config("New Server Settings")
print(config_settings3.get_config())  # Output: New Server Settings
