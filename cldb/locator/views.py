#!/usr/bin/env python

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
import requests
import json

from django.http import Http404
from django.utils.text import slugify
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.generic import DetailView, ListView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from datetime import datetime as dt

from .models import (
    Service, 
    Location,
    CcfCategory,
    AuthMethod,
    ServiceTimeRange, 
    DayTimeRange,
    Review, 
    Contacts
)
from .forms import (
    LocationForm,
    ReviewForm,
)

from .serializers import (
    LocationCreateSerializer,
    DetailedLocationSerializer, 
    ServiceSerializer,
    ContactsCreateSerializer,
    DayTimeRangeCreateSerializer,
    ServiceTimeRangeCreateSerializer
)

from locator.utils import get_ratings_by_location, convert_to_time24

import users.permissions as user_permissions

# pylint: disable=no-member

class LocationDetailView(DetailView):
    model = Location
    template_name = "location.html"
    slug_field = "slug"

class LocationListView(ListView):
    model = Location

class LocationUpdateView(UpdateView):
    model = Location
    template_name = "locator/update/location.html"
    fields = [
        "location_category",
        "name",
        "branch_name",
        "street_line_1",
        "street_line_2",
        "city",
        "state",
        "zipcode",
        "phone",
        "is_phone_callable",
        "fax",
        "website",
        "comments",
        "last_verified",
        "service_list",
        "ccf_category_list",
        "auth_method_list",
    ]

class ReviewDetailView(DetailView):
    model = Review
    template_name = "locator/detail/review.html"

class ReviewListView(ListView):
    model = Review
    template_name = "views/reviews.html"

    def get_queryset(self):
        location = Location.objects.get(slug=self.kwargs["slug"])
        queryset = super().get_queryset()
        return queryset.filter(location_id=location.id)

class ContactsListView(ListView):
    model = Contacts
    template_name = "locator/list/contacts.html"

    def get_queryset(self):
        location = Location.objects.get(slug=self.kwargs["slug"])
        queryset = super().get_queryset()
        return queryset.filter(location_id=location.id)

class DayTimeRangeListView(ListView):
    model = DayTimeRange
    template_name = "locator/list/op-hours.html"

    def get_queryset(self):
        location = Location.objects.get(slug=self.kwargs["slug"])
        queryset = super().get_queryset()
        return queryset.filter(location_id=location.id)

class ServiceTimeRangeListView(ListView):
    model = ServiceTimeRange
    template_name = "locator/list/service-hours.html"

    def get_queryset(self):
        location = Location.objects.get(slug=self.kwargs["slug"])
        queryset = super().get_queryset()
        return queryset.filter(location_id=location.id)

class ReviewUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Review

    def test_func(self):
        review = self.get_object()
        user_name = self.request.user.first_name + \
            " " + self.request.user.last_name
        if user_name == review.owner:
            return True
        return False

def index(request):
    return render(request, "index.html")

def explore(request):
    if request.method == "POST":
        data = request.POST
        print("--request.POST--")
        print(data)
        return redirect("explore")
    else:
        return render(request, "views/explore.html")

def add_location(request):
    if request.method == "POST":
        data = request.POST
        location_ = {
            "location_category" : data.get("clinic-type"),
            "name" : data.get("clinic-name"),
            "branch_name" : data.get("branch-name"),
            "street_line_1" : data.get("street-line-1"),
            "street_line_2" : data.get("street-line-2"),
            "city" : data.get("city"),
            "state": data.get("state"),
            "zipcode" : data.get("zipcode"),
            "phone" : data.get("phone"),
            "is_phone_callable" : data.get("is-phone-callable"),
            "fax" : data.get("fax"),
            "website" : data.get("website"),
            "service_list" : data.getlist("services"),
            "ccf_category_list": data.getlist("coc-method"),
            "auth_method_list": data.getlist("auth-method"),
            "comments": data.get("comments"),
        }

        location = LocationCreateSerializer(data=location_)

        if location.is_valid(raise_exception=True):
            location = location.save()
            loc_id = location.id
            if location.slug is None or location.slug == "":
                if location.branch_name == "" or location.branch_name is None:
                    slug = slugify(f"{location.name}-{location.id}")
                else:
                    slug = slugify(f"{location.name}-{location.branch_name}")
                location.slug = slug
                location.save()

            service_hours_list = data.getlist("service-hours-input")
            op_hours_list = data.getlist("business-hours-input")
            contacts_list = data.getlist("contacts-input")


            if len(service_hours_list) > 0:
                for item in service_hours_list:
                    obj = json.loads(item)
                    obj["location"] = loc_id
                    obj["start_time"] = convert_to_time24(obj["start_time"])
                    obj["end_time"] = convert_to_time24(obj["end_time"])
                    serializer = ServiceTimeRangeCreateSerializer(data=obj)
                    if serializer.is_valid(raise_exception=True):
                        serializer.save()
                        print(serializer)

            if len(op_hours_list) > 0:
                for item in op_hours_list:
                    obj = json.loads(item)
                    obj["location"] = loc_id
                    obj["start_time"] = convert_to_time24(obj["start_time"])
                    obj["end_time"] = convert_to_time24(obj["end_time"])                    
                    serializer = DayTimeRangeCreateSerializer(data=obj)
                    if serializer.is_valid(raise_exception=True):
                        serializer.save()

            if len(contacts_list) > 0:
                for item in contacts_list:
                    obj = json.loads(item)
                    obj["location"] = loc_id
                    serializer = ContactsCreateSerializer(data=obj)
                    if serializer.is_valid(raise_exception=True):
                        serializer.save()
        
            return redirect("location_detail", slug=location.slug)
        else:
            return render(request, "views/add_location.html")
    else: 
        if request.user.is_authenticated:
            return render(request, "views/add_location.html")
        else:
            return redirect("login_register")

def review_location(request, **kwargs): 
    if request.method == "POST":
        print("reviewing location")
    else:
        if request.user.is_authenticated:
            return render(request, "views/popups/review_location.html")
        else:
            return redirect("login_register")

def convert_to_24(time_range):
    time1 = time_range["start_time"]
    time2 = time_range["end_time"]

    time_obj1 = dt.strptime(time1, "%I:%M %p")
    time_obj2 = dt.strptime(time2, "%I:%M %p")

    time_range["start_time"] = dt.strftime(time_obj1, "%H:%M:%S")
    time_range["end_time"] = dt.strftime(time_obj2, "%H:%M:%S")

    print(time_range)
    return time_range

@api_view(["GET", "POST"])
def new_location(request):
    if request.method == "POST":
        data = request.data
        ls = LocationCreateSerializer(data=data["location"])
        c_list = data.get("contacts")
        dtr_list = data.get("op_hours")
        str_list = data.get("service_hours")

        cs = ContactsCreateSerializer(data=c_list)
        dtrs = DayTimeRangeCreateSerializer(data=dtr_list)
        strs = ServiceTimeRangeCreateSerializer(data=str_list)

        if(ls.is_valid()):
            location = ls.save()
            id = location.id
            if location.slug is None or location.slug == "":
                if location.branch_name == "" or location.branch_name is None:
                    slug = slugify(f"{location.name}-{location.id}")
                else:
                    slug = slugify(f"{location.name}-{location.branch_name}")
                ls.save(slug=slug)
            if c_list is not None:
                for contact in c_list:
                    cs = ContactsCreateSerializer(data=contact)
                    if(cs.is_valid()):
                        cs.save(location_id=id)
            if dtr_list is not None:
                for dt_range in dtr_list:
                    dt_range = convert_to_24(dt_range)
                    dtrs = DayTimeRangeCreateSerializer(data=dt_range)
                    if(dtrs.is_valid()):
                        dtrs.save(location_id=id)
            if str_list is not None:
                for st_range in str_list:
                    st_range = convert_to_24(st_range)
                    strs = ServiceTimeRangeCreateSerializer(data=st_range)
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



