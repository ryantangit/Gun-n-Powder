
import os
from django.contrib.auth.decorators import login_required
from django.http.response import JsonResponse, HttpResponse
from rest_framework.views import csrf_exempt



@csrf_exempt
@login_required
def log_detail(request):
    if request.method == "GET":
        scanname = request.GET.get("scanname")+".txt"
        file_path = os.path.join("/container_zap", scanname)
        try:
            with open(file_path, "r") as file:
                content = file.read()
                return JsonResponse({"content": content})
        except FileNotFoundError:
            return HttpResponse("File not found".encode('utf-8'), status = 404)
        except Exception as e:
            return HttpResponse(f"Error: {e}".encode('utf-8'), status=500)
