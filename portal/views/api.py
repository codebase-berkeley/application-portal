from django.http import HttpResponse
from portal.models import *
import ast, datetime, json

from django.contrib.auth.decorators import login_required
from django.core import serializers


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

