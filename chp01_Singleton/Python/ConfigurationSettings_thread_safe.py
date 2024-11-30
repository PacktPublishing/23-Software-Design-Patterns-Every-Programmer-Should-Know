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

# Usage
config_settings1 = ConfigurationSettings()
config_settings2 = ConfigurationSettings()
config_settings1.set_config("Server Settings")
print(config_settings1 is config_settings2)  # Output: True 
print(config_settings1.get_config())  # Output: Server Settings
print(config_settings2.get_config())  # Output: Server Settings