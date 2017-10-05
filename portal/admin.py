from django.contrib import admin

from . models import Animal
from . models import Dog
from . models import Chicken
# Register your models here.
admin.site.register(Animal)
admin.site.register(Dog)
admin.site.register(Chicken)
