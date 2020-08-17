from rest_framework.routers import DefaultRouter

import locator.api as locator_api
import users.api as user_api

router = DefaultRouter()
router.register(r"user_types", user_api.UserTypesViewSet)
router.register(r"locations", locator_api.LocationViewSet)
router.register(r"reviews", locator_api.ReviewViewSet)
router.register(r"contacts", locator_api.ContactsViewSet)
router.register(r"op_hours", locator_api.DayTimeRangeViewSet)
router.register(r"service_hours", locator_api.ServiceTimeRangeViewSet, basename="service_hours")
router.register(r"services", locator_api.ServiceViewSet, basename="services")
router.register(r"service_categories", locator_api.ServiceCategoryViewSet)
router.register(r"location_categories", locator_api.LocationCategoryViewSet)
router.register(r"ccf_categories", locator_api.CcfCategoryViewSet)
router.register(r"auth_methods", locator_api.AuthMethodViewSet)