from django.shortcuts import render

@login_required
def main(request):
    if request.method == "GET":
        return render(request, "portal/main.html")
