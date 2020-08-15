from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from . import api

urlpatterns = [
    path('', views.index, name='index'),
    path('location/new/', views.new_location, name="new_location"),
    path('location/search/', views.search, name="search"),
    path(
        'locations/<slug:slug>/', 
        views.LocationDetailView.as_view(), 
        name="location_detail"
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
    path("locator/", views.search, name="search"),
    path(
        'api/location/<int:pk>/contacts/add/', 
        api.add_contact_to_location, 
        name="add_contact_to_location"
    ),
]