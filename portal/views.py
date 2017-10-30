from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from portal.models import *
from portal.models import Question, Answer
from portal.models import Category, Application
import ast


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
    return render(request, "portal/application.html", dict_out)

def str_to_list(txt):
    return [a.replace("'", "") for a in txt[1:-1].split(',')]

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
    return redirect('portal:form')


def delete_question(request):
    question = Question.objects.get(pk=request.POST["to_delete"])
    question.delete()
    return redirect('portal:form')


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

def testcategories(request):
    listy = list(Category.objects.all())
    apps = list(Application.objects.all())
    return render(request, "portal/testcategories.html", {"categories": listy, 'apps': apps})

def dashboard(request):
    list_cat = list(Category.objects.all())
    list_app = list(Application.objects.all())
    return render(request, "portal/dashboard.html", {"list_cat": list_cat, "list_app": list_app})

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
            answer.answer_text = str(lst_answers).replace('u','')
            print(answer.answer_text)
            print(lst_answers)
        else:
            answer.answer_text = request.POST[str(question.pk)]
        
        answer.save()

    return render(request, "portal/application_views/thanks.html")