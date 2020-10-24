from django.apps import AppConfig


class LocatorConfig(AppConfig):
    name = 'locator'

    def ready(self):
        import locator.signals
