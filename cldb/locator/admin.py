from django.contrib import admin

# Register your models here.
from .models import Service, Location, LocationCategory, CcfCategory, DayTimeRange, ServiceTimeRange, Rating, Contacts, AuthMethod

admin.site.site_header = "Clinic Locator & Database"
admin.site.site_title = "CLDB Admin Area"
admin.site.index_title = "Welcome to the CLDB Admin Tool"

admin.site.register(AuthMethod)
admin.site.register(Contacts)
admin.site.register(Rating)
admin.site.register(Service)
admin.site.register(Location)
admin.site.register(LocationCategory)
admin.site.register(CcfCategory)
admin.site.register(DayTimeRange)
admin.site.register(ServiceTimeRange)
