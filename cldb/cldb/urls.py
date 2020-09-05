# pylint: disable=import-error

from django.contrib import admin
from django.urls import include, path

from .router import router

from users import views as user_views
from users import api as user_api

from . import popups as popups

urlpatterns = [
    path("", include("locator.urls")),
    path("api/", include(router.urls)),
    path("api/exists/", user_api.UserExistsView.as_view(), name="exists"),
    path("admin/", admin.site.urls),
    path("login/", user_views.login_register_view, name="login_register"),
    path("logout/", user_views.logout_view, name="logout"),
    path("dashboard/", user_views.dashboard, name="dashboard"),
    path("bookmarks/", user_views.bookmarks, name="bookmarks"),
    path("settings/", user_views.settings, name="settings"),
    path(
        "disclaimer/", 
        user_views.disclaimer, 
        name="disclaimer",
    ),
    path(
        "popups/disclaimer",
        popups.disclaimer,
        name="disclaimer_popup",
    ),
    path(
        "popups/login",
        popups.login_register,
        name="login_popup",
    ),
]
