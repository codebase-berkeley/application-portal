from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from portal.models import *
from portal.models import Question
from portal.models import Category, Application
import ast
from django.utils.timezone import localtime, now

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
    list_cat = list(Category.objects.all())
    category = application.category
    dict_out= {"first_name":first_name, "last_name":last_name, "email":email,
    "questions": questions, "answers": answer_text if answer_text else "ERROR NO ANSWERS",
    "qa_tuple":qa_tuple,
    "comments": comments,
    "answers": answers, "list_cat": list_cat, "category": category, 
    "application": application, 
    "id": app_pk}
    return render(request, "portal/application.html", dict_out)
def create_comment(request, app_pk):
    text = request.POST["reply"]
    comment = Comment(user = User.objects.get(username = "codebase" ), comment_text = text, published_date = localtime(now()), applicant = Application.objects.get(pk = app_pk))
    comment.save()
    return render_app(request,app_pk)

def delete_comment(request, app_pk):
    comment = Comment.objects.get(pk = int(request.POST["delete"]))
    comment.delete()
    return render_app(request,  app_pk)

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

def create_category(request, pk=''):
    list_cat = list(Category.objects.all())
    list_app = list(Application.objects.all())
    if request.method == "GET":
        return render(request, "portal/category/create_category.html", {"list_cat": list_cat, "list_app": list_app})
    newcategory = Category(name = request.POST["newcat_name"])
    newcategory.save()
    list_cat = list(Category.objects.all())
    return render(request, "portal/dashboard.html", {"list_cat": list_cat, "list_app": list_app})

def delete_category(request, pk=''):
    category = Category.objects.get(pk= pk)
    category.delete()
    list_cat = list(Category.objects.all())
    list_app = list(Application.objects.all())
    return render(request, "portal/dashboard.html", {"list_cat": list_cat, "list_app": list_app})

def edit_category(request, pk=''):
    category = Category.objects.get(pk = pk)
    list_cat = list(Category.objects.all())
    list_app = list(Application.objects.all())
    if request.method == "GET":
        return render(request, "portal/category/edit_category.html", {"list_cat": list_cat, "list_app": list_app, "chosencat": category})
    category.name = request.POST["cat_name"]
    category.save()
    list_cat = list(Category.objects.all())
    return render(request, "portal/dashboard.html", {"list_cat": list_cat, "list_app": list_app})

def show_category(request, pk=''):
    category = Category.objects.get(pk = pk)
    return render(request, "portal/category.html")

def testcategories(request):
    listy = list(Category.objects.all())
    apps = list(Application.objects.all())
    return render(request, "portal/testcategories.html", {"categories": listy, 'apps': apps})

def dashboard(request):
    list_cat = list(Category.objects.all())
    list_app = list(Application.objects.all())
    return render(request, "portal/dashboard.html", {"list_cat": list_cat, "list_app": list_app})

def change_category(request, app_pk):
    application = Application.objects.get(pk = app_pk)
    application.category.name = request.POST['category']
    return redirect('portal:get_application', app_pk)