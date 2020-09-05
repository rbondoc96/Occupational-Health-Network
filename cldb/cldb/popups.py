from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.views.generic.base import TemplateView

from users.models import Profile

# pylint: disable=no-member

def login_register(request):
    if request.method == "POST":
        print(f"POST: {request.GET.get('next')}")

        data = request.POST
        print(data)

        if data is not None: 
            username = data.get("login-username")
            if username is not None and username != "":
                password = data.get("login-password")

                user = authenticate(request, username=username, password=password)
                print(user)

                if user is not None:
                    login(request, user)
                    return HttpResponseRedirect(request.GET.get("next"))
            
            username = data.get("reg-username")
            if username is not None and username != "":
                user_type = data.get("user-type")
                password = data.get("reg-password")
                email = data.get("reg-email")
                f_name = data.get("reg-firstname")
                l_name = data.get("reg-lastname")

                user = User.objects.create_user(
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
                # if next_page == "review-location":
                #     redirect("review_location", slug=location)
                # else:
                print(HttpResponseRedirect(request.GET.get("next")))
                return HttpResponseRedirect(request.GET.get("next"))
    else:
        print(f"GET: {request.GET.get('next')}")
        if request.user.is_authenticated:
            # if next_page == "review-location":
            #     redirect("review_location", slug=location)
            # else:
            print(HttpResponseRedirect(request.GET.get("next")))
            return HttpResponseRedirect(request.GET.get("next"))
        else:
            return render(request, "views/popups/login-register.html")

def disclaimer(request):
    return render(request, "views/popups/disclaimer.html")