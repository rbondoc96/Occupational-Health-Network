#!/usr/bin/env python

# Doc string
"""[summary]


"""

# PEP8 (Python Enhancement Proposal 8) dictates module level dunders to be
# placed after the dostring, but before any imports, EXCEPT for:
#   from __future__ import ...
__author__ = "Rodrigo Bondoc"
__copyright__ = "Copyright 2020, Rodrigo Bondoc, All rights reserved."
__license__ = "None"
__version__ = "1.0.0"
__email__ = "bondoc.rodrigo@gmail.com"
__status__ = "Development"

import io

from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.generic import DetailView
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import status

from datetime import datetime as dt

from .models import (
    Service, 
    Location,
    CcfCategory,
    AuthMethod,
    ServiceTimeRange, 
    DayTimeRange, 
    Contacts
)
from .forms import (
    LocationForm
)

from .serializers import (
    LocationSerializer, 
    ServiceSerializer,
    ContactsSerializer,
    DayTimeRangeSerializer,
    ServiceTimeRangeSerializer
)

class LocationDetailView(DetailView):
    model = Location
    template_name = "locator/location.html"

def convert_to_24(time_range):
    time1 = time_range["start_time"]
    time2 = time_range["end_time"]

    time_obj1 = dt.strptime(time1, "%I:%M %p")
    time_obj2 = dt.strptime(time2, "%I:%M %p")

    time_range["start_time"] = dt.strftime(time_obj1, "%H:%M:%S")
    time_range["end_time"] = dt.strftime(time_obj2, "%H:%M:%S")

    print(time_range)
    return time_range

# pylint: disable=no-member
def index(request):
    services = Service.objects.order_by('name')

    context = {
        'services': services
    }
    return render(request, "locator/index.html", context)

@api_view(["GET", "POST"])
def new_location(request):
    if request.method == "POST":
        data = request.data
        print(data["op_hours"])
        ls = LocationSerializer(data=data["location"])
        c_list = data["contacts"]
        dtr_list = data["op_hours"]
        str_list = data["service_hours"]

        cs = ContactsSerializer(data=data["contacts"])
        dtrs = DayTimeRangeSerializer(data=data["op_hours"])
        strs = ServiceTimeRangeSerializer(data=data["service_hours"])

        if(ls.is_valid()):
            location = ls.save()
            id = location.id
            for contact in c_list:
                cs = ContactsSerializer(data=contact)
                if(cs.is_valid()):
                    cs.save(location_id=id)
            for dt_range in dtr_list:
                dt_range = convert_to_24(dt_range)
                dtrs = DayTimeRangeSerializer(data=dt_range)
                if(dtrs.is_valid()):
                    dtrs.save(location_id=id)
                print(dtrs.is_valid())
            for st_range in str_list:
                st_range = convert_to_24(st_range)
                strs = ServiceTimeRangeSerializer(data=st_range)
                if(strs.is_valid()):
                    strs.save(location_id=id)
            
            return Response(ls.data, status=status.HTTP_201_CREATED)
        return Response(ls.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "GET":
        form = LocationForm()
    
    context = {
        "form": form
    }
    return render(request, "locator/new.html", context)

@api_view(["GET", "PUT", "DELETE"])
def service(request, pk):
    try:
        service = Service.objects.get(pk=pk)
    except Service.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = ServiceSerializer(service)
        return Response(serializer.data)   

@api_view(['GET', 'PUT', 'DELETE'])
def location(request, pk):
    try:
        location = Location.objects.get(pk=pk)
    except Location.DoesNotExist:
        return render(request, "locator/404/location.html")

    if request.method == "GET":
        serializer = LocationSerializer(location)

        service_strs = []
        for service_id in serializer.data["service_list"]:
            name = Service.objects.get(pk=service_id).name
            service_strs.append(name)

        ccf_strs = []
        for ccf_id in serializer.data["ccf_category_list"]:
            name = CcfCategory.objects.get(pk=ccf_id).name
            ccf_strs.append(name)

        am_strs = []
        for am_id in serializer.data["auth_method_list"]:
            name = AuthMethod.objects.get(pk=am_id).name
            am_strs.append(name)

        # Add contacts
        contacts = []
        for contact in location.contacts_set.all():
            contacts.append({
                "name": contact.name,
                "title": contact.title,
                "phone": contact.phone,
                "email": contact.email
            })

        # Add Hours of Operation
        op_hours = []
        for elem in location.daytimerange_set.all():
            op_hours.append({
                "day": elem.day,
                "startTime": elem.start_time,
                "endTime": elem.end_time,
            })

        service_hours = []
        for elem in location.servicetimerange_set.all():
            service_hours.append({
                "name": elem.name,
                "startTime": elem.start_time,
                "endTime": elem.end_time
            })

        location_data = serializer.data.copy()
        location_data["service_list"] = service_strs
        location_data["ccf_category_list"] = ccf_strs
        location_data["auth_method_list"] = am_strs
        location_data["contacts"] = contacts
        location_data["op_hours"] = op_hours
        location_data["service_hours"] = service_hours

        return Response(location_data)

    elif request.method == "PUT":
        serializer = LocationSerializer(location, data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        location.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def contacts(request, pk):
    try:
        contact = Contacts.objects.get(pk)
    except Contacts.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = ContactsSerializer(contact)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = ContactsSerializer(contact, data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def op_hours(request, pk):
    try:
        dt_range = DayTimeRange.objects.get(pk)
    except DayTimeRange.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = DayTimeRangeSerializer(dt_range)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = DayTimeRangeSerializer(dt_range, data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        dt_range.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def service_hours(request, pk):
    try:
        st_range = ServiceTimeRange.objects.get(pk)
    except ServiceTimeRange.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = ServiceTimeRangeSerializer(st_range)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = ServiceTimeRangeSerializer(st_range, data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        st_range.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

