from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def advanced_hello(request, first_name):
    return render(request, "portal/hello.html", { "first_name": first_name })

def form(request):

def add_question(request):

def delete_question(request):

def edit_question(request):    
