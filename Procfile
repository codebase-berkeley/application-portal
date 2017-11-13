release: python manage.py sqlclear | python manage.py dbshell
release: python manage.py migrate
web: gunicorn mysite.wsgi --log-file -