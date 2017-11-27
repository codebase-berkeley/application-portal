from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.http import JsonResponse
from portal.models import *
import ast

from django.utils.timezone import localtime, now
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

from .utils import get_dashboard_context
from django.http import JsonResponse


def str_to_list(txt):
    if txt is None:
        return None
    out =  [a.replace("'", "") for a in txt[1:-1].split(',')]
    return [a.strip() for a in out]

@login_required
def render_app(request, app_pk):
    context = get_dashboard_context(request.user.username, request.user.email)

    application = Application.objects.get(pk = app_pk)
    application.read = True #if rendered, must be read
    application.save()
    first_name, last_name, email = application.first_name, application.last_name, application.email
    questions = Question.objects.order_by('order_number')
    answers = [answer.answer_text for answer in application.answer_set.all()]

    ans = application.answer_set.all()
    answer_text = []
    for answer in ans:
        if answer.question.question_type == "Checkbox":
            answer_text += [str_to_list(answer.answer_text)]
        elif answer.question.question_type == "Dropdown":
            answer_text += ["'{0}'".format(answer.answer_text)]
        else:
            answer_text += [answer.answer_text]

    if application.rating == None:
        filled_rating = []
        empty_rating = [1, 2, 3, 4, 5]
    else:
        filled_rating = [i for i in range(1, application.rating+1)]
        empty_rating = [i for i in range(application.rating+1, 6)]
    comments = application.comment_set.all()
    options = [str_to_list(question.options) for question in questions]
    print("Options: ", options)
    qa_tuple = zip(questions, answer_text, options)
    list_cat = list(Category.objects.all())
    category = application.category

    context["first_name"] = first_name
    context["last_name"] = last_name
    context["email"] = email
    context["questions"] = questions
    context["answers"] = answer_text if answer_text else "ERROR NO ANSWERS"
    context["qa_tuple"] = qa_tuple
    context["comments"] = comments
    context["filled_rating"] = filled_rating
    context["empty_rating"] = empty_rating
    context["answers"] = answers
    context["category"] = category
    context["application"] = application
    context["id"] = app_pk
    context["read"] = Application.objects.get(pk = app_pk).read
    return render(request, "portal/application.html", context)

@login_required
def create_comment(request, app_pk):
    text = request.POST['text']
    comment = Comment(user=User.objects.get(username=request.user.username), comment_text=text,
                      published_date=localtime(now()), applicant=Application.objects.get(pk=app_pk))
    comment.save()
    success = {
        "success": True,
        "user": request.user.username,
        "id": comment.id,
        "text": comment.comment_text
    }
    return JsonResponse(success)

@login_required
def delete_comment(request):
    comment = Comment.objects.get(pk=int(request.POST["num"]))
    string_id = str(comment.id)
    comment.delete()
    success = {
        "success": True,
        "user": request.user.username,
        "id": "#"+string_id,
        "text": comment.comment_text
    }
    return JsonResponse(success)

@login_required
def change_rating(request, app_pk):
    if request.method == 'POST': 
        application = Application.objects.get(pk = app_pk)
        rating = request.POST["rating"]
        application.rating = int(rating)
        application.save()
        success = {
            "success": True
        }
        return JsonResponse(success)
    else:
        return render_app(request, app_pk)
