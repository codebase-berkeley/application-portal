from django.shortcuts import render
from django.http import HttpResponse
from portal.models import Question

# Create your views here.


def advanced_hello(request, first_name):
    return render(request, "portal/hello.html", {"first_name": first_name})


def form(request):
    return render(request, "portal/question_forms/edit_form.html", { "questions": Question.objects.all() })


def create_question(request, q_text, q_type):
    new_question = Question(question_text=q_text, question_type=q_type)
    new_question.save()
<<<<<<< HEAD
    return render(request, "portal/question_forms/edit_form.html", { "questions": Question.objects.all() })

def delete_question(request, question):
    question.delete()
    return render(request, "portal/question_forms/edit_form.html", { "questions": Question.objects.all() })


def edit_question(request, question, new_text):
    question.question_text = new_text
    question.save()
    return render(request, "portal/question_forms/edit_form.html", { "questions": Question.objects.all() })

