from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from portal.models import Question
import ast

# Create your views here.


def advanced_hello(request, first_name):
    return render(request, "portal/hello.html", {"first_name": first_name})


def form(request):
    questions_and_options = []
    questions = Question.objects.all()
    for question in questions:
        options = None
        if question.options:
            options = ast.literal_eval(question.options)
        questions_and_options.append([question, options])
    return render(request, "portal/question_forms/edit_form.html", { "questions": questions_and_options })


def create_question(request, q_text, q_type):
    new_question = Question(question_text=q_text, question_type=q_type)
    new_question.save()
    return render(request, "portal/question_forms/edit_form.html", { "questions": Question.objects.all() })

def delete_question(request, question):
    question.delete()
    return render(request, "portal/question_forms/edit_form.html", { "questions": Question.objects.all() })


def edit_question(request, pk=''):
    question = Question.objects.get(pk=pk)
    options = None
    if question.options:
        options = ast.literal_eval(question.options)
    if request.method == "GET":
        return render(request, "portal/question_forms/edit_question.html", { "question": question, "options": options})
    question.question_text = request.POST['question_text']
    if options:    
        for option in options:
            if request.POST.get(option, False):
                options.remove(option)
    if request.POST.get("add_options", False):
        new_options = request.POST["add_options"]
        new_options = [x.strip() for x in new_options.split(',')]
        options.extend(new_options)
    question.options = options
    question.save()
    return redirect('portal:form')

