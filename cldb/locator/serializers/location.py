# pylint: disable=no-member

from django.dispatch import receiver
from django.db.models.signals import post_save

from rest_framework import serializers

import locator.models as models

from locator.serializers.review import ReviewSerializer
from locator.serializers.service import ServiceSerializer
from locator.serializers.contact import ContactSerializer
from locator.serializers.auth_method import AuthMethodSerializer
from locator.serializers.daytimerange import DayTimeRangeSerializer
from locator.serializers.servicetimerange import ServiceTimeRangeSerializer

from locator.models import (
    Location, 
    LocationCategory,
    Service,
    ServiceTimeRange, 
    ServiceCategory,
    DayTimeRange, 
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
    author = serializers.StringRelatedField()
    location = serializers.StringRelatedField()

    date_submitted = serializers.DateTimeField(format="%B %d, %Y at %I:%M %p")
    date_edited = serializers.DateTimeField(format="%B %d, %Y at %I:%M %p")

    class Meta:
        model = models.LocationComment
        fields= [
            "id",
            "author",
            "location",
            "comment",
            "date_submitted",
            "date_edited",
        ]

class LocationCommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LocationComment
        fields= [
            "id",
            "author",
            "location",
            "comment",
            "date_submitted",
            "date_edited",
        ]

class LocationSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()

    location_category = LocationCategorySerializer()
    service_list = ServiceSerializer(many=True)
    auth_method_list = AuthMethodSerializer(many=True)

    comments = LocationCommentSerializer(
        source="locationcomment_set",
        many=True,
        read_only=True,
    )
    contacts = ContactSerializer(
        source="contacts_set", 
        many=True, 
        read_only=True,
    )
    op_hours = DayTimeRangeSerializer(
        source="daytimerange_set", 
        many=True,
        read_only=True,
    )
    service_hours = ServiceTimeRangeSerializer(
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
            "average_rating",
            "service_list",
            "auth_method_list",
            "contacts",
            "op_hours",
            "service_hours",
        ]

    def get_average_rating(self, obj):
        reviews = Review.objects.all().filter(location=obj.id)
        if len(reviews) > 0:
            average = sum([r.rating for r in reviews]) / len(reviews)
            return round(average, 2)
        else:
            return "No reviews"

    def validate(self, data):
        print("Unvalidated")
        # Location Data
        # Business Hours data
        service_hours = data.get("service_hours_list")
        print(service_hours)
        print(service_hours[0])
        # Service Hours data
        # Contacts Hours data
        print(data)

    def create(self, validated_data):
        print(validated_data)

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
            "service_list",
            "auth_method_list",
        ]

    # def validate(self, data):
    #     print("Unvalidated")
    #     print(data)
    #     return data

    def create(self, validated_data):
        data = validated_data

        services = data.pop("service_list")
        auth_methods = data.pop("auth_method_list")

        location = Location.objects.create(**data)

        for service in services:
            location.service_list.add(service)
        
        for method in auth_methods:
            location.auth_method_list.add(method)

        return location

# class DetailedLocationSerializer(serializers.ModelSerializer):
#     location_category = LocationCategorySerializer(read_only=True)

#     service_list = ServiceSerializer(many=True, read_only=True)
#     # ccf_category_list = CcfCategorySerializer(many=True, read_only=True)
#     auth_method_list = AuthMethodSerializer(many=True, read_only=True)

#     reviews = ReviewSerializer(
#         source="review_set",
#         many=True, 
#         read_only=True
#     )
#     contacts = ContactSerializer(
#         source="contacts_set", 
#         many=True, 
#         read_only=True,
#     )
#     op_hours = DayTimeRangeSerializer(
#         source="daytimerange_set", 
#         many=True,
#         read_only=True,
#     )
#     service_hours = ServiceTimeRangeSerializer(
#         source="servicetimerange_set",
#         many=True,
#         read_only=True,
#     )

#     class Meta:
#         model = Location
#         lookup_field = "slug"
#         extra_kwargs = {
#             "url": {
#                 "lookup_field": "slug"
#             }
#         }
#         fields = [
#             "id",
#             "slug",
#             "location_category",
#             "name",
#             "branch_name",
#             "street_line_1",
#             "street_line_2",
#             "city",
#             "state",
#             "zipcode",
#             "phone",
#             "is_phone_callable",
#             "fax",
#             "website",
#             "comments",
#             "date_created",
#             "last_updated",
#             "reviews",
#             "service_list",
#             "ccf_category_list",
#             "auth_method_list",
#             "contacts",
#             "op_hours",
#             "service_hours",
#         ]

# class TrimmedLocationSerializer(serializers.ModelSerializer):
#     location_category = LocationCategorySerializer(read_only=True)
#     service_list = serializers.StringRelatedField(many=True)
#     op_hours = serializers.StringRelatedField(many=True)

#     class Meta:
#         model = Location
#         fields = [
#             "id",
#             "slug",
#             "location_category",
#             "name",
#             "branch_name",
#             "street_line_1",
#             "street_line_2",
#             "city",
#             "state",
#             "zipcode", 
#             "phone",
#             "is_phone_callable",
#             "fax",
#             "website",    
#             "last_updated",
#             "service_list",
#             "op_hours",
#         ]              