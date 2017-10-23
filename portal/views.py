from django.shortcuts import render
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
    return render(request, "portal/question_forms/edit_form.html", {"questions": questions_and_options})


def create_question(request, q_text, q_type, options):
    if q_type == 'Radiobutton':
        new_question = Radiobutton(
            question_text=q_text, question_type=q_type, options=options)
    elif q_type == 'Checkbox':
        new_question = Checkbox(question_text=q_text,
                                question_type=q_type, options=options)
    elif q_type == 'Dropdown':
        new_question = Dropdown(question_text=q_text,
                                question_type=q_type, options=options)
    elif q_type == 'Paragraph':
        new_question = Paragraph(question_text=q_text,
                                 question_type=q_type, options=options)
    else:
        new_question = Question(question_text=q_text, question_type=q_type)
    new_question.save()
    return render(request, "portal/question_forms/edit_form.html", {"questions": Question.objects.all()})


def delete_question(request, question):
    question.delete()
    return render(request, "portal/question_forms/edit_form.html", {"questions": Question.objects.all()})


def edit_question(request, pk=''):
    if request.method == "GET":
        question = Question.objects.get(pk=pk)
        options = None
        if question.options:
            options = ast.literal_eval(question.options)
        return render(request, "portal/question_forms/edit_question.html", {"question": question, "options": options})
    question.question_text = new_text
    question.save()
    return render(request, "portal/question_forms/edit_form.html", {"questions": Question.objects.all()})
