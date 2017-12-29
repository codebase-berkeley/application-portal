# Application Portal

## The first time...
Clone this repo - put it in a folder with all of your other CodeBase work:
`git clone https://github.com/codebase-berkeley-mentored-project-fa17/ApplicationPortal.git`

Navigate into it
`cd ApplicationPortal`

Set up a virtual environment with the command python3 -m venv env (Linux and Mac) or virtualenv env if you're on Windows. This creates a virtual environment with the name "env" in your local directory.

Activate your virtual environment with source env/bin/activate (Linux and Mac) or env\scripts\activate (Windows).

Install the dependencies:
`pip install -r requirements.txt`

**If you are working on the client**, install all dependencies with the following commands:

1. `cd client`
2. `npm install`
3. Run the development server with `npm start`. The client will be active at localhost:8080. You can create a build with `npm run build`.
This will create the necessary bundled javascript and CSS files and put them in the django directories.

## Every time
Activate your virtualenv before doing anything in your terminal!

Work in a branch, never, ever, ever on master or staging!

Pull your branches most recent changes.
`git pull`

Migrate any schema changes:
`python manage.py migrate`

Before pushing, make sure you have made the migrations:
`python manage.py makemigrations`


To run locally, type in `python manage.py runserver` and then visit localhost:8000. You should get some kind of 404 error.
