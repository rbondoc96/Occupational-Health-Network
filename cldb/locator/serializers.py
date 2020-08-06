from django.contrib.auth.models import User

from rest_framework import serializers
from locator.models import (
    Location, 
    LocationCategory,
    Service,
    ServiceTimeRange, 
    ServiceCategory,
    DayTimeRange, 
    CcfCategory,
    AuthMethod,
    Contacts,
    Review,
)

# pylint: disable=no-member

class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = [
            "id",
            "name",
        ]

class CcfCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CcfCategory
        fields = [
            "id",
            "name",
        ]

class AuthMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthMethod
        fields = [
            "id",
            "name",
        ]

class ServiceSerializer(serializers.ModelSerializer):
    service_category = ServiceCategorySerializer(read_only=True)
    class Meta:
        model = Service
        fields = [
            "id",
            "service_category",
            "name",
            "simple_name",
            "description",
            "simple_description",
        ]

class MinimalServiceSerializer(serializers.ModelSerializer):
    service_category = ServiceCategorySerializer(read_only=True)
    class Meta:
        model = Service
        fields = [
            "id",
            "service_category",
            "name",
            "simple_name",
            "simple_description",
        ]

class LocationCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationCategory
        fields = [
            "id",
            "name",
        ]

class MinimalLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = [
            "id",
            "name",
            "branch_name",
        ]
    
class ContactsCreateSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Contacts
        fields = [
            "id",
            "location",
            "name",
            "title",
            "phone",
            "email",
        ]

class DayTimeRangeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = DayTimeRange
        fields = [
            "id",
            "location",
            "day",
            "start_time",
            "end_time",
        ]

class ServiceTimeRangeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceTimeRange
        fields = [
            "id",
            "location",
            "name",
            "start_time",
            "end_time",
        ]

class DetailedContactsSerializer(serializers.ModelSerializer):
    location = MinimalLocationSerializer(read_only=True)
    
    class Meta:
        model = Contacts
        fields = [
            "id",
            "location",
            "name",
            "title",
            "phone",
            "email",
        ]

class DetailedDayTimeRangeSerializer(serializers.ModelSerializer):
    location = MinimalLocationSerializer(read_only=True)

    class Meta:
        model = DayTimeRange
        fields = [
            "id",
            "location",
            "day",
            "start_time",
            "end_time",
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

class DetailedServiceTimeRangeSerializer(serializers.ModelSerializer):
    location = MinimalLocationSerializer(read_only=True)
    class Meta:
        model = ServiceTimeRange
        fields = [
            "id",
            "location",
            "name",
            "start_time",
            "end_time",
        ]
    
class LocationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = [
            "id",
            "slug",
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
            "date_created",
            "service_list",
            "ccf_category_list",
            "auth_method_list",
        ]

class DetailedLocationSerializer(serializers.ModelSerializer):
    location_category = LocationCategorySerializer(read_only=True)
    service_list = ServiceSerializer(many=True, read_only=True)
    ccf_category_list = CcfCategorySerializer(many=True, read_only=True)
    auth_method_list = AuthMethodSerializer(many=True, read_only=True)

    contacts = DetailedContactsSerializer(
        source="contacts_set", 
        many=True, 
        read_only=True,
    )
    op_hours = DetailedDayTimeRangeSerializer(
        source="daytimerange_set", 
        many=True,
        read_only=True,
    )
    service_hours = DetailedServiceTimeRangeSerializer(
        source="servicetimerange_set",
        many=True,
        read_only=True,
    )

    class Meta:
        model = Location
        fields = [
            "id",
            "slug",
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
            "date_created",
            "last_updated",
            "service_list",
            "ccf_category_list",
            "auth_method_list",
            "contacts",
            "op_hours",
            "service_hours",
        ]

class TrimmedLocationSerializer(serializers.ModelSerializer):
    location_category = LocationCategorySerializer(read_only=True)
    service_list = MinimalServiceSerializer(many=True, read_only=True)
    op_hours = DayTimeRangeSerializer(
        source="daytimerange_set", 
        many=True
    )

    class Meta:
        model = Location
        fields = [
            "id",
            "slug",
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
            "last_updated",
            "service_list",
            "op_hours",
        ]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
        ]

class ReviewSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    location = MinimalLocationSerializer(read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "location",
            "author",
            "like",
            "dislike",
            "comments",
        ]
