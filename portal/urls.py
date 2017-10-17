from django.conf.urls import url
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    url(r'hello/(?P<first_name>[a-zA-Z]+)$', views.advanced_hello, name="advanced_hello"), 
    url(r'dashboard$', views.dashboard, name="dashboard")
]
