from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from . import api

urlpatterns = [
    path("", views.index, name="index"),
    path("api/search/", api.SearchView.as_view(), name="search"),
    path("explore/", views.explore, name="explore"),
    path("add/", views.add_location, name="add_location"),
    path(
        'locations/<slug:slug>/', 
        views.LocationDetailView.as_view(), 
        name="location_detail"
    ),
    path(
        "locations/<slug:slug>/review",
        views.review_location,
    ),
    path(
        'locations/update/<slug:slug>/', 
        views.LocationUpdateView.as_view(), 
        name="update_location"
    ),
    path(
        'locations/reviews/<slug:slug>/', 
        views.ReviewListView.as_view(), 
        name="review_list"
    ),
        path(
        'locations/contacts/<slug:slug>/', 
        views.ContactsListView.as_view(), 
        name="contacts_list"
    ),
        path(
        'locations/op-hours/<slug:slug>/', 
        views.DayTimeRangeListView.as_view(), 
        name="op_hours_list"
    ),
        path(
        'locations/service-hours/<slug:slug>/', 
        views.ServiceTimeRangeListView.as_view(), 
        name="service_hours_list"
    ),
]