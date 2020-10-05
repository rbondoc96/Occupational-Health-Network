from rest_framework import serializers

import locator.models as models

import users.serializers as user_serializers

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

class ReviewTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ReviewType
        fields = [
            "id",
            "name",
        ]

class ReviewSerializer(serializers.ModelSerializer):
    owner = user_serializers.UserSerializer(read_only=True)
    # location = MinimalLocationSerializer(read_only=True)
    review_type = ReviewTypeSerializer(read_only=True)

    class Meta:
        model = models.Review
        fields = [
            "id",
            "location",
            "review_type",
            "owner",
            "rating",
            "comments",
            "date_edited",
            "date_submitted",
        ]