from django.conf.urls import url
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views
import portal.views as views

urlpatterns = [
    url(r'apply', views.display_app, name="display_app"),
    url(r'thanks', views.save_app, name="save_app"),
]