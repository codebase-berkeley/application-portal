from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from portal.models import *
from portal.models import Question
from portal.models import Category, Application
import ast
from django.contrib.auth.decorators import login_required


# Create your views here.


def advanced_hello(request, first_name):
    return render(request, "portal/hello.html", { "first_name": first_name })

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
    return render(request, "portal/application.html", dict_out)
  
def str_to_list(txt):
    return [a.replace("'", "") for a in txt[1:-1].split(',')]

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
    print(q_type)
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

@login_required
def testcategories(request):
    listy = list(Category.objects.all())
    apps = list(Application.objects.all())
    return render(request, "portal/testcategories.html", {"categories": listy, 'apps': apps})
@login_required
def dashboard(request):
    list_cat = list(Category.objects.all())
    list_app = list(Application.objects.all())
    return render(request, "portal/dashboard.html", {"list_cat": list_cat, "list_app": list_app})
