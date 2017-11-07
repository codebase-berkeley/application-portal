from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from portal.models import *
from portal.models import Question, Answer
from portal.models import Category, Application
from portal.views.application import render_app
import ast
import json, requests

from django.utils.timezone import localtime, now
from django.contrib.auth.decorators import login_required

from .utils import get_dashboard_context

URL = "https://us17.api.mailchimp.com/3.0"
KEY = "e1a1bff19a0cecf9447238a56a1efa9f-us17"
AUTH = ('nkhatore', KEY)
HEADERS = {'Content-Type': 'application/json'}



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

@login_required
def show_category(request, pk=''):
    context = get_dashboard_context(request.user.username, request.user.email)
    category = Category.objects.get(pk=pk)
    list_app = list(Application.objects.all())
    context["list_app"] = list_app
    context["category"] = category
    return render(request, "portal/category.html", context)

@login_required
def dashboard(request):
    context = get_dashboard_context(request.user.username, request.user.email)
    context["list_app"] = list(Application.objects.all())
    return render(request, "portal/dashboard_main.html", context)

@login_required
def create_massemail(request, pk=''):
    category = Category.objects.get(pk=pk)
    return render(request, "portal/massemail.html", {"category": category})

@login_required
def send_massemail(request, pk=''):
    category = Category.objects.get(pk=pk)
    list_app = list(Application.objects.all())
    category_apps = []
    for app in list_app:
        if app.category == category:
            category_apps.append(app)

    subject = request.POST["subject"]
    body = request.POST["body"]

    print(subject + body)
    create_list_params = {"name": "name", "contact": {"company": "CodeBase", "address1": "2650 Haste Street", "city": "Berkeley", "state": "CA", "zip": "94720", "country": "USA"}, "permission_reminder": "You're receiving this email because you applied to CodeBase.", "campaign_defaults": {"from_name": "CodeBase", "from_email": "guor.lei@berkeley.edu", "subject": subject, "language": "en"}, "email_type_option": True}
    create_list_url = URL+'/lists/'

    create_list = requests.post(url=create_list_url, auth=AUTH, headers=HEADERS, json=create_list_params)
    print(create_list.text)
    obj = json.loads(create_list.text)
    list_id = obj['id']

    for app in category_apps:
        add_member_params = {"email_address": app.email, "status": "subscribed"}
        add_member_url = URL+"/lists/"+list_id+"/members/"
        add_member = requests.post(url=add_member_url, auth=AUTH, headers=HEADERS, json=add_member_params)


    create_campaign_params = {"type": "regular", "recipients":{"list_id": list_id}, "settings":{"subject_line": subject, "reply_to": "guor.lei@berkeley.edu", "from_name":"Berkeley CodeBase"}}
    create_campaign_url = URL+"/campaigns/"
    create_campaign = requests.post(url=create_campaign_url, auth=AUTH, headers=HEADERS, json=create_campaign_params)
    obj = json.loads(create_campaign.text)
    campaign_id = obj['id']


    create_email_params = {"html": "<p>"+body+"</p>"}
    create_email_url = URL+"/campaigns/"+campaign_id+"/content"
    create_email = requests.put(url=create_email_url, auth=AUTH, headers=HEADERS, json=create_email_params)

    send_email_url = URL+"/campaigns/"+campaign_id+"/actions/send"
    send_email = requests.post(url=send_email_url, auth=AUTH, headers=HEADERS, json={})
    print(send_email.text)

    return redirect('portal:show_category', category_apps[0].category.pk)


@login_required
def search(request, term):
    list_app = list(Application.objects.filter(first_name__icontains=term))
    list_app.extend(list(Application.objects.filter(last_name__icontains=term)))
    list_app = list(set(list_app))
    return render(request, 'portal/search.html', {"list_app": list_app})


@login_required 
def change_category(request, app_pk):
    application = Application.objects.get(pk = app_pk)
    application.category = Category.objects.get(name=str(request.POST['category']))
    application.save()
    return render_app(request, app_pk)
