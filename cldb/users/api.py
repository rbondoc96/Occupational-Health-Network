from django.contrib.auth.models import User

from rest_framework import status, viewsets, views
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated, IsAuthenticatedOrReadOnly,
)

from .models import Profile, Bookmark, UserType
from .serializers import (
    UserSerializer, ProfileSerializer, BookmarkSerializer, UserTypeSerializer,
)
from .permissions import IsOwnerOnly

# pylint: disable=no-member

class UserTypesViewSet(viewsets.ModelViewSet):
    queryset = UserType.objects.all()
    serializer_class = UserTypeSerializer
    permission_classes = [
        IsAuthenticatedOrReadOnly,
    ]

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        IsAuthenticated
    ]

    def create(self, request):
        data = request.data
        user_serializer = UserSerializer(data=data.get("user"))
        user_type = data.get("user_type")

        print(user_type)

        if user_serializer.is_valid(raise_exception=True):
            user = user_serializer.save()

            profile = Profile.objects.create(user_id=user.id, user_type=user_type)
            profile_serializer = ProfileSerializer(profile)

            return Response(
                profile_serializer.data, 
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        