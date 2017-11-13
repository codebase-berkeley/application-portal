release: python manage.py migrate
release: python manage.py flush
release: python manage.py loaddata portal/fixtures/sample.json
web: gunicorn mysite.wsgi --log-file -