from portal.models import Category, Application

def get_dashboard_context(username, email):
    """
    Returns a dictionary that contains the context needed for pages extending the dashboard.
    :return: context dictionary.
    """
    list_cat = list(Category.objects.all())

    return {"list_cat": list_cat, "username": username, "email": email}