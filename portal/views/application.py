from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from portal.models import *
import ast

from django.utils.timezone import localtime, now
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

from .utils import get_dashboard_context

from django.http import JsonResponse


def str_to_list(txt):
    if txt is None:
        return None
    out =  [a.replace("'", "") for a in txt[1:-1].split(',')]
    return [a.strip() for a in out]

@login_required
def render_app(request, app_pk):
    context = get_dashboard_context(request.user.username, request.user.email)

    application = Application.objects.get(pk = app_pk)
    application.read = True #if rendered, must be read
    application.save()
    first_name, last_name, email = application.first_name, application.last_name, application.email
    questions = Question.objects.order_by('order_number')
    answers = [answer.answer_text for answer in application.answer_set.all()]

    ans = application.answer_set.all()
    answer_text = []
    for answer in ans:
        if answer.question.question_type == "Checkbox":
            answer_text += [str_to_list(answer.answer_text)]
        elif answer.question.question_type == "Dropdown":
            answer_text += ["'{0}'".format(answer.answer_text)]
        else:
            answer_text += [answer.answer_text]

    if application.rating == None:
        filled_rating = []
        empty_rating = [1, 2, 3, 4, 5]
    else:
        filled_rating = [i for i in range(1, application.rating+1)]
        empty_rating = [i for i in range(application.rating+1, 6)]
    comments = application.comment_set.all()
    options = [str_to_list(question.options) for question in questions]
    print("Options: ", options)
    qa_tuple = zip(questions, answer_text, options)
    list_cat = list(Category.objects.all())
    category = application.category

    list_user = list(User.objects.all())
    list_assign = list(Assignment.objects.all())

    assigned_users = []
    for assignment in list_assign:
        if assignment.applicant == application:
            assigned_users.append(assignment.exec_user)

    context["first_name"] = first_name
    context["last_name"] = last_name
    context["email"] = email
    context["questions"] = questions
    context["answers"] = answer_text if answer_text else "ERROR NO ANSWERS"
    context["qa_tuple"] = qa_tuple
    context["comments"] = comments
    context["filled_rating"] = filled_rating
    context["empty_rating"] = empty_rating
    context["answers"] = answers
    context["category"] = category
    context["application"] = application
    context["id"] = app_pk
    context["read"] = Application.objects.get(pk = app_pk).read
    context["list_user"] = list_user
    context["assigned_users"] = assigned_users
    return render(request, "portal/application.html", context)

@login_required
def create_comment(request, app_pk):
    text = request.POST["reply"]
    comment = Comment(user=User.objects.get(username=request.user.username), comment_text=text,
                      published_date=localtime(now()), applicant=Application.objects.get(pk=app_pk))
    comment.save()
    return render_app(request, app_pk)


def delete_comment(request, app_pk):
    comment = Comment.objects.get(pk=int(request.POST["delete"]))
    comment.delete()
    return render_app(request, app_pk)

def change_rating(request, app_pk):
    application = Application.objects.get(pk = app_pk)
    application.rating = int(request.POST["rating"])
    application.save()
    return render_app(request, app_pk)

def assign_user(request):
    if request.method == 'POST':
        application = Application.objects.get(pk = int(request.POST['app_pk']))
        assigned_user = User.objects.get(pk = int(request.POST['user_pk']))

        list_assign = list(Assignment.objects.all())
        to_delete = []
        for assignment in list_assign:
            if assignment.applicant.pk == int(request.POST['app_pk']) and assignment.exec_user.pk == int(request.POST['user_pk']):
                to_delete.append(assignment)

        if len(to_delete) == 0:
            new_assignment = Assignment(applicant = application, exec_user = assigned_user)
            new_assignment.save()
        else:
            for assignment in to_delete:
                assignment.delete() 

        success = {
            "success": True
        }
        return JsonResponse(success)

    else:

        return render_app(request, int(request.POST['app_pk']))