from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from portal.models import *
import ast

from django.utils.timezone import localtime, now
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User


def str_to_list(txt):
    return [a.replace("'", "") for a in txt[1:-1].split(',')]

@login_required
def render_app(request,app_pk):
    application = Application.objects.get(pk = app_pk)
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
    comments = application.comment_set.all()
    options = [str_to_list(question.options) for question in questions]
    qa_tuple = zip(questions, answer_text, options)
    list_cat = list(Category.objects.all())
    category = application.category
    dict_out = {"first_name": first_name, "last_name": last_name, "email": email,
                "questions": questions, "answers": answer_text if answer_text else "ERROR NO ANSWERS",
                "qa_tuple": qa_tuple,
                "comments": comments,
                "answers": answers, "list_cat": list_cat, "category": category,
                "application": application,
                "id": app_pk}
    return render(request, "portal/application.html", dict_out)

def create_comment(request, app_pk):
    text = request.POST["reply"]
    comment = Comment(user=User.objects.get(username="codebase"), comment_text=text,
                      published_date=localtime(now()), applicant=Application.objects.get(pk=app_pk))
    comment.save()
    return render_app(request, app_pk)


def delete_comment(request, app_pk):
    comment = Comment.objects.get(pk=int(request.POST["delete"]))
    comment.delete()
    return render_app(request,  app_pk)
