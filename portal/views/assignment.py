from django.contrib.auth.decorators import login_required
@login_required
def show_assignment(request, pk=''):
    context = get_dashboard_context(request.user.username, request.user.email)
    list_app = list(request.user.assignment.applicant.all())
    context["list_app"] = list_app
    return render(request, "portal/myassignments.html", context)
