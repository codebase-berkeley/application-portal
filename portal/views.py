from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def advanced_hello(request, first_name):
    return render(request, "portal/hello.html", { "first_name": first_name })
