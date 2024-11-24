class ConfigurationSettings: 

    _instance = None 

    def __new__(cls): 

        if cls._instance is None: 

            cls._instance = super(ConfigurationSettings, cls).__new__(cls) 

        return cls._instance 

    def get_config(self): 

        return self.config 

    def set_config(self, config): 

        self.config = config 

# Usage 

config_settings = ConfigurationSettings() 

config_settings.set_config("Server Settings") 

print(config_settings.get_config())  # Output: Server Settings