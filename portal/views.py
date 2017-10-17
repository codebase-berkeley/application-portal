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
    question_texts = ["<"+question.question_type+">: "+str(question) for question in questions]
    answers = [answer.answer_text for answer in application.answer_set.all()]
    return render(request, "test/test.html",
{"first_name":first_name, "last_name":last_name, "email":email,
    "questions": question_texts, "answers": answers if answers else "ERROR NO ANSWERS" })
