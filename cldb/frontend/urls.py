# pylint: disable=import-error

from django.urls import include, path, re_path

from frontend import views

urlpatterns = [
    path("", views.index, name="index"),
    path("add/", views.index, name="index"),
    path("explore/", views.index, name="index"),
    path("login/", views.index, name="index"),
    path("logout/", views.index, name="index"),
    re_path(
        r'^location/([a-z0-9]+(?:-[a-z0-9]+)*)/$', 
        views.index, 
    ),
    re_path(
        r'^location/([a-z0-9]+(?:-[a-z0-9]+)*)/update/$', 
        views.index, 
    ),
    # re_path(r"^.*$", views.index),
]