import json

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt  # For testing purposes; handle CSRF more securely in production
def api_login(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Login successful"}, status=200)
        else:
            return JsonResponse({"message": "Invalid credentials"}, status=400)

    return JsonResponse({"message": "Method not allowed"}, status=405)
