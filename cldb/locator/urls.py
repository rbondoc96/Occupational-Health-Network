from django.urls import path

from . import views

urlpatterns = [
    # "index" is accessible in templates
    # Accessed by (Example): href="{% url 'index' %}"
    path('', views.index, name='index'),
    path('locator/new/', views.new, name="new"),
]