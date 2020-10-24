# pylint: disable=no-member

from rest_framework import serializers

import locator.models as models

from locator.serializers.day import DaySerializer

class DayTimeRangeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DayTimeRange
        fields = [
            "id",
            "location",
            "day",
            "start_time",
            "end_time",
        ]

class DayTimeRangeSerializer(serializers.ModelSerializer):
    location = serializers.StringRelatedField()
    day = DaySerializer()

    start_time = serializers.TimeField(format="%I:%M %p")
    end_time = serializers.TimeField(format="%I:%M %p")    
    
    class Meta:
        model = models.DayTimeRange
        fields = [
            "id",
            "location",
            "day",
            "start_time",
            "end_time",
        ]        