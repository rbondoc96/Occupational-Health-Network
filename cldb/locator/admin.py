from django.contrib import admin

# Register your models here.
from .models import (
    Day,
    Service,
    ServiceCategory, 
    Location, 
    LocationCategory, 
    CcfCategory, 
    DayTimeRange, 
    ServiceTimeRange, 
    Review, 
    ReviewType,
    Contacts, 
    AuthMethod
)

admin.site.site_header = "Occupational Health Network"
admin.site.site_title = "OCH Net Admin Area"
admin.site.index_title = "Welcome to the OCH Net Admin Tool"

class ReviewAdmin(admin.ModelAdmin):
    fields = [
        "location",
        "review_type",
        "owner",
        "rating",
        "comments",
        "date_edited",
        "date_submitted",
    ]

    readonly_fields = ["date_edited", "date_submitted"]

    class Meta:
        model = Review

admin.site.register(Day)
admin.site.register(AuthMethod)
admin.site.register(Contacts)
admin.site.register(Review, ReviewAdmin)
admin.site.register(ReviewType)
admin.site.register(Service)
admin.site.register(ServiceCategory)
admin.site.register(Location)
admin.site.register(LocationCategory)
admin.site.register(CcfCategory)
admin.site.register(DayTimeRange)
admin.site.register(ServiceTimeRange)
