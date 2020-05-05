from rest_framework import routers
from locator.api import LocationViewSet

from django.urls import path

from . import views

# router = routers.DefaultRouter()
# router.register("api/location", LocationViewSet, "location")

# urlpatterns = router.urls

urlpatterns = [
    # "index" is accessible in templates
    # Accessed by (Example): href="{% url 'index' %}"
    path('', views.index, name='index'),
    path('locator/service/<int:pk>/', views.service, name="service"),
    path('locator/location/new/', views.new_location, name="new_location"),
    # path('locator/location/<int:pk>/', views.location, name="location"),
    path('locator/location/<int:pk>/', views.LocationDetailView.as_view(), name="location"),
    path('locator/contacts/<int:pk>/', views.contacts, name="contacts"),
    path(
        'locator/service_hours/<int:pk>/', 
        views.service_hours, 
        name="service_hours"
    ),
    path('locator/op_hours/<int:pk>/', views.op_hours, name="op_hours"),
]