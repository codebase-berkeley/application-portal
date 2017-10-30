from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from portal.models import *
import ast

from django.utils.timezone import localtime, now
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User


@login_required
def form(request):
    questions_and_options = []
    questions = Question.objects.order_by('order_number')
    for question in questions:
        options = None
        if question.options:
            options = ast.literal_eval(question.options)
        questions_and_options.append([question, options])
    return render(request, "portal/question_forms/edit_form.html", {"questions": questions_and_options})

@login_required
def create_question(request):
    question_text = request.POST.get("question_text")
    q_type = request.POST.get("question_type")
    if q_type == 'radio':
        options = request.POST.getlist("options")
        q = Radiobutton.create(question_text, options)
    elif q_type == 'checkbox':
        options = request.POST.getlist("options", False)
        q = Checkbox.create(question_text, options)
    elif q_type == 'dropdown':
        options = request.POST.getlist("options", False)
        q = Dropdown.create(question_text, options)
    elif q_type == 'paragraph':
        q = Paragraph.create(question_text)
    q.save()
    return redirect('portal:form')

@login_required
def delete_question(request):
    question = Question.objects.get(pk=request.POST["to_delete"])
    question.delete()
    return redirect('portal:form')

@login_required
def edit_question(request, pk=''):
    question = Question.objects.get(pk=pk)
    options = None
    if question.options:
        options = ast.literal_eval(question.options)
    if request.method == "GET":
        return render(request, "portal/question_forms/edit_question.html", {"question": question, "options": options})
    question.question_text = request.POST['question_text']
    if options:
        for option in options:
            if request.POST.get(option, False):
                options.remove(option)
    question.set_options_list(options)
    question.save()
    return redirect('portal:form')
