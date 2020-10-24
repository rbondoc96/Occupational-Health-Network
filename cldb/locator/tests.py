import json 
from random import randint

from faker import Faker

from django.contrib.auth.models import User, Group
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.reverse import reverse as rest_reverse
from rest_framework.test import (
    APITestCase, APIClient, APIRequestFactory, force_authenticate
)
from rest_framework.authtoken.models import Token

from locator.api import (
    LocationViewSet,
)

from locator.models import (
    Location, LocationCategory, Service, ServiceCategory, 
    CcfCategory, AuthMethod, Day
)
from locator.utils import get_nearest_zipcodes

# pylint: disable=no-member

factory = APIRequestFactory()
user = User.objects.get(username="admin")

def createManager(user="admin", password="abcd@1234"):
    Group.objects.create(name="team member")
    manager = Group.objects.create(name="manager")
    
    user = User.objects.create(username=user, password=password)
    manager.user_set.add(user)
    return user

def setupDB():
    LocationCategory.objects.create(id=1, name="Urgent Care")
    LocationCategory.objects.create(id=2, name="Laboratory PSC Site")

    ServiceCategory.objects.create(id=1, name="Drug Screening")
    ServiceCategory.objects.create(id=2, name="HIV Screening")

    Service.objects.create(id=1, name="Titers")
    Service.objects.create(id=2, name="Drug Screens")

    AuthMethod.objects.create(id=1, name="Agency")
    AuthMethod.objects.create(id=2, name="eScreen")
    
    Day.objects.create(id=1, name="Monday", abbreviation="Mon")
    Day.objects.create(id=2, name="Tuesday", abbreviation="Tue")
    Day.objects.create(id=3, name="Wednesday", abbreviation="Wed")
    Day.objects.create(id=4, name="Thursday", abbreviation="Thu")
    Day.objects.create(id=5, name="Friday", abbreviation="Fri")
    Day.objects.create(id=6, name="Saturday", abbreviation="Sat")
    Day.objects.create(id=7, name="Sunday", abbreviation="Sun")

# def setupLocations(center=92115):
#     user = createManager(user="generator")
#     client = APIClient()
#     client.force_authenticate(user)

#     fake = Faker()

#     clinic_names = ["Concentra Urgent Care", "LabCorp"]
#     zipcodes = get_nearest_zipcodes(center)

#     for _ in range(20):
#         name_idx = randint(0,len(clinic_names)-1)
#         zip_idx = randint(0,len(zipcodes)-1)

#         zipcode = zipcodes[zip_idx]
#         # city = 
#         data = {
#             "location" : {
#                 "location_category": 1,
#                 "name": clinic_names[name_idx],
#                 "branch_name": fake.name() if name_idx == 0 else "",
#                 "street_line_1": fake.street_address(),
#                 "street_line_2": f"Suite {fake.building_number()}",
#                 "city": "San Diego",
#                 "state": "CA",
#                 "zipcode": zipcodes[zip_idx],
#                 "phone": "(614) 343-2343",
#                 "is_phone_callable": "true",
#                 "fax": "(614) 343-2344",
#                 "website": "https://concentra.com/",
#                 "comments": "idk1",
#                 "last_verified": "2020-01-20",
#                 "service_list": [1, 2],
#                 "ccf_category_list": [1, 2],
#                 "auth_method_list": [1, 2],
#             }
#         }
#         response = client.post("/api/locations/", data, format="json")


# class ServiceCategoryTestCase(APITestCase):
#     def setUp(self):
#         self.user = createManager(user="jdoe", password="abcd@1234")
    
#     def test_registration(self):
#         client = APIClient()
#         client.force_authenticate(self.user)
#         data = {
#             "name": "COVID-19 Testing",
#         }
#         response = client.post("/api/service_categories/", data, format="json")
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class LocationAPITest(TestCase):
    def setUp(self):
        setupDB()
        self.view_set = LocationViewSet
    
    def test_create(self):
        view = self.view_set.as_view({
            "post": "create"
        })
        data = {
            "location_category": "1",
            "name": "LabCorp",
            "branch_name": "",
            "street_line_1": "1234 Pumpkin Lane",
            "street_line_2": "Building B, Suite 3",
            "city": "San Diego",
            "state": "CA",
            "zipcode": "92103",
            "phone": "(614) 343-2343",
            "is_phone_callable": "true",
            "fax": "(614) 343-2344",
            "website": "https://concentra.com/",
            "service_list": ["1", "2"],
            "auth_method_list": ["1", "2"],
            "op_hours_list": [
                {
                    "key": "1603054451404", 
                    "start_time": "13:56", 
                    "end_time": "13:57", 
                    "day": "1"
                }, {
                    "key": "1603054456532", 
                    "start_time": "13:56", 
                    "end_time": "13:57", 
                    "day": "5"
                }
            ], 
            "service_hours_list": [
                {
                    "key": "1603054465740", 
                    "start_time": "01:54", 
                    "end_time": "13:56", 
                    "name": "1", 
                    "days": ["1", "2", "3"]
                }, {
                    "key": "1603054468932", 
                    "start_time": "01:54", 
                    "end_time": "13:56", 
                    "name": "2", 
                    "days": ["1", "2", "3"]
                },
            ], 
            "contacts_list": [
                {
                    "key": "1603054474533", 
                    "name": "rasdfqwerwer", 
                    "title": "wertwertwert", 
                    "phone": "7148018816", 
                    "email": "robo.media28@gmail.com"
                },
            ]
        }
        request = factory.post(
            "/api/locations/", 
            data, 
            format="json"
        )
        force_authenticate(request, user=user)
        response = view(request)
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)        

# class LocationTestCase(TestCase):
#     def setUp(self):
#         self.user = createManager()
#         setupDB()

#     def test_similar_location(self):
#         """
#         Tests the case where a location may have the same name, but a different address. Specifically:
#             - <name> is reoccuring (has multiple locations)
#             - <branch_name> is empty
#         """
#         client = APIClient()
#         client.force_authenticate(self.user)
#         data = {
#             "location" : {
#                 "location_category": 1,
#                 "name": "LabCorp",
#                 "branch_name": "",
#                 "street_line_1": "1234 Pumpkin Lane",
#                 "street_line_2": "Building B, Suite 3",
#                 "city": "San Diego",
#                 "state": "CA",
#                 "zipcode": "92103",
#                 "phone": "(614) 343-2343",
#                 "is_phone_callable": "true",
#                 "fax": "(614) 343-2344",
#                 "website": "https://concentra.com/",
#                 "comments": "idk1",
#                 "last_verified": "2020-01-20",
#                 "service_list": [1, 2],
#                 "ccf_category_list": [1, 2],
#                 "auth_method_list": [1, 2],
#             }
#         }
#         response = client.post(reverse("new_location"), data, format="json")
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         # print(response.data)

#         data = {
#             "location" : {
#                 "location_category": 1,
#                 "name": "LabCorp",
#                 "branch_name": "",
#                 "street_line_1": "4567 Strawberry Lane",
#                 "street_line_2": "Suite 300",
#                 "city": "San Diego",
#                 "state": "CA",
#                 "zipcode": "92103",
#                 "phone": "(614) 343-2343",
#                 "is_phone_callable": "true",
#                 "fax": "(614) 343-2344",
#                 "website": "https://concentra.com/",
#                 "comments": "idk1",
#                 "last_verified": "2020-01-20",
#                 "service_list": [1, 2],
#                 "ccf_category_list": [1, 2],
#                 "auth_method_list": [1, 2],
#             }
#         }
#         response = client.post(reverse("new_location"), data, format="json")
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         # print(response.data)

#     # Fixed to not fail (test is supposed to have a slug fail)
#     def test_intended_duplicate_location(self):
#         """
#         Tests for the case where the location is a duplicate, and violates the *intended* constraint where only name and branch_name are unique
#             - The original constraint <name_branch_name_street_line_1_key>
#               exists to compensate the above test, <test_similar_location()>
#             - The *intended* constraint is <name_branch_name_key>, and is 
#               reflected by the constaint on the <slug>, <location_slug_key>
#         Should throw an exception if whether street_line_1 is the same or not
#         """
#         client = APIClient()
#         client.force_authenticate(self.user)
#         data = {
#             "location" : {
#                 "location_category": 1,
#                 "name": "Concentra",
#                 "branch_name": "Hillcrest",
#                 "street_line_1": "5333 Mission Center Rd",
#                 "street_line_2": "Building B, Suite 3",
#                 "city": "San Diego",
#                 "state": "CA",
#                 "zipcode": "92103",
#                 "phone": "(614) 343-2343",
#                 "is_phone_callable": "true",
#                 "fax": "(614) 343-2344",
#                 "website": "https://concentra.com/",
#                 "comments": "idk1",
#                 "last_verified": "2020-01-20",
#                 "service_list": [1, 2],
#                 "ccf_category_list": [1, 2],
#                 "auth_method_list": [1, 2],
#             }
#         }
#         response = client.post(reverse("new_location"), data, format="json")
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         # print(response.data)

#         data = {
#             "location" : {
#                 "location_category": 1,
#                 "name": "Concentra",
#                 "branch_name": "Mission Valley",
#                 "street_line_1": "4567 Strawberry Lane",
#                 "street_line_2": "Suite 300",
#                 "city": "San Diego",
#                 "state": "CA",
#                 "zipcode": "92103",
#                 "phone": "(614) 343-2343",
#                 "is_phone_callable": "true",
#                 "fax": "(614) 343-2344",
#                 "website": "https://concentra.com/",
#                 "comments": "idk1",
#                 "last_verified": "2020-01-20",
#                 "service_list": [1, 2],
#                 "ccf_category_list": [1, 2],
#                 "auth_method_list": [1, 2],
#             }
#         }
#         response = client.post(reverse("new_location"), data, format="json")
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         # print(response.data)

#     # Fixed to not fail (test should violate unique constraint)
#     def test_true_duplicate_location(self):
#         """
#         Tests for the case where the location is a true duplicate, and
#         violates the constraint <name_branch_name_street_line_1_key>
#         """
#         client = APIClient()
#         client.force_authenticate(self.user)
#         data = {
#             "location" : {
#                 "location_category": 1,
#                 "name": "Concentra",
#                 "branch_name": "Hillcrest",
#                 "street_line_1": "5333 Mission Center Rd.",
#                 "street_line_2": "Building B, Suite 3",
#                 "city": "San Diego",
#                 "state": "CA",
#                 "zipcode": "92103",
#                 "phone": "(614) 343-2343",
#                 "is_phone_callable": "true",
#                 "fax": "(614) 343-2344",
#                 "website": "https://concentra.com/",
#                 "comments": "idk1",
#                 "last_verified": "2020-01-20",
#                 "service_list": [1, 2],
#                 "ccf_category_list": [1, 2],
#                 "auth_method_list": [1, 2],
#             }
#         }
#         response = client.post(reverse("new_location"), data, format="json")
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         # print(response.data)

#         data = {
#             "location" : {
#                 "location_category": 1,
#                 "name": "Concentra",
#                 "branch_name": "Mission Valley",
#                 "street_line_1": "5333 Mission Center Rd.",
#                 "street_line_2": "Building B, Suite 3",
#                 "city": "San Diego",
#                 "state": "CA",
#                 "zipcode": "92103",
#                 "phone": "(614) 343-2343",
#                 "is_phone_callable": "true",
#                 "fax": "(614) 343-2344",
#                 "website": "https://concentra.com/",
#                 "comments": "idk1",
#                 "last_verified": "2020-01-20",
#                 "service_list": [1, 2],
#                 "ccf_category_list": [1, 2],
#                 "auth_method_list": [1, 2],
#             }
#         }
#         response = client.post(reverse("new_location"), data, format="json")
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         # print(response.data)

# class SearchEngineTestCase(TestCase):
    # def setUp(self):
    #     setupDB()
    #     setupLocations(center=90720)

    # def test_search(self):
    #     print("============== Search Engine Test Case ===================")
    #     center = 90720
    #     zips = get_nearest_zipcodes(center)
    #     for z in zips:
    #         loc = Location.objects.filter(zipcode=z)
    #         if loc.exists():
    #             print("==================================================")
    #             for q in loc:
    #                 print(q)
    #                 print(q.street_line_1)
    #                 print(q.street_line_2)
    #                 print(f"{q.city}, {q.state} {q.zipcode}")
    #                 print("==================================================")