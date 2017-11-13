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
        elif question.question_type == "Dropdown":
            answer.answer_text = request.POST[str(question.pk)]
        else:
            answer.answer_text = request.POST[str(question.pk)]

        answer.save()
    all_assignments = list(Assignment.objects.all())
    count = {}
    for ex in list(User.objects.all()):
        count[ex.pk] = 0
    for assignment in all_assignments:
        exec_user = assignment.exec_user
        count[exec_user.pk] += 1
    least_assigned = min(count, key = lambda x: count[x])
    new_assignment = Assignment()
    new_assignment.exec_user = User.objects.get(pk=least_assigned)
    new_assignment.applicant = app
    new_assignment.save()
    return render(request, "portal/application_views/thanks.html")
