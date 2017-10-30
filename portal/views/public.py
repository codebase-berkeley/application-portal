from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from portal.models import *
from portal.models import Question, Answer, Category, Application
import ast

from django.utils.timezone import localtime, now
from django.contrib.auth.decorators import login_required


def display_app(request):
    if request.method == "GET":
        questions_and_options = []
        questions = Question.objects.all()
        for question in questions:
            questions_and_options.append([question, question.get_options_list()])
        return render(request, "portal/application_views/apply.html", {"questions_and_options": questions_and_options})


def save_app(request):
    app = Application()
    app.first_name = request.POST["first_name"]
    app.last_name = request.POST["last_name"]
    app.email = request.POST["email"]
    app.read = False
    app.save()
    questions = Question.objects.all()
    for question in questions:
        print(request.POST)
        print(question.pk)
        answer = Answer()
        answer.application = app
        answer.question = question
        if question.question_type == "Checkbox" or question.question_type == "RadioButton":
            lst_answers = request.POST.getlist(str(question.pk))
            answer.answer_text = str(lst_answers).replace('u', '')
            print(answer.answer_text)
            print(lst_answers)
        else:
            answer.answer_text = request.POST[str(question.pk)]

        answer.save()

    return render(request, "portal/application_views/thanks.html")
