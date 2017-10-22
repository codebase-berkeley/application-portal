from django.shortcuts import render
from django.http import HttpResponse
from portal.models import *
# Create your views here.

def advanced_hello(request, first_name):
    return render(request, "portal/hello.html", { "first_name": first_name })
def render_app(request,app_pk):
    application = Application.objects.get(pk = app_pk)
    first_name, last_name, email = application.first_name, application.last_name, application.email
    questions = Question.objects.order_by('order_number')
    answers = [answer.answer_text for answer in application.answer_set.all()]
    ans = application.answer_set.all()
    answer_text = []
    for answer in ans:
        if answer.question.question_type == "Checkbox":
            answer_text+=[str_to_list(answer.answer_text)]
        elif answer.question.question_type == "Dropdown":
            answer_text += ["'{0}'".format(answer.answer_text)]
        else:
            answer_text+=[answer.answer_text]
    comments = application.comment_set.all()
    options = [str_to_list(question.options) for question in questions]
    qa_tuple = zip(questions,answer_text,options)
    dict_out= {"first_name":first_name, "last_name":last_name, "email":email,
    "questions": questions, "answers": answer_text if answer_text else "ERROR NO ANSWERS",
    "qa_tuple":qa_tuple,
    "comments": comments,
    "answers": answers}
    return render(request, "portal/application.html",dict_out)
def str_to_list(txt):
    return [a.replace("'", "") for a in txt[1:-1].split(',')]
