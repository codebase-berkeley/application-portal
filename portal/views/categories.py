from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from portal.models import *
from portal.models import Question, Answer
from portal.models import Category, Application
import ast
import json, requests

from django.utils.timezone import localtime, now
from django.contrib.auth.decorators import login_required

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

def create_massemail(request, pk=''):
    category = Category.objects.get(pk=pk)
    return render(request, "portal/massemail.html", {"category": category})

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
