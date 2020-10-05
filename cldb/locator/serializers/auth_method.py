# pylint: disable=no-member

from rest_framework import serializers

import locator.models as models

class AuthMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AuthMethod
        fields = [
            "id",
            "name",
        ]