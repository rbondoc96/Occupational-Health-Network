from django.shortcuts import render

def disclaimer(request):
    return render(request, "views/popups/disclaimer.html")