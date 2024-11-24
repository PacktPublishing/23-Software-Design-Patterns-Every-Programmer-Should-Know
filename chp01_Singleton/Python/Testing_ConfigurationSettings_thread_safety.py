import threading
import unittest

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
        return getattr(self, 'config', None)

    def set_config(self, config):
        self.config = config

    @classmethod
    def reset_instance(cls):
        with cls._lock:
            cls._instance = None

class TestConfigurationSettings(unittest.TestCase):
    def setUp(self):
        ConfigurationSettings.reset_instance()

    def test_singleton_instance(self):
        instance1 = ConfigurationSettings()
        instance2 = ConfigurationSettings()
        self.assertIs(instance1, instance2)

    def test_set_and_get_config(self):
        instance = ConfigurationSettings()
        instance.set_config("Test Config")
        self.assertEqual(instance.get_config(), "Test Config")

    def test_reset_instance(self):
        instance1 = ConfigurationSettings()
        ConfigurationSettings.reset_instance()
        instance2 = ConfigurationSettings()
        self.assertIsNot(instance1, instance2)

    def test_thread_safety(self):
        def access_instance(thread_id):
            instance = ConfigurationSettings()
            instance.set_config(f"Thread {thread_id} Settings")

        threads = []
        for i in range(10):
            thread = threading.Thread(target=access_instance, args=(i,))
            threads.append(thread)
            thread.start()

        for thread in threads:
            thread.join()

        # Verify that the singleton instance remains consistent
        final_instance = ConfigurationSettings()
        self.assertIsNotNone(final_instance.get_config())

if __name__ == "__main__":
    unittest.main()
