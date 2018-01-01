from django.conf.urls import url
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views
import portal.views as views

urlpatterns = [
    url(r'^api/forms', views.forms, name="forms"),
    url(r'^api/applications', views.applications, name="applications")
]
