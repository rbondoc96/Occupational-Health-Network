# pylint: disable=no-member

from rest_framework import serializers

import locator.models as models

from locator.serializers.review import ReviewSerializer
from locator.serializers.service import ServiceSerializer
from locator.serializers.contact import ContactSerializer
from locator.serializers.auth_method import AuthMethodSerializer

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
    ReviewType,
    Day,
)

class LocationCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LocationCategory
        fields = [
            "id",
            "name",
        ]

class LocationCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LocationComment
        fields= [
            "id",
            "owner",
            "location",
            "comment",
            "date_submitted",
            "date_edited",
        ]

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = [
            "id",
            "name",
            "branch_name",
        ]

class LocationDetailSerializer(serializers.ModelSerializer):
    location_category = LocationCategorySerializer(read_only=True)

    service_list = ServiceSerializer(many=True, read_only=True)
    # ccf_category_list = CcfCategorySerializer(many=True, read_only=True)
    auth_method_list = AuthMethodSerializer(many=True, read_only=True)

    comments = LocationCommentSerializer(
        source="locationcomment_set",
        many=True,
        read_only=True,
    )
    reviews = ReviewSerializer(
        source="review_set",
        many=True, 
        read_only=True
    )
    contacts = ContactSerializer(
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
        model = models.Location
        lookup_field = "slug"
        extra_kwargs = {
            "url": {
                "lookup_field": "slug"
            }
        }
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
            "reviews",
            "service_list",
            "ccf_category_list",
            "auth_method_list",
            "contacts",
            "op_hours",
            "service_hours",
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
    # ccf_category_list = CcfCategorySerializer(many=True, read_only=True)
    auth_method_list = AuthMethodSerializer(many=True, read_only=True)

    reviews = ReviewSerializer(
        source="review_set",
        many=True, 
        read_only=True
    )
    contacts = ContactSerializer(
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
        lookup_field = "slug"
        extra_kwargs = {
            "url": {
                "lookup_field": "slug"
            }
        }
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
            "reviews",
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