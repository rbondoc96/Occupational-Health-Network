#!/usr/bin/env python

import io
import requests
import json

from django.http import Http404
from django.utils.text import slugify
from django.shortcuts import render, redirect, reverse, get_object_or_404
from django.views.defaults import page_not_found
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

from locator.serializers.location import (
    LocationSerializer,
    LocationCreateSerializer,
)
from locator.serializers.service import (
    ServiceSerializer,
)
from locator.serializers.review import (
    ReviewSerializer,
)
from locator.serializers.daytimerange import (
    DayTimeRangeCreateSerializer,
)
from locator.serializers.servicetimerange import (
    ServiceTimeRangeCreateSerializer,
)
from locator.serializers.contact import (
    ContactCreateSerializer,
)
from locator.utils import get_ratings_by_location, convert_to_time24

import users.permissions as user_permissions

# pylint: disable=no-member

class LocationDetailView(DetailView):
    model = Location
    template_name = "views/location/detail.html"
    slug_field = "slug"

class LocationUpdateView(UpdateView):
    model = Location
    template_name = "views/location/update.html"
    slug_field = "slug"
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
        "service_list",
        "ccf_category_list",
        "auth_method_list",
    ]

    def get_object(self):
        slug_ = self.kwargs.get("slug")
        return get_object_or_404(Location, slug=slug_)

class LocationDeleteView(DeleteView):
    model = Location
    template_name = "views/location/delete.html"
    slug_field = "slug"

    def get_object(self):
        slug_ = self.kwargs.get("slug")
        return get_object_or_404(Location, slug=slug_)
    
    def get_success_url(self):
        return reverse("explore")

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

class ReviewUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Review

    def test_func(self):
        review = self.get_object()
        user_name = self.request.user.first_name + \
            " " + self.request.user.last_name
        if user_name == review.owner:
            return True
        return False

def handler404(request, exception):
    return page_not_found(
        request, 
        exception, 
        template_name="views/404.html", 
    )

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
                    serializer = ContactCreateSerializer(data=obj)
                    if serializer.is_valid(raise_exception=True):
                        serializer.save()
        
            return redirect("location_detail", slug=location.slug)
        else:
            return render(request, "views/location/create.html")
    else: 
        if request.user.is_authenticated:
            return render(request, "views/location/create.html")
        else:
            return redirect("login_register")

def review_location(request, **kwargs): 
    if request.method == "POST":
        data = request.POST
        review_ = {
            "location": int(data.get("location")),
            "review_type": int(data.get("review-type")),
            "owner": request.user.id,
            "rating": int(data.get("rating")),
            "comments": data.get("comments"),
        }

        review = ReviewSerializer(data=review_)

        if review.is_valid(raise_exception=True):
            review.save()
            return redirect("review_submitted")
        else:
            return Response({"error": "Error in submitting review"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        if request.user.is_authenticated:
            return render(request, "views/popups/review_location.html")
        else:
            return redirect(reverse("login_popup") + f"?next={request.path}")

def review_submitted(request):
    return render(request, "views/popups/review_submitted.html")


