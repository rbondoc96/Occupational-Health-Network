# pylint: disable=no-member

from rest_framework import serializers

import locator.models as models

class CcfCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CcfCategory
        fields = [
            "id",
            "name",
        ]