from django.contrib.auth.models import User

from rest_framework import status, viewsets, views
# from rest_framework.decorators import permission_classes
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated, IsAuthenticatedOrReadOnly,
)
from rest_framework.views import APIView

from .models import Profile, Bookmark, UserType
from .serializers import (
    UserSerializer, ProfileSerializer, BookmarkSerializer, UserTypeSerializer,
    RegisterSerializer, LoginSerializer,
)
from .permissions import IsOwnerOnly

from knox.models import AuthToken

# pylint: disable=no-member

class UserExistsView(APIView):

    def get(self, request, *args, **kwargs):
        username = self.request.query_params.get('username')  

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"message": False})
        return Response({"message": True})
            

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

class RegisterAPI(GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = str(AuthToken.objects.create(user)[0]).split(" : ")[0]
            return Response({
                "user": UserSerializer(
                    user, 
                    context=self.get_serializer_context()).data,
                    "token": token,
            })

class LoginAPI(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data
            token = str(AuthToken.objects.create(user)[1])
            print(token)
            return Response({
                "user": UserSerializer(
                    user, 
                    context=self.get_serializer_context()).data,
                "token": token,
            })         

class UserAPI(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user