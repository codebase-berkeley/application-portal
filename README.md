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

## Every time
Activate your virtualenv before doing anything in your terminal!
Work in a branch, never ever ever on master or staging!
Pull your branches most recent changes.
`git pull`
If your starting a new branch, pull from master first and then create the branch.
Migrate any schema changes:
`python manage.py migrate`
Before pushing, make sure you have made the migrations:
`python manage.py makemigrations`




