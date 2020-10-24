from django.urls import include, path
from knox import views as knox_views

from users.api import RegisterAPI, LoginAPI, UserAPI

urlpatterns = [
    path("api/auth/login/", LoginAPI.as_view()),
    path("api/auth/register/", RegisterAPI.as_view()),
    path("api/auth/user/", UserAPI.as_view()),
    path(
        "api/auth/logout/", 
        knox_views.LogoutView.as_view(), 
        name="knox_logout")
]