from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.http import HttpResponse
from django.shortcuts import render, redirect

from .decorators import allowed_users

def register(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        
        if form.is_valid():
            username = form.cleaned_data.get("username")
            messages.success(request, f"Account created for {username}!")
            return redirect("register")
    else:
        form = UserCreationForm()

    context = {
        "form": form
    }
    return render(request, "users/register.html", context)

# decorators are used to add functionality to an existing function
@login_required(login_url="login")
@allowed_users(allowed_roles=["team"])
def dashboard(request):
    return HttpResponse("hi")