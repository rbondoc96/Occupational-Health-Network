from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from rest_framework import viewsets

from .decorators import allowed_users
from .models import Profile

# pylint: disable=no-member

def login_register_view(request):
    if request.method == "POST":
        print("request.POST")
        print(request.POST)
        data = request.POST

        if data is not None: 

            username = data.get("login-username")
            if username is not None and username != "":
                password = data.get("login-password")

                user = authenticate(request, username=username, password=password)

                if user is not None:
                    login(request, user)
                    return redirect("dashboard")
            
            username = data.get("reg-username")
            if username is not None and username != "":
                user_type = data.get("user-type")
                password = data.get("reg-password")
                email = data.get("reg-email")
                f_name = data.get("reg-firstname")
                l_name = data.get("reg-lastname")

                user = User.objects.create(
                    username=username,
                    password=password,
                    email=email,
                    first_name=f_name,
                    last_name=l_name,
                )

                Profile.objects.create(
                    user_id=user.id,
                    user_type_id=user_type,
                )

                login(request, user)
                return redirect("dashboard")
    else:
        if request.user.is_authenticated:
            return redirect("dashboard")
        else:
            return render(request, "login-register.html")

def logout_view(request):
    if request.user.is_authenticated:
        logout(request)
        return render(request, "views/logout.html")
    else:
        return redirect("login_register")

def dashboard(request):
    if request.user.is_authenticated:
        return render(request, "views/dashboard.html")
    else:
        return redirect("login_register")

def bookmarks(request):
    if request.user.is_authenticated:
        return render(request, "views/bookmarks.html")
    else:
        return redirect("login_register")        

def settings(request):
    if request.user.is_authenticated:
        return render(request, "views/settings.html")
    else:
        return redirect("login_register")

def contact_and_disclaimer(request):
    return render(request, "views/contact.html")