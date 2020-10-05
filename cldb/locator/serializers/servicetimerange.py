# pylint: disable=no-member

from rest_framework import serializers

import locator.models as models

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

class DetailedServiceTimeRangeSerializer(serializers.ModelSerializer):
    location = MinimalLocationSerializer(read_only=True)
    days = DaySerializer(many=True, read_only=True)

    class Meta:
        model = ServiceTimeRange
        fields = [
            "id",
            "location",
            "name",
            "start_time",
            "end_time",
            "days",
        ]        