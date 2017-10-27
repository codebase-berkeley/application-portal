from django.conf.urls import url
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    url(r'hello/(?P<first_name>[a-zA-Z]+)$', views.advanced_hello, name="advanced_hello"),
    url(r'application/(?P<app_pk>[0-9]*$)',views.render_app, name = "get_application"),
    url(r'edit/form$', views.form, name='form'),
    url(r'edit/form/q/<q_pk>', views.create_question, name='create_question'),
    url(r'edit/form/delete', views.delete_question, name='delete_question'),
    url(r'edit/question/(?P<pk>\d*)', views.edit_question, name='edit_question'),
    url(r'testcategories/$', views.testcategories, name="testcategories"),
    url(r'dashboard$', views.dashboard, name="dashboard"),
    url(r'application/category/(?P<app_pk>\d*)/', views.change_category, name='change_category'),
]
