# pylint: disable=no-member

from rest_framework import serializers

import locator.models as models

from locator.serializers.service import ServiceCategorySerializer
from locator.serializers.day import DaySerializer

class ServiceTimeRangeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ServiceTimeRange
        fields = [
            "id",
            "location",
            "name",
            "start_time",
            "end_time",
            "days",
        ]

class ServiceTimeRangeSerializer(serializers.ModelSerializer):
    location = serializers.StringRelatedField()
    name = ServiceCategorySerializer()
    
    days = DaySerializer(many=True, read_only=True)

    start_time = serializers.TimeField(format="%I:%M %p")
    end_time = serializers.TimeField(format="%I:%M %p")

    class Meta:
        model = models.ServiceTimeRange
        fields = [
            "id",
            "location",
            "name",
            "start_time",
            "end_time",
            "days",
        ]        