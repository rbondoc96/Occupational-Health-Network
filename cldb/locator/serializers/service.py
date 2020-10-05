# pylint: disable=no-member

from rest_framework import serializers

import locator.models as models

class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ServiceCategory
        fields = [
            "id",
            "name",
        ]

class ServiceSerializer(serializers.ModelSerializer):
    service_category = ServiceCategorySerializer(read_only=True)
    class Meta:
        model = models.Service
        fields = [
            "id",
            "service_category",
            "name",
            "simple_name",
            "description",
            "simple_description",
        ]

class MinimalServiceSerializer(serializers.ModelSerializer):
    service_category = ServiceCategorySerializer(read_only=True)
    class Meta:
        model = Service
        fields = [
            "id",
            "service_category",
            "name",
            "simple_name",
            "simple_description",
        ]        