from django.conf.urls import url
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views
import portal.views as views

urlpatterns = [
    url(r'edit/form$', views.form, name='form'),
    url(r'edit/form/add', views.create_question, name='create_question'),
    url(r'edit/form/delete', views.delete_question, name='delete_question'),
    url(r'edit/question/(?P<pk>\d*)', views.edit_question, name='edit_question'),
]
