from django.http import HttpResponse
from portal.models import *
import ast, datetime, json

from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.core.paginator import Paginator
from fuzzywuzzy import fuzz


def datetime_handler(x):
    if isinstance(x, datetime.datetime):
        return x.isoformat()
    raise TypeError("Unknown type")


@login_required
def forms(request):
    data = []

    for form in Form.objects.all().values():
        form["questions"] = [q for q in Question.objects.filter(form = form["id"]).values()]
        form["categories"] = [c for c in Category.objects.filter(form = form["id"]).values()]
        data.append(form)

    output = json.dumps({"forms": data}, indent=4, default=datetime_handler)
    return HttpResponse(output, content_type="application/json")

@login_required
def applications(request):
    APPS_PER_PAGE = 10
    if request.method == 'GET':
        query = request.GET['q'] if 'q' in request.GET else ''
        request_page = request.GET['page'] if 'page' in request.GET else 1

        def fuzzy_match_app(app, query, fuzzy_thresh):
            if query == '':
                return True
            fuzzy_email = fuzz.partial_ratio(app['email'], query) > fuzzy_thresh
            fuzzy_fn = fuzz.partial_ratio(app['first_name'], query) > fuzzy_thresh
            fuzzy_ln = fuzz.partial_ratio(app['last_name'], query) > fuzzy_thresh
            return fuzzy_email or fuzzy_fn or fuzzy_ln

        applications = [a for a in Application.objects.all().values() if fuzzy_match_app(a, query, 50)]

        if 'category' in request.GET:
            applications = [a for a in applications if a['category_id'] == int(request.GET['category'])]

        paginator = Paginator(applications, APPS_PER_PAGE)
        if int(request_page) > paginator.num_pages:
            return HttpResponse('empty page', content_type="application/json")

        app_data = []
        for app in paginator.page(request_page).object_list:
            app['answers'] = [a for a in Answer.objects.filter(application=app['id']).values()]
            app_data.append(app)
        output = {'page': request_page, 'num_pages': paginator.num_pages, 'applications': app_data}
        output = json.dumps(output, indent=4)

        return HttpResponse(output, content_type="application/json")
    return HttpResponse('invalid parameters', content_type="application/json")

