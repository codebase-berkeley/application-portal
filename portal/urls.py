from django.conf.urls import url
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views
import portal.views as views

urlpatterns = [
    url(r'application/(?P<app_pk>[0-9]*$)',
        views.render_app, name="get_application"),
    url(r'edit/form$', views.form, name='form'),
    url(r'edit/form/add', views.create_question, name='create_question'),
    url(r'edit/form/delete', views.delete_question, name='delete_question'),
    url(r'edit/question/(?P<pk>\d*)', views.edit_question, name='edit_question'),
    url(r'testcategories/$', views.testcategories, name="testcategories"),
    url(r'dashboard$', views.dashboard, name="dashboard"),
    url(r'apply', views.display_app, name="display_app"),
    url(r'thanks', views.save_app, name="save_app"),
    url(r'edit/category/(?P<pk>\d*)', views.edit_category, name='edit_category'),
    url(r'create/category',
        views.create_category, name='create_category'),
    url(r'delete/category(?P<pk>\d*)',
        views.delete_category, name="delete_category"),
    url(r'assign_category/(?P<app_pk>\d*)/',
        views.change_category, name='change_category'),
    url(r'category/(?P<pk>\d*)', views.show_category, name='show_category'),
    url(r'massemail/(?P<pk>\d*)', views.create_massemail, name='create_massemail'),
    url(r'sent/(?P<pk>\d*)', views.send_massemail, name='send_massemail'),
    url(r'delete_comment', views.delete_comment, name="delete_comment"),
    url(r'change_rating/(?P<app_pk>\d*)/',
        views.change_rating, name='change_rating'),
    url(r'comment/delete/(?P<app_pk>[0-9]*$)',
        views.delete_comment, name="delete_comment"),
    url(r'comment/create/(?P<app_pk>[0-9]*$)',
        views.create_comment, name="create_comment"),
    url(r'login/$', auth_views.login, {'template_name': 'registration/login.html'}, name='login'),
    url(r'search/(?P<term>[a-zA-Z]*)$', views.search, name="search_applicants")
    url(r'logout/$', auth_views.logout, {'template_name': 'registration/logout.html'}, name='logout'),
]
