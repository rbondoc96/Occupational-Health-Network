import re

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework import serializers

from users.models import UserType, Profile, Bookmark

#pylint: disable=no-member
class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserType
        fields = [
            "id",
            "name",
        ]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
        ]

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    class Meta:
        model = Profile
        fields = [
            "id",
            "user",
            "user_type",
        ]

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
        ]
        extra_kwargs = {"password" : {"write_only": True}}

    def validate(self, data):
        regex = re.compile("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$")
        
        if not regex.match(data.get("password")):
            raise serializers.ValidationError({
                "password": "".join([
                    "Invalid password format. ",
                    "Must be longer than 8 characters, ",
                    "have at least 1 uppercase letter, ",
                    "1 lowercase letter, 1 special character ",
                    "(!, @, #, $, %, ^, &, *), and 1 digit.",
                ])
            })
        elif data.get("password") != data.get("password2"):
            raise serializers.ValidationError({
                "password2": "".join([
                    "Passwords do not match."
                ])
            }) 
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data.get("username"),
            validated_data.get("email"),
            validated_data.get("password"))
        
        # .title() normalizes capitalization of the name, works with 
        # apostrophies and hyphens
        user.first_name = validated_data.get("first_name").title()
        user.last_name = validated_data.get("last_name").title()
        user.save()

        Profile.objects.create(
            user=user, 
            user_type=UserType.objects.get(name="Patient"))

        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        
        if user and user.is_active:
            return user
        raise serializers.ValidationError({
            "username": "".join([
                "An account with this email and password does not exist."
            ])
        })

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = [
            "id",
            "owner",
            "location",
        ]