# pylint: disable=no-member

from rest_framework import serializers

import locator.models as models

class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Day
        fields = [
            "id",
            "name",
            "abbreviation",
        ]