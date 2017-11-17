from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from portal.models import *
from portal.models import Question, Answer
from portal.models import Category, Application
from portal.views.application import render_app
import ast
import json, requests
from .utils import get_dashboard_context
from django.contrib.auth.decorators import login_required

@login_required
def show_assignments(request):
    context = get_dashboard_context(request.user.username, request.user.email)
    all_assigns, my_assigns = list(Assignment.objects.all()), []
    for assignment in all_assigns:
    	if assignment.exec_user == request.user:
    		my_assigns.append(assignment)
    context["my_assigns"] = my_assigns
    return render(request, "portal/myassignments.html", context)
