from django.contrib import admin
from .models import Category, Application, Comment, Paragraph, Checkbox, Radiobutton, Dropdown, Answer

admin.site.register(Category)
admin.site.register(Application)
admin.site.register(Comment)
admin.site.register(Paragraph)
admin.site.register(Checkbox)
admin.site.register(Radiobutton)
admin.site.register(Dropdown)
admin.site.register(Answer)