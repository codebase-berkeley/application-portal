from django.conf.urls import url
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views
import portal.views as views

urlpatterns = [
    url(r'application/(?P<app_pk>[0-9]*$)',
        views.render_app, name="get_application"),
    url(r'dashboard', views.dashboard, name="dashboard"),
    url(r'massemail/(?P<pk>\d*)', views.create_massemail, name='create_massemail'),
    url(r'sent/(?P<pk>\d*)', views.send_massemail, name='send_massemail'),
    url(r'delete_comment', views.delete_comment, name="delete_comment"),
    url(r'change_rating/(?P<app_pk>\d*)/',
        views.change_rating, name='change_rating'),
    url(r'comment/delete/(?P<app_pk>[0-9]*$)',
        views.delete_comment, name="delete_comment"),
    url(r'comment/create/(?P<app_pk>[0-9]*$)',
        views.create_comment, name="create_comment"),
    url(r'search/(?P<term>[a-zA-Z]*)$', views.search, name="search_applicants"),
    url(r'assign_user/',
        views.assign_user, name='assign_user'),
    url(r'myassignments', views.show_assignments, name='myassignments'),
]