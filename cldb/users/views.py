from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.shortcuts import render, redirect

from rest_framework import viewsets

from .decorators import allowed_users

def login_register(request):
    return render(request, "login-register.html")

# @allowed_users(allowed_roles=["team"])
@login_required(login_url="login")
def dashboard(request):
    return render(request, "views/dashboard.html")