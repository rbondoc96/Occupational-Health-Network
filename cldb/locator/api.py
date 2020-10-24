#!/usr/bin/env python

import requests
import json
import googlemaps
from datetime import datetime
from uszipcode import SearchEngine

from django.conf import settings
from django.utils.text import slugify
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
    LocationCategory, LocationComment
)

from locator.serializers.location import (
    LocationSerializer,
    LocationCreateSerializer,
    LocationCategorySerializer,
    LocationCommentSerializer,
    LocationCommentCreateSerializer,
)
from locator.serializers.service import (
    ServiceSerializer,
    ServiceCategorySerializer,
)
from locator.serializers.auth_method import AuthMethodSerializer
from locator.serializers.daytimerange import (
    DayTimeRangeSerializer,
    DayTimeRangeCreateSerializer,
)
from locator.serializers.servicetimerange import (
    ServiceTimeRangeSerializer,
    ServiceTimeRangeCreateSerializer,
)
from locator.serializers.contact import (
    ContactSerializer,
    ContactCreateSerializer,
)
from locator.serializers.review import (
    ReviewSerializer,
    ReviewTypeSerializer,
)
from locator.serializers.ccf_category import CcfCategorySerializer

import users.permissions as user_permissions

# pylint: disable=no-member

gmaps = googlemaps.Client(key="AIzaSyC8i4Dw9T0XlIaLrF7-RpIV7yYkXaJLAso")

class SearchView(APIView):
    def get(self, request, *args, **kwargs):
        params = self.request.query_params
        print(params)
        location = params.get("location")
        radius = params.get("radius")
        services = params.get("services")
        days = params.get("days")

        if location is None or radius is None:
            return Response({
                "detail": "Please provide search parameters"
            }, status=status.HTTP_400_BAD_REQUEST)
        else:
            if services is not None:
                services = {int(num) for num in services.split(",")}
            if days is not None:
                days = {int(num) for num in days.split(",")}

            will_filter = (services is not None or days is not None)

        if len(location) == 5 and radius is not None:
            radius = int(radius)
            search = SearchEngine(simple_zipcode=True)
            z_query = search.by_zipcode(location)

            if z_query.zipcode is None:
                return Response({
                    "detail" : "Invalid Zipcode Submitted"
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
                        if will_filter:
                            q_set = obj.service_list.all()
                            d_set = obj.daytimerange_set.all()
                            service_ids = {q.id for q in q_set}
                            day_ids = {d.day.id for d in d_set}

                            if services is not None:
                                if days is not None:
                                    if services.issubset(service_ids) and \
                                        days.issubset(day_ids):
                                        serializer = LocationSerializer(obj)
                                        locations.append(serializer.data)
                                else:
                                    if services.issubset(service_ids):
                                        serializer = LocationSerializer(obj)
                                        locations.append(serializer.data)
                            elif days is not None:
                                if days.issubset(day_ids):
                                    serializer = LocationSerializer(obj)
                                    locations.append(serializer.data)
                        else:
                            serializer = LocationSerializer(obj)
                            locations.append(serializer.data)
            return Response(locations, status=status.HTTP_200_OK)
        
        elif len(location) != 5 and radius is not None:
            radius = int(radius)
            geocode = gmaps.geocode(location)
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
                        if will_filter:
                            q_set = obj.service_list.all()
                            d_set = obj.daytimerange_set.all()
                            service_ids = {q.id for q in q_set}
                            day_ids = {d.day.id 
                                if str(d.start_time) != "23:59:00" and \
                                    str(d.end_time) != "23:59:00"
                                else
                                    -1
                            for d in d_set}

                            if services is not None:
                                if days is not None:
                                    if services.issubset(service_ids) and \
                                        days.issubset(day_ids):
                                        serializer = LocationSerializer(obj)
                                        locations.append(serializer.data)
                                else:
                                    if services.issubset(service_ids):
                                        serializer = LocationSerializer(obj)
                                        locations.append(serializer.data)
                            elif days is not None:
                                if days.issubset(day_ids):
                                    serializer = LocationSerializer(obj)
                                    locations.append(serializer.data)
                        else:
                            serializer = LocationSerializer(obj)
                            locations.append(serializer.data)
            return Response(locations, status=status.HTTP_200_OK)
        else:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

class ReviewStatsView(APIView):
    def get(self, request, *args, **kwargs): 
        params = self.request.query_params
        
        # slug expected
        slug = params.get("location")
        try:
            location = Location.objects.get(slug=slug)
        except Location.DoesNotExist:
            return Response({
                "error": "Location does not exist",
            }, status=status.HTTP_404_NOT_FOUND)

        # List of all reviews for Location
        query = Review.objects.filter(location=location)

        length = len(query)
        average = sum([q.rating for q in query]) / length if length != 0 else 0

        return Response({
            "average_rating": average,
            "total_reviews": length,
        }, status=status.HTTP_200_OK)

class LocationCommentViewSet(viewsets.ModelViewSet):
    queryset = LocationComment.objects.all()
    serializer_class = LocationCommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request):
        data = request.data
        serializer = LocationCommentCreateSerializer(data=data)

        if serializer.is_valid(raise_exception=True):
            comment = serializer.save()
            loc_id = comment.location

            comments = LocationComment.objects.filter(location=loc_id)
            serialized_comments = LocationCommentSerializer(
                comments, 
                many=True)
            return Response(
                serialized_comments.data, 
                status=status.HTTP_201_CREATED)

    def destroy(self, request, pk=None):
        comment = LocationComment.objects.get(pk=pk)
        location = comment.location
        
        comment.delete()
        comments = LocationComment.objects.filter(location=location)

        serializer = LocationCommentSerializer(
            comments,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

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
    serializer_class = LocationSerializer
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
        data = request.data

        service_hours = data.pop("service_hours_list") \
        if "service_hours_list" in data else None

        op_hours = data.pop("op_hours_list") \
        if "op_hours_list" in data else None
        
        contacts = data.pop("contacts_list") \
        if "contacts_list" in data else None

        serializer = LocationCreateSerializer(data=data)

        if serializer.is_valid(raise_exception=True):
            location = serializer.save()
            loc_id = location.id

            if service_hours:
                for service in service_hours:
                    service["location"] = loc_id
                    sh_serializer = ServiceTimeRangeCreateSerializer(
                        data=service)

                    if sh_serializer.is_valid(raise_exception=True):
                        sh_serializer.save()

            if op_hours:
                for op in op_hours:
                    op["location"] = loc_id
                    op_serializer = DayTimeRangeCreateSerializer(
                        data=op
                    )

                    if op_serializer.is_valid(raise_exception=True):
                        op_serializer.save()

            if contacts:
                for contact in contacts:
                    contact["location"] = loc_id
                    contact_serializer = ContactCreateSerializer(
                        data=contact
                    )

                    if contact_serializer.is_valid(raise_exception=True):
                        contact_serializer.save()

            payload = LocationSerializer(Location.objects.get(id=loc_id)).data
            print(payload)
            return Response(
                payload, 
                status=status.HTTP_201_CREATED)
        else:
            return Response(
                {"detail": "Error"}, 
                status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None, *args, **kwargs):
        data = request.data
        location = self.get_queryset().get(id=kwargs.get("slug"))

        services = [service.get("id") for service in data.pop("service_list")]
        payments = [payment.get("id") \
            for payment in data.pop("auth_method_list")]
        data["service_list"] = services
        data["auth_method_list"] = payments

        op_hours = data.pop("op_hours_list")
        contacts = data.pop("contacts_list")
        service_hours = data.pop("service_hours_list")

        serializer = LocationCreateSerializer(
            location,
            data=data,
            partial=True)

        if serializer.is_valid(raise_exception=True):
            location = serializer.save()
            loc_id = location.id

            # Must query the SH, BH, and COntact objects to actually patch them
            if service_hours:
                for service in service_hours:
                    if service.get("id") is None:
                        service["location"] = loc_id
                        sh_serializer = ServiceTimeRangeCreateSerializer(
                        data=service)
                    else:
                        service_obj = ServiceTimeRange.objects.get(
                            id=service.get("id"))
                        sh_serializer = ServiceTimeRangeCreateSerializer(
                            service_obj,
                            data=service,
                            partial=True
                        )

                    if sh_serializer.is_valid(raise_exception=True):
                        sh_serializer.save()

            if op_hours:
                for op in op_hours:
                    print(op)
                    if op.get("id") is None:
                        op["location"] = loc_id
                        op_serializer = DayTimeRangeCreateSerializer(
                            data=op,
                        )
                    else:
                        op_obj = DayTimeRange.objects.get(id=op.get("id"))
                        op_serializer = DayTimeRangeCreateSerializer(
                            op_obj,
                            data=op,
                            partial=True,
                        )

                    if op_serializer.is_valid(raise_exception=True):
                        op_serializer.save()

            if contacts:
                for contact in contacts:
                    if contact.get("id") is None:
                        contact["location"] = loc_id
                        contact_serializer = ContactCreateSerializer(
                            data=contact,
                            partial=True,
                        )
                    else:
                        contact_obj = Contacts.objects.get(
                            id=contact.get("id")
                        )
                        contact_serializer = ContactCreateSerializer(
                            contact_obj,
                            data=contact,
                            partial=True,
                        )
                    
                    if contact_serializer.is_valid(raise_exception=True):
                        contact_serializer.save()

            payload = LocationSerializer(Location.objects.get(id=loc_id)).data
            print(payload)
            return Response(
                payload, 
                status=status.HTTP_201_CREATED)            

    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop("partial", False)
    #     instance = self.get_object()
    #     serializer = LocationCreateSerializer(
    #         instance, 
    #         data=request.data,
    #         partial=partial
    #     )

    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None, *args, **kwargs):
        queryset = self.queryset
        if pk is not None:
            location = get_object_or_404(queryset, id=pk)
        else:
            location = get_object_or_404(queryset, slug=kwargs["slug"])
        serializer = LocationSerializer(location)

        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if not queryset.exists() or queryset == []:
            return Response([], status=status.HTTP_404_NOT_FOUND)
        
        serializer = LocationSerializer(queryset, many=True)
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
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request):
        location_id = request.data["location"]
        serializer = ContactCreateSerializer(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save(location_id=location_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class DayTimeRangeViewSet(LocationQueryParameterMixin, viewsets.ModelViewSet):
    queryset = DayTimeRange.objects.all()
    serializer_class = DayTimeRangeSerializer
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
    serializer_class = ServiceTimeRangeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request):
        location_id = request.data["location"]
        serializer = ServiceTimeRangeCreateSerializer(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save(location_id=location_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)