from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from . import api

router = DefaultRouter()
router.register(r"locations", api.LocationViewSet)
router.register(r"reviews", api.ReviewViewSet)
router.register(r"contacts", api.ContactsViewSet)
router.register(r"op_hours", api.DayTimeRangeViewSet)
router.register(r"service_hours", api.ServiceTimeRangeViewSet, basename="service_hours")
router.register(r"services", api.ServiceViewSet, basename="services")
router.register(r"service_categories", api.ServiceCategoryViewSet)
router.register(r"location_categories", api.LocationCategoryViewSet)
router.register(r"ccf_categories", api.CcfCategoryViewSet)
router.register(r"auth_methods", api.AuthMethodViewSet)
# router.register(r"search", api.SearchLocationViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/search/", api.search_location_by_zipcode),
    path('', views.index, name='index'),
    path('location/new/', views.new_location, name="new_location"),
    path('location/search/', views.search, name="search"),
    path(
        'location/<slug:slug>/', 
        views.LocationDetailView.as_view(), 
        name="location_detail"
    ),
    path(
        'location/update/<slug:slug>/', 
        views.LocationUpdateView.as_view(), 
        name="update_location"
    ),
    path(
        'location/reviews/<slug:slug>/', 
        views.ReviewListView.as_view(), 
        name="review_list"
    ),
        path(
        'location/contacts/<slug:slug>/', 
        views.ContactsListView.as_view(), 
        name="contacts_list"
    ),
        path(
        'location/op-hours/<slug:slug>/', 
        views.DayTimeRangeListView.as_view(), 
        name="op_hours_list"
    ),
        path(
        'location/service-hours/<slug:slug>/', 
        views.ServiceTimeRangeListView.as_view(), 
        name="service_hours_list"
    ),
    path("locator/", views.search, name="search"),
    path(
        'api/location/<int:pk>/contacts/add/', 
        api.add_contact_to_location, 
        name="add_contact_to_location"
    ),
    path('api/gmapAPI/<int:pk>/', api.imgFromLocation, name="ifl"),
]