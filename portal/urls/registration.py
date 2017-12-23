from django.conf.urls import url
from django.views.generic import TemplateView
from django.contrib.auth import views as auth_views
import portal.views as views   

urlpatterns = [
    url(r'login/$', auth_views.login, {'template_name': 'registration/login.html'}, name='login'),
    url(r'logout/$', auth_views.logout, {'template_name': 'registration/logout.html'}, name='logout'),
]