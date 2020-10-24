from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from . import api

handler404 = "locator.views.handler404"

urlpatterns = [
    # path("", views.index, name="index"),
    path("api/search/", api.SearchView.as_view(), name="search"),
    # path(
    #     "api/review_stats/", 
    #     api.ReviewStatsView.as_view(), 
    #     name="review_stats"
    # ),
    # path("explore/", views.explore, name="explore"),
    # path("add/", views.add_location, name="add_location"),
    # path(
    #     'locations/<slug:slug>/', 
    #     views.LocationDetailView.as_view(), 
    #     name="location_detail"
    # ),    
    # path(
    #     'locations/<slug:slug>/update/', 
    #     views.LocationUpdateView.as_view(), 
    #     name="update_location"
    # ),    
    # path(
    #     "locations/<slug:slug>/delete/",
    #     views.LocationDeleteView.as_view(),
    #     name="delete_location"
    # ),
    # path(
    #     "locations/<slug:slug>/review/",
    #     views.review_location,
    #     name="review_location",
    # ),
    # path(
    #     "locations/review/submitted/",
    #     views.review_submitted,
    #     name="review_submitted",
    # ),
    # path(
    #     'locations/reviews/<slug:slug>/', 
    #     views.ReviewListView.as_view(), 
    #     name="review_list"
    # ),
]