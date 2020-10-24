# pylint: disable=no-member

from rest_framework import serializers

import locator.models as models

class ContactSerializer(serializers.ModelSerializer):    
    location = serializers.StringRelatedField()

    class Meta:
        model = models.Contacts
        fields = [
            "id",
            "location",
            "name",
            "title",
            "phone",
            "email",
        ]

class ContactCreateSerializer(serializers.ModelSerializer):    
    class Meta:
        model = models.Contacts
        fields = [
            "id",
            "location",
            "name",
            "title",
            "phone",
            "email",
        ]


# class DetailedContactsSerializer(serializers.ModelSerializer):
#     # location = MinimalLocationSerializer(read_only=True)
    
#     class Meta:
#         model = models.Contacts
#         fields = [
#             "id",
#             "location",
#             "name",
#             "title",
#             "phone",
#             "email",
#         ]        