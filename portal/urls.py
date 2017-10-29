from django.conf.urls import url
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    url(r'hello/(?P<first_name>[a-zA-Z]+)$',
        views.advanced_hello, name="advanced_hello"),
    url(r'application/(?P<app_pk>[0-9]*$)',
        views.render_app, name="get_application"),
    url(r'edit/form$', views.form, name='form'),
    url(r'edit/form/q/<q_pk>', views.create_question, name='create_question'),
    url(r'edit/form/delete', views.delete_question, name='delete_question'),
    url(r'edit/question/(?P<pk>\d*)', views.edit_question, name='edit_question'),
    url(r'testcategories/$', views.testcategories, name="testcategories"),
    url(r'dashboard$', views.dashboard, name="dashboard"),
    url(r'edit/category/(?P<pk>\d*)', views.edit_category, name='edit_category'),
    url(r'create/category/(?P<pk>\d*)', views.create_category, name='create_category'),
    url(r'delete/category(?P<pk>\d*)', views.delete_category, name="delete_category"),
    url(r'category/(?P<pk>\d*)', views.show_category, name='show_category'),
    url(r'delete_comment', views.delete_comment, name="delete_comment"),
    url(r'application/category/(?P<app_pk>\d*)/', views.change_category, name='change_category'),
    url(r'comment/delete/(?P<app_pk>[0-9]*$)',views.delete_comment, name = "delete_comment"),
    url(r'comment/create/(?P<app_pk>[0-9]*$)', views.create_comment, name = "create_comment"),
]
