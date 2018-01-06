from .public import urlpatterns as url2
from .registration import urlpatterns as url4
from .dashboard import urlpatterns as url5
from .api import urlpatterns as url6

urlpatterns = []
urlpatterns += url2
urlpatterns += url4
urlpatterns += url5
urlpatterns += url6
