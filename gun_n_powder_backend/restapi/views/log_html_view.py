
import os
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def grab_html(request):
    if request.method == "GET":

        scanname = request.GET.get("scanname")+".html"
        filepath = os.path.join("/container_zap", scanname)
        try:
            with open(filepath, "r") as file:
                content = file.read()
                return HttpResponse(content.encode('utf-8'), content_type="text/html")
        except FileNotFoundError:
            return HttpResponse(f"File {filepath} not found".encode('utf-8'))
