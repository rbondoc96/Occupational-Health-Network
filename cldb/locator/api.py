#!/usr/bin/env python

import requests
import json
from datetime import datetime
from uszipcode import SearchEngine

from django.conf import settings
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse

from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated, IsAuthenticatedOrReadOnly,
)

from locator.mixins import (
    LocationQueryParameterMixin, ManagerCUDAuthorizationMixin,
)
from locator.models import (
    Location, Service, AuthMethod, CcfCategory, DayTimeRange, 
    ServiceTimeRange, ServiceCategory, Contacts, Review,
    LocationCategory,
)
from locator.serializers import (
    LocationCreateSerializer, ContactsCreateSerializer, 
    DayTimeRangeCreateSerializer, ServiceTimeRangeCreateSerializer,
    DetailedLocationSerializer, DetailedContactsSerializer,     
    DetailedDayTimeRangeSerializer, DetailedServiceTimeRangeSerializer,
    TrimmedLocationSerializer, LocationCategorySerializer,
    ReviewSerializer, AuthMethodSerializer, ServiceCategorySerializer,  
    CcfCategorySerializer, ServiceSerializer
)

import users.permissions as user_permissions

# pylint: disable=no-member

days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
]

class ServiceCategoryViewSet(
    ManagerCUDAuthorizationMixin, 
    viewsets.ModelViewSet):

    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class LocationCategoryViewSet(
    ManagerCUDAuthorizationMixin,
    viewsets.ModelViewSet):
    queryset = LocationCategory.objects.all()
    serializer_class = LocationCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class CcfCategoryViewSet(
    ManagerCUDAuthorizationMixin,
    viewsets.ModelViewSet):
    queryset = CcfCategory.objects.all()
    serializer_class = CcfCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class AuthMethodViewSet(
    ManagerCUDAuthorizationMixin,
    viewsets.ModelViewSet):
    queryset = AuthMethod.objects.all()
    serializer_class = AuthMethodSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = DetailedLocationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "slug"
    
    def get_queryset(self):
        queryset = self.queryset
        id = self.request.query_params.get("id") or None
        zipcodes = self.request.query_params.get("zipcodes") or None 
        
        if id is not None:
            return queryset.filter(id=id)
        if zipcodes is not None:
            zips = zipcodes.strip("][").split(",")
            return queryset.filter(zipcode__in=zips)
        else:
            return queryset

    def create(self, request):
        serializer = LocationCreateSerializer(data=request.data)

        print(request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = LocationCreateSerializer(
            instance, 
            data=request.data,
            partial=partial
        )

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None, *args, **kwargs):
        queryset = self.queryset
        if pk is not None:
            location = get_object_or_404(queryset, id=pk)
        else:
            location = get_object_or_404(queryset, slug=kwargs["slug"])
        serializer = DetailedLocationSerializer(location)

        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if not queryset.exists() or queryset == []:
            return Response([], status=status.HTTP_404_NOT_FOUND)
        
        serializer = TrimmedLocationSerializer(queryset, many=True)
        return Response(serializer.data)

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ReviewViewSet(LocationQueryParameterMixin, viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ContactsViewSet(LocationQueryParameterMixin, viewsets.ModelViewSet):
    queryset = Contacts.objects.all()
    serializer_class = DetailedContactsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request):
        location_id = request.data["location"]
        serializer = ContactsCreateSerializer(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save(location_id=location_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class DayTimeRangeViewSet(LocationQueryParameterMixin, viewsets.ModelViewSet):
    queryset = DayTimeRange.objects.all()
    serializer_class = DetailedDayTimeRangeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request):
        location_id = request.data["location"]
        serializer = DayTimeRangeCreateSerializer(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save(location_id=location_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class ServiceTimeRangeViewSet(
    LocationQueryParameterMixin, 
    viewsets.ModelViewSet):
    queryset = ServiceTimeRange.objects.all()
    serializer_class = DetailedServiceTimeRangeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request):
        location_id = request.data["location"]
        serializer = ServiceTimeRangeCreateSerializer(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save(location_id=location_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class SearchLocationViewSet(
    LocationQueryParameterMixin,
    viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = TrimmedLocationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

@api_view(["GET"])
def search_location_by_zipcode(request):
    query_params = request.query_params
    zipcode = query_params.get("zipcode", None)
    radius = int(query_params.get("radius", None))

    if zipcode is not None and radius is not None:
        search = SearchEngine(simple_zipcode=True)
        zipcode_query = search.by_zipcode(zipcode) 
        
        nearby_zips = search.by_coordinates(
            zipcode_query.lat,
            zipcode_query.lng, 
            radius=radius, 
            returns=1000,
        )
        locations = []
        queryset = Location.objects.all()
        for zcode in nearby_zips:
            location = queryset.filter(zipcode=zcode.zipcode)
            if location.exists():
                for obj in location:
                    serializer = TrimmedLocationSerializer(obj)
                    data = serializer.data
                    if data["op_hours"]:
                        for hour in data["op_hours"]:
                            day = days[hour["day"]]
                            hour["day"] = day
                    locations.append(data)
        return Response(locations, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def add_contact_to_location(request, pk):
    if request.method == "POST":
        data = request.data
        print(data)
        location = Location.objects.get(id=pk)
        contact = Contacts(
            location_id = pk,
            name = data["name"],
            title = data["title"],
            phone = data["phone"],
            email = data["email"],
        )
        contact.save()
        location.contacts_set.add(contact)
        location.save()
        
        serializer = ContactsCreateSerializer(contact)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(["GET"])
def imgFromLocation(request, pk):
    try:
        location = Location.objects.get(pk=pk)
    except Location.DoesNotExist:
        return HttpResponse("why did this happen")

    if request.method == "GET":
        api_key = ""
        img_file = "um.png"
        img_path = settings.BASE_DIR + "\\static\\locator\\img\\gmaps\\"
        img_fullpath = img_path + img_file
        file_path = settings.BASE_DIR + "\\.env\\gmaps_api.txt"

        with open(file_path, "r") as file:
            api_key = file.readline()

        url = "https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x400&key=" + api_key
        response = requests.get(url)
        with open(img_fullpath, "wb") as img:
            img.write(response.content)
    
    return HttpResponse(response)