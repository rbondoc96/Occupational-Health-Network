#!/usr/bin/env python

import requests
import json
import googlemaps
from datetime import datetime
from uszipcode import SearchEngine

from django.conf import settings
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse

from rest_framework import status, viewsets
from rest_framework.views import APIView
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

gmaps = googlemaps.Client(key="AIzaSyC8i4Dw9T0XlIaLrF7-RpIV7yYkXaJLAso")

class SearchView(APIView):
    def get(self, request, *args, **kwargs):
        params = self.request.query_params
        print(params)
        address = params.get("address")
        zipcode = params.get("zipcode")
        radius = params.get("radius")

        if zipcode is not None and radius is not None:
            radius = int(radius)
            search = SearchEngine(simple_zipcode=True)
            z_query = search.by_zipcode(zipcode)

            if z_query.zipcode is None:
                return Response({
                    "error" : "Invalid Zipcode Submitted"
                }, status=status.HTTP_400_BAD_REQUEST)

            nearby_zips = search.by_coordinates(
                z_query.lat,
                z_query.lng,
                radius=radius,
                returns=1000,
            )
            locations = []
            queryset = Location.objects.all()
            for zcode in nearby_zips:
                l_query = queryset.filter(zipcode=zcode.zipcode)
                if l_query.exists():
                    for obj in l_query:
                        serializer = DetailedLocationSerializer(obj)
                        locations.append(serializer.data)
            return Response(locations, status=status.HTTP_200_OK)
        
        elif address is not None and radius is not None:
            radius = int(radius)
            geocode = gmaps.geocode(address)
            lat = geocode[0].get("geometry").get("location").get("lat")
            lng = geocode[0].get("geometry").get("location").get("lng")

            search = SearchEngine(simple_zipcode=True)
            nearby_zips = search.by_coordinates(
                lat,
                lng,
                radius=radius,
                returns=1000,
            )
            locations = []
            queryset = Location.objects.all()
            for zcode in nearby_zips:
                l_query = queryset.filter(zipcode=zcode.zipcode)
                if l_query.exists():
                    for obj in l_query:
                        serializer = DetailedLocationSerializer(obj)
                        locations.append(serializer.data)
            return Response(locations, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ServiceCategoryViewSet(
    ManagerCUDAuthorizationMixin, 
    viewsets.ModelViewSet):

    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [user_permissions.ReadOnly]

class LocationCategoryViewSet(
    ManagerCUDAuthorizationMixin,
    viewsets.ModelViewSet):
    queryset = LocationCategory.objects.all()
    serializer_class = LocationCategorySerializer
    permission_classes = [user_permissions.ReadOnly]

class CcfCategoryViewSet(
    ManagerCUDAuthorizationMixin,
    viewsets.ModelViewSet):
    queryset = CcfCategory.objects.all()
    serializer_class = CcfCategorySerializer
    permission_classes = [user_permissions.ReadOnly]

class AuthMethodViewSet(
    ManagerCUDAuthorizationMixin,
    viewsets.ModelViewSet):
    queryset = AuthMethod.objects.all()
    serializer_class = AuthMethodSerializer
    permission_classes = [user_permissions.ReadOnly]

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
    permission_classes = [user_permissions.ReadOnly]

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