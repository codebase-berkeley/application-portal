from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from portal.models import *
from portal.models import Question, Answer
from portal.models import Category, Application
import ast

from django.utils.timezone import localtime, now
from django.contrib.auth.decorators import login_required


def create_category(request):
    list_cat = list(Category.objects.all())
    list_app = list(Application.objects.all())
    if request.method == "GET":
        return render(request, "portal/category/create_category.html", {"list_cat": list_cat, "list_app": list_app})
    newcategory = Category(name=request.POST["newcat_name"])
    newcategory.save()
    list_cat = list(Category.objects.all())
    return render(request, "portal/dashboard.html", {"list_cat": list_cat, "list_app": list_app})


def delete_category(request, pk=''):
    category = Category.objects.get(pk=pk)
    category.delete()
    list_cat = list(Category.objects.all())
    list_app = list(Application.objects.all())
    return render(request, "portal/dashboard.html", {"list_cat": list_cat, "list_app": list_app})


def edit_category(request, pk=''):
    category = Category.objects.get(pk=pk)
    list_cat = list(Category.objects.all())
    list_app = list(Application.objects.all())
    if request.method == "GET":
        return render(request, "portal/category/edit_category.html", {"list_cat": list_cat, "list_app": list_app, "chosencat": category})
    category.name = request.POST["cat_name"]
    category.save()
    list_cat = list(Category.objects.all())
    return render(request, "portal/dashboard.html", {"list_cat": list_cat, "list_app": list_app})


def show_category(request, pk=''):
    category = Category.objects.get(pk=pk)
    list_cat = list(Category.objects.all())
    list_app = list(Application.objects.all())
    return render(request, "portal/category.html", {"category": category, "list_cat": list_cat, "list_app": list_app})


@login_required
def testcategories(request):
    listy = list(Category.objects.all())
    apps = list(Application.objects.all())
    return render(request, "portal/testcategories.html", {"categories": listy, 'apps': apps})


@login_required
def dashboard(request):
    list_cat = list(Category.objects.all())
    list_app = list(Application.objects.all())
    return render(request, "portal/dashboard.html", {"list_cat": list_cat, "list_app": list_app})

def change_category(request, app_pk):
    application = Application.objects.get(pk=app_pk)
    application.category.name = request.POST['category']
    return redirect('portal:get_application', app_pk)

def send_massemail(request, pk=''):
    category = Category.objects.get(pk=pk)
    list_app = list(Application.objects.all())
    category_apps = []
    for app in list_app:
        if app.category == category:
            category_apps.append(app)
    return render(request, "portal/massemail.html", {"category_apps": category_apps})
