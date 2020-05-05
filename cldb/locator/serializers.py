from rest_framework import serializers
from locator.models import (
    Location, 
    Service,
    ServiceTimeRange, 
    DayTimeRange, 
    Contacts,
)

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            "id",
            "service_category",
            "name",
            "simple_name",
        ]

# pylint: disable=no-member
class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = [
            "id",
            "location_category",
            "name",
            "branch_name",
            "street_line_1",
            "street_line_2",
            "city",
            "state",
            "zipcode",
            "phone",
            "is_phone_callable",
            "fax",
            "website",
            "comments",
            "last_verified",
            "service_list",
            "ccf_category_list",
            "auth_method_list",
        ]
        # fields = "__all__"

class ContactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        fields = [
            "id",
            "name",
            "title",
            "phone",
            "email",
        ]

class DayTimeRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DayTimeRange
        fields = [
            "id",
            "day",
            "start_time",
            "end_time",
        ]

class ServiceTimeRangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceTimeRange
        fields = [
            "id",
            "name",
            "start_time",
            "end_time",
        ]
