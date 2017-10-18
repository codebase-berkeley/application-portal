from django.shortcuts import render
from django.http import HttpResponse
from portal.models import Category, Application
# Create your views here.

def advanced_hello(request, first_name):
    return render(request, "portal/hello.html", { "first_name": first_name })

def testcategories(request):
	listy = list(Category.objects.all())
	apps = list(Application.objects.all())
	return render(request, "portal/testcategories.html", {'categories': listy, 'apps': apps})

def dashboard(request):
	return render(request, "portal/dashboard.html")
