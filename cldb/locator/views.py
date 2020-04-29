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

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

from .models import (
    Service, 
    Location, 
    ServiceTimeRange, 
    DayTimeRange, 
    Contacts
)
from .forms import (
    LocationForm
)

# A view function or "view" is a Python function that takes a web request and 
# returns a web response (HttpResponse). This response can be the HTML contents
# of a Web page, a redirect, a 404 error, XML/JSON object, image, etc.

# pylint: disable=no-member
def index(request):
    services = Service.objects.order_by('name')

    context = {
        'services': services
    }
    return render(request, "locator/index.html", context)

def new(request):
    if request.method == "POST":
        form = LocationForm(request.POST)
        print(f"Is Form Valid: {form.is_valid()}")
        if form.is_valid():
            location_name = form.cleaned_data["location_name"]
            service_list = form.cleaned_data["service_list"]
            print(location_name)
            print(service_list)
    else:
        form = LocationForm()

    context = {
        "form": form
    }
    return render(request, "locator/new.html", context)


