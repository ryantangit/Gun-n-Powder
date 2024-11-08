from django.contrib.auth import logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt  # For testing purposes; handle CSRF more securely in production
def api_logout(request):
    if request.method == "POST":
        logout(request)
        return JsonResponse({"message": "Logged out successfully"})
    return JsonResponse({"error": "Invalid request method"}, status=400)
