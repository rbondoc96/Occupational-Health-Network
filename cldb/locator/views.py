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

from .models import Service, ServiceCategory

# Create your views here.

# A view function or "view" is a Python function that takes a web request and 
# returns a web response (HttpResponse). This response can be the HTML contents
# of a Web page, a redirect, a 404 error, XML/JSON object, image, etc.

def index(request):
    # Comment below disables no-member violations in this function from pylint
    # pylint: disable=no-member
    service_list = Service.objects.order_by('name')[:1]
    context = {'service_list': service_list}
    return render(request, "locator/index.html", context)


