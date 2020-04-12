from django.contrib import admin

# Register your models here.
from .models import ServiceCategory, Service

admin.site.site_header = "Clinic Locator & Database"
admin.site.site_title = "CLDB Admin Area"
admin.site.index_title = "Welcome to the CLDB Admin Tool"

admin.site.register(ServiceCategory)
admin.site.register(Service)
