from django.http import HttpResponse
from portal.models import *
import ast, datetime, json

from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.core.paginator import Paginator


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
        if 'category' in request.GET and 'page' in request.GET:
            request_category = request.GET['category']
            request_page = request.GET['page']

            applications = Application.objects.filter(category=request_category)
            paginator = Paginator(applications, APPS_PER_PAGE)
            if int(request_page) > paginator.num_pages:
                return HttpResponse('empty page', content_type="application/json")

            output = {'page': request_page, 'num_pages': paginator.num_pages}
            app_data = []
            for app in paginator.page(request_page).object_list.values():
                app['answers'] = [a for a in Answer.objects.filter(application=app['id']).values()]
                app_data.append(app)
            output['applications'] = app_data
            output = json.dumps(output, indent=4)
            return HttpResponse(output, content_type="application/json")
    return HttpResponse('invalid parameters', content_type="application/json")

