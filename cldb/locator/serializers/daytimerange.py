# pylint: disable=no-member

from rest_framework import serializers

import locator.models as models

class DayTimeRangeSerializer(serializers.ModelSerializer):
    day = DaySerializer(read_only=True)

    class Meta:
        model = DayTimeRange
        fields = [
            "id",
            "day",
            "start_time",
            "end_time",
        ]

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

class DetailedDayTimeRangeSerializer(serializers.ModelSerializer):
    location = MinimalLocationSerializer(read_only=True)
    day = DaySerializer(read_only=True)

    class Meta:
        model = DayTimeRange
        fields = [
            "id",
            "location",
            "day",
            "start_time",
            "end_time",
        ]        