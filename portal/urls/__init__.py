from .form import urlpatterns as url1
from .public import urlpatterns as url2
from .categories import urlpatterns as url3
from .registration import urlpatterns as url4
from .dashboard import urlpatterns as url5
from .api import urlpatterns as url6

urlpatterns = url1
urlpatterns += url2
urlpatterns += url3
urlpatterns += url4
urlpatterns += url5
urlpatterns += url6
