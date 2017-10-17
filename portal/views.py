from django.shortcuts import render
from django.http import HttpResponse
from portal.models import *
# Create your views here.

def advanced_hello(request, first_name):
    return render(request, "portal/hello.html", { "first_name": first_name })
def render_app(request,application_id):
    application = Application.objects.get(id = application_id)
    first_name = application.first_name
    last_name = application.last_name
    email = application.email
    questions = Question.objects.values()
    application = str(Comment.objects.values())
    return render(request, "portal/hello.html", {"first_name": questions })
