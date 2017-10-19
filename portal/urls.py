from django.conf.urls import url
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    url(r'hello/(?P<first_name>[a-zA-Z]+)$', views.advanced_hello, name="advanced_hello"),
    url(r'/edit/form', views.form, name='form'),
    url(r'/edit/form/q/<q_pk>', views.create_question, name='create_question'),
    url(r'/edit/form/delete', views.delete, name="delete_question")
]
