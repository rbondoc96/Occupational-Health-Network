from django.http import HttpResponse
from django.shortcuts import redirect

def unauthenticated_user(view):
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect("dashboard")
        else:
            return view(request, *args, **kwargs)
    
    return wrapper

def allowed_users(allowed_roles=[]):
    def decorator(view):
        def wrapper(request, *args, **kwargs):
            group = None
            if request.user.groups.exists():
                group = request.user.groups.all()[0].name

            if group in allowed_roles:
                return view(request, *args, **kwargs)
            else:
                return HttpResponse("You are not authorized to view this page")
        return wrapper
    return decorator