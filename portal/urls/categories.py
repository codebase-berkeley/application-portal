from django.conf.urls import url
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views
import portal.views as views

urlpatterns = [
    url(r'edit/category/(?P<pk>\d*)', views.edit_category, name='edit_category'),
    url(r'create/category',
        views.create_category, name='create_category'),
    url(r'delete/category(?P<pk>\d*)',
        views.delete_category, name="delete_category"),
    url(r'assign_category/',
        views.change_category, name='change_category'),
    url(r'assign_multiple_category/',
        views.change_multiple_category, name='change_multiple_category'),
    url(r'category/(?P<pk>\d*)', views.show_category, name='show_category'),
]
