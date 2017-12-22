from django.shortcuts import render
from portal.models import Category, Application, Assignment
from portal.views.application import render_app
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
    return render(request, "portal/dashboard/myassignments.html", context)
